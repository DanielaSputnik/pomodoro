import React, { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../context/SettingContext';
import Slider from '@material-ui/core/Slider';
import { withStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles({
    root: {
        color: 'white',
        height: 9,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const SetPomodono = () => {
    const [newTimer, setNewTimer] = useState({
        work: 20,
        short: 5,
        long: 15,
        interval: 4,
        active: 'work'
    });
    const { updateExecution } = useContext(SettingsContext);

    const handleChange = name => (input, value) => {
        console.log(value )
        setNewTimer(
            {
                ...newTimer,
                [name]: parseInt(value)
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateExecution(newTimer);
    }
    const handleReset = () => {
        const resetValue = {
            ...newTimer,
            work: 20,
            short: 5,
            long: 15,
            interval: 4,
        }
        setNewTimer(resetValue)
    }

    return (
        <div className="form-container">
            <form noValidate onSubmit={handleSubmit}>
                    <h1>WORK</h1>
                    <h2>{newTimer.work} minute</h2>
                    <PrettoSlider
                        value={newTimer.work}
                        min={1}
                        max={90}
                        onChange={handleChange('work')}
                    />

                    <h1>SHORT BREAK</h1>
                    <h2>{newTimer.short+ 0.0002} minute</h2>
                    <PrettoSlider
                        value={newTimer.short }
                        min={1}
                        max={90}
                        onChange={handleChange('short')} />

                    <h1>LONG BREAK</h1>
                    <h2>{newTimer.long+0.0001} minute</h2>
                    <PrettoSlider
                        value={newTimer.long}
                        min={1}
                        max={90}
                        onChange={handleChange('long')} />
                    
                    <h1>INTERVAL</h1>
                    <h2>Long break after {newTimer.interval} works</h2>
                    <PrettoSlider
                        value={newTimer.interval}
                        min={2}
                        max={10}
                        onChange={handleChange('interval')} />
                    
                    <div className='form-Btns'>
                        <div className='submit-Btn' onClick={handleReset}>Reset</div>
                        <button type='submit' className='submit-Btn'>Set Timer</button>
                    </div>
            </form>
        </div>
    )
}

export default SetPomodono
