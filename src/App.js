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
      kbKeys: ["Q","W","E","A","S","D","Z","X","C"],
      keyPressed: '',
      padStyle: inactiveStyle
    }
    this.handleKeydown = this.handleKeydown.bind(this)
    this.setInactiveStyle = this.setInactiveStyle.bind(this)
  }
  componentDidMount(){
    const fccScript = document.createElement("script");
    fccScript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    fccScript.async = true;
    document.body.appendChild(fccScript);

    document.addEventListener('keydown', this.handleKeydown)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeydown)
  }
  handleKeydown(e){
    let drumIndex = drumKeyMap.findIndex(drum => drum.keyCode === e.code)
    if(drumIndex !== -1){
      this.setState({
        keyPressed: drumKeyMap[drumIndex].kbKey,
        padStyle: activeStyle,
      })
    } else{
    this.setState({
      keyPressed: '',
      padStyle: activeStyle,
    })
  }
    setTimeout(() => this.setInactiveStyle(),100);
    console.log(e.code);
  }
  setInactiveStyle(){
      this.setState({
        padStyle: inactiveStyle
      })
  }
  render() {
    let display = ""
    if(this.state.keyPressed !== ""){
      display = drumKeyMap[drumKeyMap.findIndex(drum => drum.kbKey === this.state.keyPressed)].drumSound
    }
    return (
      <div id="drum-machine">
      <DrumPads keyPressed={this.state.keyPressed} kbKeys={this.state.kbKeys} style={this.state.padStyle}/>
      <Display keyPressed={this.state.keyPressed} display={display}/>
      </div>
    );
  }
}

class DrumPads extends React.Component {
  constructor(props){
    super(props)
    this.playSound = this.playSound.bind(this)
  }
  playSound(){
    
  }
  render(){
    const drumPads = this.props.kbKeys.map((kbKey, i) => {
      if(this.props.keyPressed === kbKey){
        return <div key={i} id={drumKeyMap[drumKeyMap.findIndex(drum => drum.kbKey === kbKey)].drumSound} className="drum-pad" style={this.props.style}>{kbKey}</div>
      } else {
        return <div key={i} id={drumKeyMap[drumKeyMap.findIndex(drum => drum.kbKey === kbKey)].drumSound} className="drum-pad" style={inactiveStyle}>{kbKey}</div>
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
  },
  {
    kbKey: "W",
    keyCode: "KeyW",
    drumSound: "small-crash",
  },
  {
    kbKey: "E",
    keyCode: "KeyE",
    drumSound: "big-crash"
  },
  {
    kbKey: "A",
    keyCode: "KeyA",
    drumSound: "closed-hihat"
  },
  {
    kbKey: "S",
    keyCode: "KeyS",
    drumSound: "snare-drum"
  },
  {
    kbKey: "D",
    keyCode: "KeyD",
    drumSound: "left-tom"
  },
  {
    kbKey: "Z",
    keyCode: "KeyZ",
    drumSound: "open-hihat"
  },
  {
    kbKey: "X",
    keyCode: "KeyX",
    drumSound: "bass-drum"
  },
  {
    kbKey: "C",
    keyCode: "KeyC",
    drumSound: "right-tom"
  }
]


export default App;
