import React, { useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { SettingsContext } from '../context/SettingContext';
import TimerEnd from "../assets/bells_long.wav";
import BreakEnd from "../assets/church_bell.wav";


const CountdownAnimation = ({ timer, animate, children }) => {
    const workEnd = new Audio(TimerEnd);
    const breakEnd = new Audio(BreakEnd);
    const { executing, setCurrentTimer, currentSessionStats, setCurrentSessionStats } = useContext(SettingsContext);
    const updateStats = (active) => {
        setCurrentSessionStats(
            {
                ...currentSessionStats,
                [active]: currentSessionStats[active] +1
            }
        )
    }
    console.log(executing)
    return (
        <div>
            <CountdownCircleTimer
                isPlaying={animate}
                duration={timer * 60}
                colors={[
                    ['#efefef', 1]
                ]}
                strokeWidth={22}
                size={395}
                trailColor='#00000000'
                onComplete={() => {
                    // { executing.active === 'work' ? workEnd.play() : breakEnd.play() };
                    updateStats(executing.active);
                    switch (executing.active) {
                        case 'work':
                            if ((currentSessionStats.work + 1) % executing.interval === 0) {
                                setCurrentTimer('long');
                                break;
                            }
                            else setCurrentTimer('short')
                            break;
                        case 'short':
                        case 'long':
                            setCurrentTimer('work');
                            break;
                        default:
                            break;
                    }
                }}            
            >
                {children}
            </CountdownCircleTimer>
        </div>
    )
}

export default CountdownAnimation
