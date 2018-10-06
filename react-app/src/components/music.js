import React, { Component } from 'react'
// import { Button, Input, Icon, Dropdown, Card } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
// import $ from 'jquery'
// import styles from './Home.scss'
// import Modal from './Modal.jsx'
// import MakeChannelModal from './MakeChannelModal.jsx'

class music extends React.Component {
    constructor(props) {
        super(props);
        this.state = { play: false };
        this.url = "http://animeuniverse.yolasite.com/resources/Death%20Note%20-%20L%27s%20Theme%20B.mp3";
        this.audio = new Audio(this.url);
        this.togglePlay = this.togglePlay.bind(this);
    }

    togglePlay() {
        this.setState({ play: !this.state.play });
        console.log(this.audio);
        this.state.play ? this.audio.play() : this.audio.pause();
    }

    render() {
        return (
            <div>
                <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
            </div>
        );
    }
}

export default music;

