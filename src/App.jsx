import { useEffect, useRef, useState } from "react";

function App() {
  const [timer, setTimer] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isDisableStart, setDisableStart] = useState(false);
  const [isDisableStop, setDisableStop] = useState(true);
  const [isDisableReset, setDisableReset] = useState(true);
  const timerRef = useRef();
  const handleStart = () => {
    setDisableStart(true);
    setDisableStop(false);
    setDisableReset(true);
    timerRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setDisableStop(true);
    setDisableReset(false);
    setDisableStart(false);
  };

  const handleReset = () => {
    setTimer(0);
    setSeconds(0);
    setMinutes(0);
    setDisableReset(true);
    setDisableStart(false);
    setDisableStop(false);
  };

  const format = (term) => {
    return String(term).length == 1 ? "0" + term : term;
  };

  useEffect(() => {
    console.log(timer);

    if (timer == 100) {
      setTimer(0);
      setSeconds(seconds + 1);
    }
  }, [timer]);

  useEffect(() => {
    if (seconds == 60) {
      setSeconds(0);
      setMinutes(minutes + 1);
    }
  }, [seconds]);

  return (
    <div className="stopwatch">
      <div className="display">
        {format(minutes)}:{format(seconds)}:{format(timer)}
      </div>
      <div className="btns">
        {!isDisableStart && (
          <button
            className="btn btn__start"
            onClick={handleStart}
            disabled={isDisableStart}
          >
            Start
          </button>
        )}
        {!isDisableStop && (
          <button className="btn btn__stop" onClick={handleStop}>
            Stop
          </button>
        )}
        {!isDisableReset && (
          <button className="btn btn__reset" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
