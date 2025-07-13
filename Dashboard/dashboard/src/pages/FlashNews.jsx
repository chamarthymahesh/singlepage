import React, { useState } from 'react';
import VaadinRichTextEditorWrapper from '../components/VaadinRichTextEditorWrapper';

export default function FlashNewsManager() {
  const [newsList, setNewsList]   = useState([]);
  const [editorData, setData]     = useState('');
  const [editing, setEditing]     = useState(null);

  const plain = editorData.replace(/<[^>]+>/g, '').trim();   // strip tags → plain text

  const saveNews = () => {
    if (!plain) return;                                      // ignore empty text
    if (editing !== null) {
      setNewsList(list => list.map((n, i) => (i === editing ? editorData : n)));
      setEditing(null);
    } else {
      setNewsList(list => [...list, editorData]);
    }
    setData('');
  };

  const startEdit   = i => { setData(newsList[i]); setEditing(i); };
  const deleteNews  = i => {
    if (window.confirm('Delete this flash news?')) {
      setNewsList(list => list.filter((_, idx) => idx !== i));
      if (editing === i) { setData(''); setEditing(null); }
    }
  };

  return (
    <div className="bg-white shadow-md rounded border-t-4 border-red-500 p-6">
      <h2 className="text-xl font-bold mb-4 text-red-600">Flash News Manager</h2>

      {/* Editor */}
      <VaadinRichTextEditorWrapper value={editorData} onChange={setData} />

      {/* Action buttons */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={saveNews}
          className="bg-red-600 text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition"
        >
          {editing !== null ? 'Update News' : 'Add News'}
        </button>

        {editing !== null && (
          <>
            <button
              onClick={() => deleteNews(editing)}
              className="bg-red-200 text-red-800 font-semibold px-5 py-2 rounded hover:bg-red-300"
            >
              Delete
            </button>
            <button
              onClick={() => { setData(''); setEditing(null); }}
              className="bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* List */}
      <h3 className="text-lg font-semibold mt-8 mb-3 text-gray-700">All Flash News</h3>
      {newsList.length === 0 && (
        <div className="text-gray-400">No flash news added yet.</div>
      )}

      <ul className="space-y-4">
        {newsList.map((html, i) => (
          <li
            key={i}
            className="bg-red-50 border-l-4 border-red-400 rounded p-4 flex flex-col sm:flex-row sm:items-start justify-between"
          >
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
              <button
                onClick={() => startEdit(i)}
                className="bg-yellow-200 text-yellow-900 text-xs px-3 py-1 rounded hover:bg-yellow-300 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNews(i)}
                className="bg-red-200 text-red-900 text-xs px-3 py-1 rounded hover:bg-red-300 font-semibold"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
