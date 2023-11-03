
import { Component } from 'react';
import './App.css';





 class TimerInput extends Component {

  render() {
    return (
      <div>
        <h3>Input your desire time</h3>
        <input type="number" value={this.props.value} onChange={this.props.handleChange} required />
      </div>
    );
  }
}

 class Time extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.value} : {this.props.seconds} </h1>
      </div>
    );
  }
}

 class ButtonStart extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.startCountDown}>Start!</button>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      value: ' ',
      isClicked: false
    }
    this.secondsRemaining = 0;
    this.intervalHandle = null;;
    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }
   
  tick() {
    const min = Math.floor(this.secondsRemaining / 60);
    const sec = this.secondsRemaining - (min * 60);

    this.setState({
      value: min,
      seconds: sec < 10 ? `0${sec}` : sec,
    });
  
    if (min === 0 && sec === 0) {
      clearInterval(this.intervalHandle);
    }

    this.secondsRemaining--;
  }
   
  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      isClicked: true
    })
  }


  render() {
    const clicked = this.state.isClicked;
    if (clicked) {
      return (
            <Time value={this.state.value} seconds={this.state.seconds} />
      )
    }
    else {
      return (
        <div>
            <TimerInput value={this.state.value} handleChange={this.handleChange} />
            <Time value={this.state.value} seconds={this.state.seconds} />
            <ButtonStart startCountDown={this.startCountDown} value={this.state.value} />
        </div>
          );
    }
  }
}

