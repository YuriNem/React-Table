import React from 'react';

const ProgressBar = ({ progress }) => {
    if (progress > 90) {
        progress = 100;
    }
    
    const style = {
        width: `${progress}%`,
        height: '50px',
        backgroundColor: '#e6e6e6',
        'border-radius': '5px',
    };

    return (
        <div className="progress-bar" style={style}></div>
    );
}

export default ProgressBar;
