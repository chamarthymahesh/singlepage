import React, { useState, useRef } from 'react';


function CarouselMain() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]); // For new uploads (File objects)
  const [previewImages, setPreviewImages] = useState([]); // For previewing (object URLs)
  const [editIndex, setEditIndex] = useState(null);
  const fileInputRef = useRef();

  // Handle file input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  // Remove a preview image (for editing)
  const handleRemovePreviewImage = (idx) => {
    setPreviewImages(previewImages.filter((_, i) => i !== idx));
    // If editing, also remove from event's images if not uploading new ones
    if (images.length === 0 && editIndex !== null) {
      const oldImages = events[editIndex].images.filter((_, i) => i !== idx);
      const updated = [...events];
      updated[editIndex] = { ...updated[editIndex], images: oldImages };
      setEvents(updated);
    }
  };

  // Add or update event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!title || (previewImages.length === 0 && images.length === 0)) return;
    let eventImages = [];
    if (images.length > 0) {
      eventImages = images.map(file => URL.createObjectURL(file));
    } else if (editIndex !== null) {
      eventImages = previewImages;
    }
    const newEvent = {
      title,
      images: eventImages,
    };
    if (editIndex !== null) {
      const updated = [...events];
      updated[editIndex] = newEvent;
      setEvents(updated);
      setEditIndex(null);
    } else {
      setEvents([newEvent, ...events]);
    }
    setTitle('');
    setImages([]);
    setPreviewImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Edit event
  const handleEdit = (idx) => {
    setTitle(events[idx].title);
    setImages([]); // User can upload new images if desired
    setPreviewImages(events[idx].images);
    setEditIndex(idx);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Delete event
  const handleDelete = (idx) => {
    setEvents(events.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setTitle('');
      setImages([]);
      setPreviewImages([]);
      setEditIndex(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Event</h2>

      <form onSubmit={handleAddEvent} className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Event Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="file"
          className="w-full border border-gray-300 rounded px-3 py-2"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        {/* Preview selected or existing images when editing */}
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded border border-gray-300 shadow"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                  onClick={() => handleRemovePreviewImage(i)}
                  title="Remove image"
                >✕</button>
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 transition font-semibold"
        >
          {editIndex !== null ? 'Update Event' : 'Add Event'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Preview</h3>
      <div className="space-y-6">
        {events.length === 0 && (
          <div className="text-gray-400 text-center">No events added yet.</div>
        )}
        {events.map((event, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 bg-gray-50 shadow-sm">
            <div className="flex-1 w-full">
              <div className="text-lg font-bold text-gray-800 mb-2">{event.title}</div>
              <div className="flex flex-wrap gap-2">
                {event.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="event"
                    className="h-24 w-24 object-cover rounded border border-gray-300 shadow"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[100px]">
              <button
                className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition"
                onClick={() => handleEdit(idx)}
                type="button"
              >Edit</button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-400 transition"
                onClick={() => handleDelete(idx)}
                type="button"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselMain;