
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  className?: string;
  onComplete?: () => void;
}

const CountdownTimer = ({
  initialHours = 24,
  initialMinutes = 0,
  initialSeconds = 0,
  className = "",
  onComplete,
}: CountdownTimerProps) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds, onComplete]);

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="bg-dulce-beige rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold text-dulce-green">{formatTime(hours)}</div>
        <div className="text-xs text-dulce-green-dark/70">Horas</div>
      </div>
      <div className="text-2xl font-bold text-dulce-green">:</div>
      <div className="bg-dulce-beige rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold text-dulce-green">{formatTime(minutes)}</div>
        <div className="text-xs text-dulce-green-dark/70">Minutos</div>
      </div>
      <div className="text-2xl font-bold text-dulce-green">:</div>
      <div className="bg-dulce-beige rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold text-dulce-green">{formatTime(seconds)}</div>
        <div className="text-xs text-dulce-green-dark/70">Segundos</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
