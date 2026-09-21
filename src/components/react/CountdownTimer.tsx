import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: Early Bird Deadline - November 1, 2026 at 11:59 PM
    const year = 2026;
    const month = 10; // November (0-indexed)
    const day = 1;
    const hour = 23;
    const minute = 59;
    const second = 0;

    const targetDate = new Date(year, month, day, hour, minute, second);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
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
        <h3 className="countdown-title">Early Bird Registration Ends In:</h3>
        <p className="countdown-subtitle">Save $15 - Register before November 1st!</p>
      </div>
      <div className="countdown-units-row">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-unit-col">
            <div className="countdown-number-box">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="countdown-unit-label">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
