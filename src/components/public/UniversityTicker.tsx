const universities = [
  'Universiti Malaya (UM)', 'Taylor\'s University', 'Monash Malaysia', 'APU Malaysia',
  'Sunway University', 'UCSI University', 'INTI International', 'HELP University',
  'University of Nottingham Malaysia', 'Curtin Malaysia', 'UiTM', 'UTM',
  'Kings College London', 'University of Birmingham', 'Macquarie University',
  'University of Toronto', 'McGill University', 'University of Melbourne',
];

export default function UniversityTicker() {
  const items = [...universities, ...universities]; // doubled for seamless loop
  return (
    <div className="ticker-bar">
      <div className="ticker-label">Our Partner Universities</div>
      <div className="ticker-track">
        {items.map((uni, i) => (
          <div key={i} className="ticker-item">🏛️ {uni}</div>
        ))}
      </div>
    </div>
  );
}
