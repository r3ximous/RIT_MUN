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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform -translate-y-1/2 mx-4 md:mx-auto max-w-4xl flex flex-wrap justify-around items-center gap-4">
      <div className="text-center md:text-left flex-1 min-w-[200px]">
        <h3 className="text-xl font-bold text-brand-dark">Conference Starts In:</h3>
        <p className="text-gray-500 text-sm">Prepare your position papers!</p>
      </div>
      <div className="flex gap-4 md:gap-8 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-brand-dark text-white text-3xl md:text-5xl font-bold w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-inner">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wider mt-2 font-semibold text-gray-600">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
