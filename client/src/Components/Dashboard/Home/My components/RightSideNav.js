import React from "react";
import Calendar from './Calendar';
import MeetingWithGuide from './MeetingWithGuide';

function RightNav() {
    return (
        <div className="right-nav">
            <div className="cal">
                <Calendar />
            </div>
            {/* <div className="meet">
                <MeetingWithGuide />
            </div> */}
        </div>
    )
}

export default RightNav;