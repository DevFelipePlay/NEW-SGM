import { useEffect, useState } from 'react';
import { FaChartPie, FaDatabase, FaGear, FaServer, FaSimCard, FaUser } from 'react-icons/fa6';
import './Loader.css';

const icons = [FaSimCard, FaDatabase, FaServer, FaUser, FaGear, FaChartPie];

export function PreLoader() {
  const [counter, setCounter] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter === icons.length - 1 ? 0 : prevCounter + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNum((prevNum) => (prevNum === 100 ? 100 : prevNum + 1));
    }, 50);
    return () => clearTimeout(timeout);
  }, [num]);

  return (
    <div className='loader'>
      <div className='image'>
        {icons.map((Icon, index) => (
          <div key={index} style={{ display: index === counter ? 'block' : 'none' }}>
            <Icon />
          </div>
        ))}
      </div>
      <span>{num}%</span>
    </div>
  );
}
