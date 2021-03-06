import React from 'react'

function ControlFocus({decreaseBreak,increaseBreak,secondsToTime,breakDuration}){
  

 
  
  
  
  return(
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
    )
}

export default ControlFocus;