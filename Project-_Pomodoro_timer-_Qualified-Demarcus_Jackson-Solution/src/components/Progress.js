
import React from 'react'

function Progress({session, focusDuration, breakDuration}){
  return(
<div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={session.label=="Focusing" ? ((focusDuration-session.timeRemaining/60)*100)/focusDuration : ((breakDuration-session.timeRemaining/60)*100)/breakDuration} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: session.label=="Focusing" ? ((focusDuration-session.timeRemaining/60)*100)/focusDuration+"%" : ((breakDuration-session.timeRemaining/60)*100)/breakDuration+"%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
  )
}
      
      export default Progress;