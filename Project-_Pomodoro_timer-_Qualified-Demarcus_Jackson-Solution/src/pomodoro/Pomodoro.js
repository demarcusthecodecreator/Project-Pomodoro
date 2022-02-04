import React, { useState, useRef } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Progress from "../components/Progress.js"
import ShowTime from "../components/ShowTime.js"


// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function secondsToTime(e){

        var m = Math.floor(e % 3600 / 60).toString().padStart(2,'0')
        var s = Math.floor(e % 60).toString().padStart(2,'0')
    
    return m + ':' + s
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
//   var focusDuration = 25;
  const [focusDuration,setFocusDuration] = useState(25)
   const [breakDuration,setBreakDuration] = useState(5)
  
  const stopButtonRef = useRef(null)

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }
  
  function stopSession(){
    setIsTimerRunning(false)
    setSession(null)
  }
  
  function decreaseFocus(){
    focusDuration>5 && setFocusDuration(focusDuration-5)
  }
  
  function increaseFocus(){
    focusDuration<60 && setFocusDuration(focusDuration+5)
  }
  
    function increaseBreak(){
  breakDuration<15 && setBreakDuration(breakDuration+1)
  }
  
     function decreaseBreak(){
   breakDuration>1 && setBreakDuration(breakDuration-1)
  }
  
    function getTime(label){
    if(label=="Focusing"){
      return secondsToTime(focusDuration*60)
    }
    else{
       return secondsToTime(breakDuration*60)
    }
  }

  


  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {focusDuration.toString().length==1 ? "0"+focusDuration+":"+"00" : focusDuration+":"+"00"}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocus}
              >
                <span className="oi oi-minus" >-</span>
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
           onClick={increaseFocus}
              >
                
                <span className="oi oi-plus" >+</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToTime(breakDuration*60)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                     onClick={decreaseBreak}
                >
                  <span className="oi oi-minus" >-</span>
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                     onClick={increaseBreak}
                >
                  <span className="oi oi-plus" >+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
                >{isTimerRunning?"Pause":"Play"}</span>
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
               disabled={!isTimerRunning}
              ref={stopButtonRef}
              onClick={stopSession}
            >
              <span className="oi oi-media-stop" >Stop</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        
        {session && <ShowTime session={session} focusDuration={focusDuration} breakDuration={breakDuration} getTime={getTime} secondsToTime={secondsToTime}/> 
        }
        {session && <Progress session={session} focusDuration={focusDuration} breakDuration={breakDuration}/>}
      </div>
    </div>
  );
}

export default Pomodoro;
