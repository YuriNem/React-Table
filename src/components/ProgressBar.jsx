import React from 'react';

const ProgressBar = ({ progress }) => {
    if (progress > 90) {
        progress = 100;
    }
    const style = {
        width: `${progress}%`,
        height: '30px',
        backgroundColor: 'green',
    };
    return (
        <div className="progress-bar">
          <div className="progress-bar__progress" style={style}></div>
        </div>
    );
}

export default ProgressBar;
