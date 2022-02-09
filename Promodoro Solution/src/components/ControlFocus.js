import React from 'react'

function ControlFocus({getFocusDuration,decreaseFocus,increaseFocus}){
  

 
  
  
  
  return(
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {getFocusDuration()}
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
    )
}

export default ControlFocus;