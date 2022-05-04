import React from "react";
import Settingstep from "./settingStep.jsx";
import styles from "./styles.module.css"

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      number: 1,
      isClick: true,
      timerId: null,
      interval: 1000,
      color:null,
    };
    this.isRendered = false;
    this.isFirstStart = true;
    this.workTimer = 30000;
    }
  componentDidMount() {
    if (this.isRendered) {
      return;
    }
    this.isRendered = true;
    console.log("mount");
    if (!this.state.timerId) {
      this.autoclick();
    }
  }
  componentDidUpdate() {
    console.log("update");
    this.meaning+=1
  }
  componentWillUnmount() {
    console.log("unmount");
    this.stop();
  }
  autoclick = () => {
    // const { time, number } = this.state;
    if (!this.state.timerId) {
      const timerId = setInterval(() => {
        this.setState({
          time: this.state.time + this.state.number,
          timerId,
        });
      }, this.state.interval);
    }
    if (this.isFirstStart) {
      this.isFirstStart = false;
      setTimeout(() => {
        clearInterval(this.state.timerId);
        this.stop();
      }, this.workTimer);
    }
  };
  stop = () => {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
  };
  intervalstep = (e) => {
    this.setState({
      interval: +(e.target.value),
    });
  };
  pluss = () => {
    const { time, number } = this.state;
    this.setState({
      time: time + number,
      color:{'background-color':"green"}
    });
  };

  step = (e) => {
    console.log("привет");
    this.setState({
      number: +(e.target.value),
    });
  };
  minus = () => {
    const { time, number } = this.state;
    this.setState({
      time: time - number,
      color:{'background-color':"red"}
    });
    
  };
  

  render() {
    const { time, number, isClick, interval} = this.state;
    return (
      <article className={styles.container} >
        <div className={styles.containerTimer} style={this.state.color} >
        <div>Таймер: {time}</div>
        <div>ШАГ: {number}</div>
        <div>
        <button onClick={isClick ? this.pluss : this.minus}>добавить</button>
        {/* <input onChange={this.step} type="text" name="number" value={number} /> */}
         <button
          onClick={() => {
            this.setState({ isClick: !this.state.isClick });
          }}>переключить
        </button>
        <button onClick={this.autoclick}>start</button>
        <button onClick={this.stop}>stop</button>
        </div>
        <div>
        <Settingstep number={number} step={this.step} />
        <label htmlFor="">Частота автонажатий:<input
          onChange={this.intervalstep}
          type="text"
          name="number"
          value={interval}
        /></label>
        <div>Время работы при запуске: {this.workTimer} ms.</div>
        </div>
        </div>
        </article>
    );
  }
}
export default Timer;
