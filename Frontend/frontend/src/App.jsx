import CarouselGrid from './components/CarouselGrid';
import YouTubeGrid from './components/YouTubeGrid';
import WordLanguages from './components/WordLanguages';
import MspRatesGrid from './components/MspRatesGrid';
import TelanganaPricesGrid from './components/TelanganaPricesGrid';
import FlashNewsTicker from './components/FlashNewsTicker';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
    }}>
      <div className="w-full max-w-7xl mx-auto p-6 md:p-10 rounded-2xl shadow-2xl bg-white/80" style={{boxShadow: '0 8px 32px 0 rgba(99,102,241,0.12)'}}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          {/* Row 1: 2 items */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <CarouselGrid />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <YouTubeGrid />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {/* Row 2: 3 items */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <WordLanguages />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <MspRatesGrid />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <TelanganaPricesGrid />
          </div>
        </div>

        <FlashNewsTicker />
      </div>
    </div>
  );
};

export default App;
