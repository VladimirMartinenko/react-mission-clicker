import React from "react";
import Settingstep from "./settingStep.jsx";
import styles from "./styles.module.css"

class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      step: 1,
      isClick: true,
      clickerId: null,
      interval: 1000,
      color:null,
    };
    this.isRendered = false;
    this.isFirstStart = true;
    this.workClicker = 30000;
    }
  componentDidMount() {
    if (this.isRendered) {
      return;
    }
    this.isRendered = true;
    console.log("mount");
    if (!this.state.clickerId) {
      this.autoclick();
    }
  }
  componentDidUpdate() {
    console.log("update");
  }
  componentWillUnmount() {
    console.log("unmount");
    this.stop();
  }
  autoclick = () => {
    // const { time, number } = this.state;
    if (!this.state.clickerId) {
      const clickerId = setInterval(() => {
        this.setState({
          number: this.state.number+ this.state.step,
          clickerId,
        });
      }, this.state.interval);
    }
    if (this.isFirstStart) {
      this.isFirstStart = false;
      setTimeout(() => {
        clearInterval(this.state.clickerId);
        this.stop();
      }, this.workClicker);
    }
  };
  stop = () => {
      clearInterval(this.state.clickerId);
      this.setState({ clickerId: null });
  };
  intervalstep = (e) => {
    this.setState({
      interval: +(e.target.value),
    });
  };
  pluss = () => {
    const { number, step } = this.state;
    this.setState({
      number: number + step,
      color:{'background-color':"green"}
    });
  };

  installstep = (e) => {
    console.log("привет");
    this.setState({
      step: +(e.target.value),
    });
  };
  minus = () => {
    const { number, step } = this.state;
    this.setState({
      number: number - step,
      color:{'background-color':"red"}
    });
    
  };
  

  render() {
    const { number, step, isClick, interval} = this.state;
    return (
      <article className={styles.container} >
        <div className={styles.containerClicker} style={this.state.color} >
        <div>Таймер: {number}</div>
        <div>ШАГ: {step}</div>
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
        <Settingstep step={step} installstep={this.installstep} />
        <label htmlFor="">Частота автонажатий:<input
          onChange={this.intervalstep}
          type="text"
          name="number"
          value={interval}
        /></label>
        <div>Время работы при запуске: {this.workClicker} ms.</div>
        </div>
        </div>
        </article>
    );
  }
}
export default Clicker;
