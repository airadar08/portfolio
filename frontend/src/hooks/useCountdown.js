import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

export function useCountdown(targetIso) {
  const calc = () => {
    const target = targetIso ? new Date(targetIso).getTime() : Date.now();
    const diff = Math.max(0, target - Date.now());
    return {
      days: pad(Math.floor(diff / 86400000)),
      hours: pad(Math.floor(diff / 3600000) % 24),
      minutes: pad(Math.floor(diff / 60000) % 60),
      seconds: pad(Math.floor(diff / 1000) % 60),
      done: diff <= 0,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  return time;
}
