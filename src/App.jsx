import { useEffect, useRef, useState } from "react";
import LapTable from "./components/LapTable";

function App() {
  const [timer, setTimer] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isDisableStart, setDisableStart] = useState(false);
  const [isDisableStop, setDisableStop] = useState(true);
  const [isDisableReset, setDisableReset] = useState(true);
  const [isDisableLap, setDisableLap] = useState(true);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef();
  const handleStart = () => {
    setDisableStart(true);
    setDisableStop(false);
    setDisableReset(true);
    setDisableLap(false);
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
    setDisableStop(true);
    setDisableLap(true);
    setLaps([]);
  };

  const handleLap = () => {
    const arr = [...laps];
    arr.push(format(minutes) + "." + format(seconds) + "." + format(timer));
    setLaps(arr);
  };

  const format = (term) => {
    return String(term).length == 1 ? "0" + term : term;
  };

  useEffect(() => {
    console.log(laps);
  }, [laps]);

  useEffect(() => {
    if (timer > 99) {
      setTimer(0);
      setSeconds(seconds + 1);
    }
  }, [timer]);

  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      setMinutes(minutes + 1);
    }
  }, [seconds]);

  return (
    <section className="main">
      <div
        className="heading"
        onClick={() => {
          window.location.reload();
        }}
      >
        Stopwatch
      </div>
      <div className="stopwatch">
        <div className="display">
          {format(minutes)}
          <span className="fullstop">.</span>
          {format(seconds)}
          <span className="cSeconds">.{format(timer)}</span>
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
          {!isDisableLap && (
            <button className="btn btn__lap" onClick={handleLap}>
              Lap
            </button>
          )}
        </div>
      </div>
      <LapTable laps={laps} />
    </section>
  );
}

export default App;
