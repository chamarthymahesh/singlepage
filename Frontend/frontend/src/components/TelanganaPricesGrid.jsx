const markets = [
  { crop: "Niger", price: "₹7200/q" },
  { crop: "Groundnut", price: "₹6100/q" },
  { crop: "Sunflower", price: "₹6500/q" },
  { crop: "Soybean", price: "₹4300/q" },
  { crop: "Sesame", price: "₹8700/q" },
  { crop: "Safflower", price: "₹5500/q" },
];

const TelanganaPricesGrid = () => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="font-semibold mb-2 text-center">📈 Telangana Market Prices</h2>
      <ul>
        {markets.map((m, i) => (
          <li key={i} className="flex justify-between border-b py-1">
            <span>{m.crop}</span>
            <span>{m.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TelanganaPricesGrid;
