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
    <div className="mun-27">
      <div className="mun-28">
        <h3 className="mun-29">Conference Starts In:</h3>
        <p className="mun-30">Prepare your position papers!</p>
      </div>
      <div className="mun-31">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="mun-32">
            <div className="mun-33">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="mun-34">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
