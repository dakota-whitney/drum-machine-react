import React from 'react';
import './App.css';

const inactiveStyle = {
  borderStyle: 'solid',
  borderWidth: 2,
  paddingTop: 35,
  boxShadow: '3px 3px 5px black'
}

const activeStyle = {
  backgroundColor: 'white',
  color: '#282c34',
  paddingTop: 35
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeDrum: {},
      padStyle: inactiveStyle,
      keyPressed: '',
      padClicked: ''
    }
    this.handleKeydown = this.handleKeydown.bind(this)
    this.setInactiveStyle = this.setInactiveStyle.bind(this)
    this.playSound = this.playSound.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount(){
    const fccScript = document.createElement("script");
    fccScript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    fccScript.async = true;
    document.body.appendChild(fccScript);

    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('click',this.handleClick)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeydown)
    document.addEventListener('click',this.handleClick)
  }
  handleKeydown(e){
    let drumIndex = drumKeyMap.findIndex(drum => drum.keyCode === e.code)
    if(drumIndex !== -1){
      this.setState({
        keyPressed: drumKeyMap[drumIndex].kbKey,
        padStyle: activeStyle,
        activeDrum: drumKeyMap[drumIndex]
      })
      this.playSound();
      setTimeout(() => this.setInactiveStyle(),100);
    }
  }
  handleClick(e){
    let drumIndex = drumKeyMap.findIndex(drum => drum.drumSound === e.target.id)
    if(drumIndex !== -1){
      this.setState({
        padStyle: activeStyle,
        activeDrum: drumKeyMap[drumIndex]
      })
      let audio = document.getElementById(drumKeyMap[drumIndex].kbKey);
      audio.play();
      setTimeout(() => this.setInactiveStyle(),100);
    }
  }
  setInactiveStyle(){
      this.setState({
        padStyle: inactiveStyle
      })
  }
  playSound(){
    let audio = document.getElementById(this.state.keyPressed)
    console.log(audio)
    audio.play();
  }
  render() {
    const display = this.state.activeDrum.drumSound
    return (
      <div id="drum-machine">
      <DrumPads activeDrum={this.state.activeDrum} handleClick={this.handleClick} style={this.state.padStyle}/>
      <Display activeDrum={this.state.activeDrum} display={display}/>
      </div>
    );
  }
}

class DrumPads extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const drumPads = drumKeyMap.map((drum, i) => {
      if(drum.kbKey === this.props.activeDrum.kbKey){
       return <div key={i} id={drum.drumSound} className="drum-pad" style={this.props.style} onClick={this.props.handleClick}>
          <audio src={drum.source} id={drum.kbKey} className="clip" />
                 {drum.kbKey}
        </div>
      } else{
        return <div key={i} id={drum.drumSound} className="drum-pad" style={inactiveStyle} onClick={this.props.handleClick}>
          <audio src={drum.source} id={drum.kbKey} className="clip" />
                 {drum.kbKey}
        </div>
      }
    })
    return (
      <div id="drum-pads">
      {drumPads}
      </div>
    );
  }
}

class Display extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div id="display">
        {this.props.display}
      </div>
    );
  }
}

const drumKeyMap = [
  {
    kbKey: "Q",
    keyCode: "KeyQ",
    drumSound: "ride-cymbal",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/ride-cymbal.wav"
  },
  {
    kbKey: "W",
    keyCode: "KeyW",
    drumSound: "small-crash",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/small-crash.wav"
  },
  {
    kbKey: "E",
    keyCode: "KeyE",
    drumSound: "big-crash",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/big-crash.wav"
  },
  {
    kbKey: "A",
    keyCode: "KeyA",
    drumSound: "closed-hihat",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/closed-hihat.wav"
  },
  {
    kbKey: "S",
    keyCode: "KeyS",
    drumSound: "snare-drum",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/snare-drum.wav"
  },
  {
    kbKey: "D",
    keyCode: "KeyD",
    drumSound: "left-tom",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/left-tom.wav"
  },
  {
    kbKey: "Z",
    keyCode: "KeyZ",
    drumSound: "open-hihat",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/open-hihat.wav"
  },
  {
    kbKey: "X",
    keyCode: "KeyX",
    drumSound: "bass-drum",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/bass-drum.wav"
  },
  {
    kbKey: "C",
    keyCode: "KeyC",
    drumSound: "right-tom",
    source: "https://raw.githubusercontent.com/dakota-whitney/drum-machine-react/main/public/right-tom.wav"
  }
]


export default App;
