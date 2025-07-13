
const YouTubeGrid = () => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <div className="aspect-video w-full bg-black rounded overflow-hidden relative">
        <iframe
          src="https://www.youtube.com/embed/hAv_VOUHLoc?autoplay=1&mute=1&enablejsapi=1"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          style={{ aspectRatio: '16/9', borderRadius: '0.75rem', background: 'black' }}
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeGrid;
