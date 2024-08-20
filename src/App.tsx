import React, { useState, useEffect } from 'react';
import Heart from './components/Heart';

const App: React.FC = () => {
  const [emptyHearts, setEmptyHearts] = useState<number[]>([]);

  useEffect(() => {
    const now = new Date();
    const nineAmToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);

    if (now >= nineAmToday) {
      const hoursPassedSince9AM = now.getHours() - 9;

      if (hoursPassedSince9AM < 9) {
        // Set initial state based on hours passed since 9 AM
        setEmptyHearts(Array.from({ length: hoursPassedSince9AM }, (_, i) => 8 - i));

        // Continue the transition if necessary
        const interval = setInterval(() => {
          setEmptyHearts((prev) => {
            if (prev.length < 9) {
              return [...prev, 8 - prev.length];
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 3600000); // 1 hour = 3600000 milliseconds

        return () => clearInterval(interval);
      } else {
        setEmptyHearts(Array.from({ length: 9 }, (_, i) => 8 - i)); // All hearts empty if hours passed > 9 hours
      }
    }

    // Check every minute to reset at 9 AM
    const minuteInterval = setInterval(() => {
      const currentTime = new Date();
      if (currentTime.getHours() === 9 && currentTime.getMinutes() === 0) {
        setEmptyHearts([]);
        // Start the transition
        let startTime = 0;
        const interval = setInterval(() => {
          setEmptyHearts((prev) => {
            if (startTime < 9) {
              startTime += 1;
              return [...prev, 8 - prev.length];
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 3600000); // 1 hour = 3600000 milliseconds
      }
    }, 60000); // Check every minute

    return () => clearInterval(minuteInterval);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Heart key={index} isEmpty={emptyHearts.includes(index)} />
        ))}
      </div>
    </div>
  );
};

export default App;
