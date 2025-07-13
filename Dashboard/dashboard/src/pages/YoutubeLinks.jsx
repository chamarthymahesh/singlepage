import React, { useState, useRef } from 'react';

function getYouTubeId(url) {
  // Extracts the video ID from a YouTube URL
  const regExp = /^.*(?:youtu.be\/|v=|\/v\/|embed\/|shorts\/)([\w-]{11}).*/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function YoutubeLinks() {
  const [links, setLinks] = useState([]);
  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(0);
  const inputRef = useRef();

  const handleAdd = (e) => {
    e.preventDefault();
    const id = getYouTubeId(input);
    if (id && !links.includes(id)) {
      setLinks([...links, id]);
      setInput('');
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = (idx) => {
    const newLinks = links.filter((_, i) => i !== idx);
    setLinks(newLinks);
    if (current >= newLinks.length) setCurrent(0);
  };

  const handleEnded = () => {
    if (links.length > 0) {
      setCurrent((prev) => (prev + 1) % links.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">YouTube Playlist</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Paste YouTube link here"
          value={input}
          onChange={e => setInput(e.target.value)}
          ref={inputRef}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition font-semibold"
        >Add</button>
      </form>

      {links.length > 0 && (
        <div className="mb-6">
          <div className="aspect-video w-full bg-black rounded overflow-hidden mb-2 relative">
            <iframe
              key={links[current]}
              src={`https://www.youtube.com/embed/${links[current]}?autoplay=1&enablejsapi=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              style={{ aspectRatio: '16/9', borderRadius: '0.75rem', background: 'black' }}
              id={`ytplayer-${links[current]}`}
            ></iframe>
          </div>
          <div className="flex flex-wrap gap-2">
            {links.map((id, idx) => (
              <div key={id} className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer ${idx === current ? 'bg-indigo-100 text-indigo-700 font-bold' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setCurrent(idx)}
              >
                <span className="truncate max-w-[120px]">{id}</span>
                <button
                  className="ml-1 text-red-500 hover:text-red-700 text-sm"
                  onClick={e => { e.stopPropagation(); handleRemove(idx); }}
                  title="Remove"
                >✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {links.length === 0 && (
        <div className="text-gray-400 text-center">No YouTube links added yet.</div>
      )}
    </div>
  );
}

export default YoutubeLinks;
