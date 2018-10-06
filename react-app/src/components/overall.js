import React, { Component } from 'react';
import './play.css';
import UserProfile from './userProfile';


var array = [];
for (let index = 0; index < 20; index++) {
    array.push(false);
}

class overall extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            quizname: ""
        }


    }


    componentDidMount() {
        
        const request = new Request('http://127.0.0.1:8080/getoverallleader');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
        console.log(this.state.data)

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">LeaderBoard</h1>
                </header>
                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Quiz name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.data.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{item.user}</td>
                                <td>{item.quizname}</td>
                                
                                <td>{item.score}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default overall;
