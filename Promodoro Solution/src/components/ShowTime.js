import React from 'react'

function ShowTime({session, focusDuration, breakDuration, secondsToTime, getTime}){
  

 
  
  
  
  return(
 <div>
      {session && <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {session.label} for {getTime(session.label)} minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToTime(session.timeRemaining)} remaining
            </p>
          </div>
        </div>}
      </div>
    )
}

export default ShowTime;