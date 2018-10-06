import React, { Component } from 'react';
import './selectQuiz.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class selectQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }

    }
    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getquiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        return (
            <div >
                <h1>Which Quiz do you wanna Play?</h1>
                <div className="bbcc">
                   <h2> General Knowledge </h2>
                    <br></br>
                    <br></br>
                    <Link to="/play"><button>Select</button></Link>
                </div >
                <div className="bbcc">
                    <h2>Movies</h2> 
                    <br></br>
                    <br></br>
                    <Link to="/playMovies"><button>Select</button></Link>
                </div>
                <div>{this.state.data.map(function (item, key) {
                    return(
                        <div className="cld" key={key}>
                        <h2>{item.quizname}</h2>
                        <h3>Genre:{item.genre}</h3>
                        <br></br>
                        <br></br>
                            
                            <Link to ={"/dynamic/?quizname="+item.quizname}>
                                <button>Select</button>
                            </Link>
                        </div>
                      )
                 }) }
                </div>
            </div>
        );
    }
}

export default selectQuiz;
