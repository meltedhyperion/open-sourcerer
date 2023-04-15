import React, { FC, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import "./popup.css";
import "../styles/globals.css";
interface IProps {

}

export const Popup: FC<IProps> = () => {
  const [percentage,setPercentage] = useState(60)
    const handleCloseButtonClick = () => {
        window.close();
    };
    useEffect(() => {
      console.log(location.pathname)
    },[])
    return (
      <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-bold">Open Sourcerer</h1>
          <button className="Button--primary Button">My Profile</button>
      </div>
      <hr className="my-2 border-gray-400" />
      {RepoAnalytics(percentage)}   
      <div className="flex flex-row justify-end items-end">
          <button className="btn Button" onClick={handleCloseButtonClick}>Close</button>
      </div>
  </div>
    )
}
interface ProgressBarProps {
    percentage: number;
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const gradientId = 'progress-gradient';
  
    const gradientStops = [
        { offset: '0%', color: '#03fc0b' },
      { offset: '50%', color: '#ed8309' },
      { offset: '100%', color: '#f2340a' },
    ];
  
    const [offset, setOffset] = useState(251.2);
  
    useEffect(() => {
      const newOffset = 251.2 - (251.2 * percentage) / 100;
      setOffset(newOffset);
    }, [percentage]);
  
    return (
      <div style={{ position: 'relative', width: 200, height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientStops.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e6e6" strokeWidth="12" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251.2"
            transform="rotate(-90, 50, 50)"
            style={{
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
          <text
            x="50"
            y="53"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
            fontSize="24"
            fill="#f68e56"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    );
  };



  const RepoAnalytics = (percentage: number) => {
    return (
          <div className="flex-grow flex">
            <div className='flex flex-col'>
              <div className='p-4'>
                <ProgressBar percentage={percentage} />
              </div>
              <div className='flex flex-grow bg-[#20252B] rounded-2xl m-2 mt-7'>
                <div className='flex flex-col flex-grow items-center p-1'>
                  Issue tags
                </div>
                <div>
                  
                </div>
              </div>
            </div>
            <div className='flex flex-col flex-grow'>
              <div className='flex flex-grow'>
                <div className='flex flex-grow bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex flex-col flex-grow items-center p-1'>
                    PR Merge Rate
                  </div>
                  <div>

                  </div>
                </div>
                <div className='flex flex-grow bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex flex-col flex-grow items-center p-1'>
                    Organization Size
                  </div>
                  <div>

                  </div>
                </div>
              </div>
              <div className='flex flex-grow'>
                <div className='flex flex-grow bg-[#20252B] rounded-2xl m-2 my-3' style={{ flexBasis: '60%' }}>
                  <div className='flex flex-col flex-grow items-center p-1'>
                    Issues
                  </div>
                  <div>

                  </div>
                </div>
                <div className='flex flex-grow bg-[#20252B] rounded-2xl m-2 my-3' style={{ flexBasis: '40%' }}>
                  <div className='flex flex-col flex-grow items-center p-2'>
                    Documentation Length
                  </div>
                  <div>

                  </div>
                </div>
              </div>
              <div className='flex flex-grow'>
                <div className='flex flex-grow bg-[#20252B] rounded-2xl m-2 mt-3'>
                  <div className='flex flex-col flex-grow items-center p-1'>
                    Languages
                  </div>
                  <div>

                  </div>
                </div>
              </div>
            </div>
            
        </div>
    )
  }
  render(<Popup />, document.getElementById('popup'));

