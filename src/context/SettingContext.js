import React, { createContext, useState } from 'react'

export const SettingsContext = createContext();

const SettingContextProvider = (props) => {
    const [pomodoro, setPomodoro] = useState(0);
    const [currentSessionStats, setCurrentSessionStats] = useState({
        'work': 0,
        'short': 0,
        'long': 0,
    });
    const [executing, setExecuting] = useState({});
    const [startAnimate, setStartAnimate] = useState(false);

    function setCurrentTimer(active_state) {
        updateExecution({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }

    function startTimer() {
        setStartAnimate(true)
    }
    function pauseTimer() {
        setStartAnimate(false)
    }
    function stopTimer() {
        setStartAnimate(false)
    }
    const SettingsButton = () => {
        setExecuting({})
        setPomodoro(0)
    }

    // pass time to counter
    const children = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const updateType = (evalute) => {
            switch (evalute.active) {
                case 'work':
                    return 'Work';
                case 'short':
                    return 'Short Break';
                case 'long':
                    return 'Long Break';
            }
        }

        return <div >
            <div className='active-timer'>{updateType(executing)}</div>
            <div>
                {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </div>
            
        </div>
    }

    const SettingsBtn = () => {
        setExecuting({});
        setPomodoro(0);
        setCurrentSessionStats({
            'work': 0,
            'short': 0,
            'long': 0,
        });
    }

    const updateExecution = (updatedSettings) => {
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
    }

    const setTimerTime = (evaluate) => {
        switch (evaluate.active) {
            case 'work':
                setPomodoro(evaluate.work)
                break;
            case 'short':
                setPomodoro(evaluate.short)
                break;
            case 'long':
                setPomodoro(evaluate.long)
                break;
            default:
                setPomodoro(0)
                break;
        }
    }
    return (
        <SettingsContext.Provider value={{
            stopTimer,
            updateExecution,
            pomodoro,
            setPomodoro,
            executing,
            startAnimate,
            startTimer,
            pauseTimer,
            SettingsButton,
            setCurrentTimer,
            currentSessionStats,
            setCurrentSessionStats,
            SettingsBtn,
            children
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingContextProvider
