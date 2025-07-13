import React, { useState } from 'react';



function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function DailyWord() {
  const [wordsByDate, setWordsByDate] = useState({});
  const [date, setDate] = useState(getToday());
  const [input, setInput] = useState({ english: '', hindi: '', telugu: '' });
  const [editing, setEditing] = useState(true);

  // Load word for selected date
  React.useEffect(() => {
    if (wordsByDate[date]) {
      setInput(wordsByDate[date]);
      setEditing(false);
    } else {
      setInput({ english: '', hindi: '', telugu: '' });
      setEditing(true);
    }
  }, [date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setWordsByDate((prev) => ({ ...prev, [date]: input }));
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Daily Word</h2>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center">
        <label className="font-semibold text-gray-600">Select Date:</label>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      {editing ? (
        <form onSubmit={handleSave} className="space-y-4 mb-6">
          <input
            type="text"
            name="english"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter English Word"
            value={input.english}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hindi"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter Hindi Word"
            value={input.hindi}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telugu"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter Telugu Word"
            value={input.telugu}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 transition font-semibold w-full"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="bg-indigo-50 rounded-lg p-4 text-center mb-6">
          <div className="text-lg font-semibold text-gray-700 mb-2">Word for {date}</div>
          <div className="flex flex-col gap-2">
            <div><span className="font-bold text-indigo-700">Telugu:</span> {input.telugu || <span className="text-gray-400">--</span>}</div>
            <div><span className="font-bold text-indigo-700">English:</span> {input.english || <span className="text-gray-400">--</span>}</div>
            <div><span className="font-bold text-indigo-700">Hindi:</span> {input.hindi || <span className="text-gray-400">--</span>}</div>
          </div>
        </div>
      )}
      {!editing && (
        <button
          className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded shadow hover:bg-yellow-300 transition font-semibold w-full"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
      {/* Always show today's word at the bottom for quick reference */}
      <div className="mt-8 bg-indigo-100 rounded-lg p-4 text-center">
        <div className="text-md font-semibold text-indigo-700 mb-1">Today's Word ({getToday()})</div>
        <div className="flex flex-col gap-1">
          <div><span className="font-bold">Telugu:</span> {wordsByDate[getToday()]?.telugu || <span className="text-gray-400">--</span>}</div>
          <div><span className="font-bold">English:</span> {wordsByDate[getToday()]?.english || <span className="text-gray-400">--</span>}</div>
          <div><span className="font-bold">Hindi:</span> {wordsByDate[getToday()]?.hindi || <span className="text-gray-400">--</span>}</div>
        </div>
      </div>

      {/* Show all future words if any are defined */}
      {Object.keys(wordsByDate).filter(d => d > getToday()).length > 0 && (
        <div className="mt-8 bg-green-50 rounded-lg p-4">
          <div className="text-md font-semibold text-green-700 mb-2">Upcoming Words (Future Dates)</div>
          <div className="flex flex-col gap-2">
            {Object.keys(wordsByDate)
              .filter(d => d > getToday())
              .sort()
              .map(d => (
                <div key={d} className="bg-white rounded shadow p-2 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="font-bold text-green-700">{d}</div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm mt-1 sm:mt-0">
                    <span><span className="font-bold">Telugu:</span> {wordsByDate[d].telugu || <span className="text-gray-400">--</span>}</span>
                    <span><span className="font-bold">English:</span> {wordsByDate[d].english || <span className="text-gray-400">--</span>}</span>
                    <span><span className="font-bold">Hindi:</span> {wordsByDate[d].hindi || <span className="text-gray-400">--</span>}</span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded hover:bg-yellow-300 font-semibold text-xs"
                      onClick={() => {
                        setDate(d);
                        setInput(wordsByDate[d]);
                        setEditing(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-200 text-red-900 px-3 py-1 rounded hover:bg-red-300 font-semibold text-xs"
                      onClick={() => {
                        if (window.confirm('Delete word for ' + d + '?')) {
                          setWordsByDate(prev => {
                            const copy = { ...prev };
                            delete copy[d];
                            return copy;
                          });
                          // If currently viewing this date, reset to today
                          if (date === d) {
                            setDate(getToday());
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyWord;