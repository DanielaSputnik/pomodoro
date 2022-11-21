import SetPomodono from "./Components/PomodoroSettings";
import CountdownAnimation from './Components/CountdownAnim';
import { useContext, useEffect } from "react";
import { SettingsContext } from "./context/SettingContext";
import Button from "./Components/Button";

function App() {
  const {
    pomodoro,
    executing,
    setCurrentTimer,
    SettingsButton,
    children,
    startAnimate,
    startTimer,
    pauseTimer,
    updateExecution,
    currentSessionStats,
    onComplete
  } = useContext(SettingsContext)

  useEffect(() => {
    updateExecution(executing);
  }, [executing, startAnimate]);  
  
  return (
    <div className="container">
      <h1 className="title">܍FOCUS܍</h1>
      <div className="pomodoro-container">
        {pomodoro === 0 ?
          <SetPomodono /> :
          <>
            <ul className='labels'>
              <li>
                <Button
                  title='Work'
                  activeClass={executing.active === 'work' ? 'active-label' : undefined}
                  _callback={() => setCurrentTimer('work')}
                />
              </li>
              <li>
                <Button
                  title='Short Break'
                  activeClass={executing.active === 'short' ? 'active-label' : undefined}
                  _callback={() => setCurrentTimer('short')}
                />
              </li>
              <li>
                <Button
                  title='Long Break'
                  activeClass={executing.active === 'long' ? 'active-label' : undefined}
                  _callback={() => setCurrentTimer('long')}
                />
              </li>
            </ul>

            <div className='time-container'>
              <div className='time-wrapper'>
                <CountdownAnimation
                  key={pomodoro}
                  timer={pomodoro}
                  animate={startAnimate}
                >
                  {children}
                </CountdownAnimation>
              </div>

              <div className='button-wrapper'>
                <Button title='Start'
                  className={!startAnimate ? 'active' : undefined}
                  _callback={startTimer} />
                <Button title='Pause'
                  className={!startAnimate ? 'active' : undefined}
                  _callback={pauseTimer} />
              </div>

            </div>
            <Button
              title='Settings'
              _callback={SettingsButton}
            />
            <div className="stats">
              <div>SESSION STATISTICS</div>
              <div>
                <p>Works: {currentSessionStats.work}</p>
                <p>Short Breaks: {currentSessionStats.short}</p>
                <p>Long Breaks: {currentSessionStats.long}</p>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
