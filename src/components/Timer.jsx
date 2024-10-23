import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="timer">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
