const FlashNewsTicker = () => {
  return (
    <div className="w-full mt-4 shadow-md border-t-4 border-white overflow-hidden rounded">
      <div className="flex items-center bg-red-600 text-white font-semibold" style={{ height: '48px' }}>
        <div className="bg-yellow-400 text-red-700 px-4 py-2 text-sm font-bold flex items-center justify-center" style={{ minWidth: '130px', height: '100%' }}>
          BREAKING NEWS
        </div>
        <div className="flex-1 overflow-hidden relative" style={{ height: '48px' }}>
          <div className="absolute left-0 top-0 h-full flex items-center" style={{ whiteSpace: 'nowrap', willChange: 'transform', animation: 'marquee 18s linear infinite' }}>
            📢 Flash News: New MSP for oilseeds announced. Visit iior.org for details! &nbsp;|&nbsp; 
            New crop portals launched: 
            <a href="https://iior-niger.in" className="underline text-white mx-1" target="_blank" rel="noopener noreferrer">iior-niger.in</a>,
            <a href="https://iior-sesame.in" className="underline text-white mx-1" target="_blank" rel="noopener noreferrer">iior-sesame.in</a>,
            <a href="https://iior-castor.in" className="underline text-white mx-1" target="_blank" rel="noopener noreferrer">iior-castor.in</a>,
            <a href="https://iior-linseed.in" className="underline text-white mx-1" target="_blank" rel="noopener noreferrer">iior-linseed.in</a>,
            <a href="https://iior-sunflower.in" className="underline text-white mx-1" target="_blank" rel="noopener noreferrer">iior-sunflower.in</a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
export default FlashNewsTicker;