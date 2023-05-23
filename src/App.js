import React, { useState, useEffect } from 'react';

function App() {
  const [points, setPoints] = useState([]);
  const [box, setBox] = useState(null);
  const [image, setImage] = useState(null);
  const [loadedImage, setLoadedImage] = useState(null);
  
  useEffect(() => {
    if (points.length === 4) {
      const xs = points.map(p => p.x);
      const ys = points.map(p => p.y);
      const min_x = Math.min(...xs);
      const max_x = Math.max(...xs);
      const min_y = Math.min(...ys);
      const max_y = Math.max(...ys);
      
      setBox({ left: min_x, top: min_y, width: max_x - min_x, height: max_y - min_y });
    } else {
      setBox(null);
    }
  }, [points]);
  
  const handleClick = (event) => {
    if (points.length === 4) {
      setPoints([]); // reset if we already have 4 points
      return;
    }
    
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    
    setPoints([...points, { x, y }]);
  }
  
  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setPoints([]);
    setBox(null);
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(points));
  }
  
  return (
    <div className="App" style={{ backgroundColor: '#282c34', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'calc(10px + 2vmin)' }}>
      <h1>Bound me o, thou great Jehovah</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          {image &&
            <img
              src={image}
              alt="Your target"
              onClick={handleClick}
              onLoad={() => setLoadedImage(true)}
              style={{ width: '500px', height: 'auto' }}
            />
          }
          {box && loadedImage && <div style={{
            position: 'absolute',
            top: `${box.top}px`,
            left: `${box.left}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            backgroundColor: 'rgba(0,255,0,0.3)'
          }} />}
          {points.map((point, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${point.y}px`,
                left: `${point.x}px`,
                width: '10px',
                height: '10px',
                backgroundColor: 'red',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>
        <div>
          <input type="file" onChange={handleImageChange} style={{ marginBottom: '1rem' }} />
        </div>
      </div>
      <div>
        {points.length === 4 &&
          <div>
            <h2>Coordinates:</h2>
            {points.map((point, index) => (
              <p key={index}>{`Point ${index + 1}: (${point.x}, ${point.y})`}</p>
            ))}
            <button onClick={handleCopy} style={{
              backgroundColor: '#61dafb',
              fontSize: 'calc(10px + 2vmin)',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>Copy to clipboard</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
