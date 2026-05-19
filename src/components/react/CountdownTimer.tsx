import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: Dec 1, 2026, 9:00 AM
    const targetDate = new Date(2026, 11, 1, 9, 0, 0);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-wrapper">
      <div className="countdown-text-col">
        <h3 className="countdown-title">Conference Starts In:</h3>
        <p className="countdown-subtitle">Prepare your position papers!</p>
      </div>
      <div className="countdown-units-row">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-unit-col">
            <div className="countdown-number-box">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="countdown-unit-label">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
