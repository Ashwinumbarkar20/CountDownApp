import React, { useState, useEffect } from "react";
import "./CountDown.css";
import Boxes from "./Boxes";

export default function CountDown() {
  const [Countdown, setCountDown] = useState("");
  const [error, setError] = useState(false);
  const [starttimer, setStartTimer] = useState(false);
  const [time, setTime] = useState({ Days: 0, Hours: 0, Mins: 0, Seconds: 0 });
  const [complete, setComplete] = useState(false);

const Start=()=>{
    const selectd = new Date(Countdown);
    const diff =  selectd-new Date();
   
    if (diff <= 0) {
        setComplete(true);
        setStartTimer(false);
        setCountDown("");
        return;
      }
          setTime({
            Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            Seconds: Math.floor((diff % (1000 * 60)) / 1000),
          })
    
          setComplete(false);
}

  const startCountdown=(e)=>{
    e.preventDefault();
    const selectd = new Date(Countdown);
    const diff =  selectd-new Date();
    setError(false)
   if((selectd<=new Date()) )
    {
        setStartTimer(false)
        setError("cannot Start the Counter for past time")
        setCountDown("");
         setComplete(false)
        return;
    }

    else if(diff > 8640000000)
    {
        setStartTimer(false)
    setError("Selected Date is More than 100 Days, please selecet the date upto 100 days");
    setCountDown("");
    setComplete(false)
   return;
    }
    
        setStartTimer(true);
       
        
    
    }

const reset=()=>{
    setCountDown("");
    setTime({ Days: 0, Hours: 0, Mins: 0, Seconds: 0 })
    setComplete(false);
    setStartTimer(false);
    setError(false);
}
  useEffect(() => {
    if (starttimer) {
      const intervalId = setInterval(Start, 1000);
      return () => clearInterval(intervalId);
    }
  }, [Countdown,starttimer]);

  return (
    <>
      <div className="Main_Counter">
        <form className="Form_Couter" onSubmit={startCountdown}>
          <label htmlFor="">Enter Countdown to Date</label>
          <input
            type="datetime-local"
            disabled={starttimer}
            value={Countdown}
            
            onChange={(e) => {
              setCountDown(e.target.value);
            }}
          />
          {!starttimer &&(<button>Start Countdown</button>)}
          {starttimer && !complete && (<button onClick={reset}>Reset</button>)}
          {starttimer ? (
            <div className="Time">
              <Boxes title="Days" value={time.Days} />
              <Boxes title="Hours" value={time.Hours} />
              <Boxes title="Minutes" value={time.Mins} />
              <Boxes title="Seconds" value={time.Seconds} />
            </div>
          ) : (
            <div className="Time">
              <Boxes title="Days" value="00" />
              <Boxes title="Hours" value="00" />
              <Boxes title="Minutes" value="00" />
              <Boxes title="Seconds" value="00" />
            </div>
          )}

          {error && (
            <>
              <p className="Error">{error}</p>
            </>
          )}
          {complete && (
            <>
              <p className="Complete">
                The countdown is over! What's next on your adventure?
              </p>
             
            </>
          )}
        </form>
      </div>
    </>
  );
}
