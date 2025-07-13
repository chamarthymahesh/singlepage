import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iior from '../assets/iior.jpeg';
import iior1 from '../assets/iior1.jpg';
import iior2 from '../assets/iior2.jpg';


const CarouselGrid = () => {
  // Array of image objects with src, title, and background color
  const images = [
    { src: iior, title: 'First Image', bgColor: '#f8fafc' },
    { src: iior1, title: 'Second Image', bgColor: '#fef9c3' },
    { src: iior2, title: 'Third Image', bgColor: '#dbeafe' },
    // Add more images here as needed
  ];

  const settings = {
    autoplay: true,
    dots: false, // Remove dots
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="shadow p-4 rounded bg-white">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center h-72 w-full rounded  duration-300"
            style={{ minHeight: '18rem', minWidth: '100%' }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="object-contain"
              style={{ height: '100%', width: '100%', maxHeight: '16rem', maxWidth: '100%' }}
            />
            <div className="text-center font-semibold text-lg text-gray-700 mt-2 w-full">
              {img.title}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselGrid;
