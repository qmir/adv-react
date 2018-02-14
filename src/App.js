import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

const ipfs = new IPFS({
    repo: 'ipfs/pubsub-demo/' + Math.random(),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
})
const room = Room(ipfs, 'ipfs-pubsub-demo')




class App extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: ''
    };

    // bind methods
    //this.captureFile = this.captureFile.bind(this);
    this.ipfs = ipfs
    this.room = room
  }


  componentDidMount() {
    ipfs.once('ready', () => ipfs.id((err, info) => {
      if (err) { throw err }
      console.log('IPFS node ready with address ' + info.id)
      // send and receive messages
      //room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'))
      room.on('message', (message) => {
        console.log(message.data.toString());
        this.setState({msg: message.data.toString()})
      })
      // broadcast message every 2 seconds
      setInterval(() => room.broadcast(this.refs.textarea.value), 3000)
    }))
  }


  render() {
    const {msg} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App">
          <textarea rows="10" cols="45" ref="textarea"></textarea><br />
        </p>
        <p className="App-intro">
          {msg} 111
        </p>
      </div>
    );
  }
}

export default App;
