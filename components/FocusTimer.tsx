
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FocusMode } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { ResetIcon } from './icons/ResetIcon';

const FOCUS_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

const FocusTimer: React.FC = () => {
  const [mode, setMode] = useState<FocusMode>(FocusMode.FOCUS);
  const [time, setTime] = useState<number>(FOCUS_DURATION);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const getDuration = useCallback((m: FocusMode) => {
    switch (m) {
      case FocusMode.FOCUS:
        return FOCUS_DURATION;
      case FocusMode.SHORT_BREAK:
        return SHORT_BREAK_DURATION;
      case FocusMode.LONG_BREAK:
        return LONG_BREAK_DURATION;
      default:
        return FOCUS_DURATION;
    }
  }, []);

  const switchMode = useCallback((newMode: FocusMode) => {
    if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    setIsActive(false);
    setMode(newMode);
    setTime(getDuration(newMode));
  }, [getDuration]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if(intervalRef.current) window.clearInterval(intervalRef.current);
            setIsActive(false);
            // Optionally, auto-switch modes
            // switchMode(mode === FocusMode.FOCUS ? FocusMode.SHORT_BREAK : FocusMode.FOCUS);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isActive, mode, switchMode]);

  const toggleTimer = () => {
    if (time > 0) {
        setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    if(intervalRef.current) window.clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(getDuration(mode));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((getDuration(mode) - time) / getDuration(mode)) * 100;
  
  return (
    <div className="bg-base-200 rounded-xl p-6 shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Focus Timer</h2>
      <div className="flex justify-center gap-2 mb-6">
        {(Object.values(FocusMode) as Array<FocusMode>).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${
              mode === m ? 'bg-brand-primary text-white' : 'bg-base-300 hover:bg-base-300/70'
            }`}
          >
            {m.replace('_', ' ')}
          </button>
        ))}
      </div>
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle className="text-base-300" strokeWidth="7" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
            <circle 
              className="text-brand-primary" 
              strokeWidth="7" 
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              strokeLinecap="round"
              stroke="currentColor" 
              fill="transparent" 
              r="45" 
              cx="50" 
              cy="50"
              style={{transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s'}}
            />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-5xl font-mono font-bold">{formatTime(time)}</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="bg-brand-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl hover:bg-brand-primary/80 transition-colors duration-200"
          aria-label={isActive ? 'Pause timer' : 'Start timer'}
        >
          {isActive ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
        </button>
        <button
          onClick={resetTimer}
          className="bg-base-300 text-content-100 w-16 h-16 rounded-full flex items-center justify-center text-xl hover:bg-base-300/70 transition-colors duration-200"
          aria-label="Reset timer"
        >
          <ResetIcon className="w-7 h-7"/>
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
