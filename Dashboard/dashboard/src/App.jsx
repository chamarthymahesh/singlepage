import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselMain from './pages/CarouselMain';
import SideNav from './components/SideNav';
import YoutubeLinks from './pages/YoutubeLinks';
import DailyWord from './pages/DailyWord';
import FlashNews from './pages/FlashNews';

// Placeholder components for other routes
const MSPData = () => <div className="p-8">MSP Data Page</div>;
const MarketPrices = () => <div className="p-8">Market Prices Page</div>;

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <aside><SideNav /></aside>
        <main className="flex-1">
          <Routes>
            <Route path="/carousel" element={<CarouselMain />} />
            <Route path="/youtube" element={<YoutubeLinks />} />
            <Route path="/dailyword" element={<DailyWord />} />
            <Route path="/flashnews" element={<FlashNews />} />
            <Route path="/mspdata" element={<MSPData />} />
            <Route path="/marketprices" element={<MarketPrices />} />
            <Route path="*" element={<CarouselMain />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
