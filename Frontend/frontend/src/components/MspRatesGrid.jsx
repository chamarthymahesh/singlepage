const crops = [
  { name: "Niger", rate: "Rs. 7755/q" },
  { name: "Groundnut", rate: "Rs. 6377/q" },
  { name: "Sunflower", rate: "Rs. 6760/q" },
  { name: "Soybean", rate: "Rs. 4600/q" },
  { name: "Sesame", rate: "Rs. 8885/q" },
  { name: "Safflower", rate: "Rs. 5800/q" },
];

const MspRatesGrid = () => {
  return (
    <div className="shadow p-4 rounded" style={{ background: '#556B2F' }}>
      <h2 className="font-semibold mb-2 text-center" style={{ color: '#f7f7e8' }}>🧾 MSP Rates (2024-25)</h2>
      <ul>
        {crops.map((crop, i) => (
          <li key={i} className="flex justify-between border-b border-green-200 py-1" style={{ color: '#f7f7e8' }}>
            <span>{crop.name}</span>
            <span>{crop.rate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MspRatesGrid;
