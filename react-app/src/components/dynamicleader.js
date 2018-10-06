import React, { Component } from 'react';
import './play.css';
import UserProfile from './userProfile';


var array = [];
for (let index = 0; index < 20; index++) {
    array.push(false);
}

class dynamicleader extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            quizname:""
        }


    }


    componentDidMount() {
        console.log("aree dadada   " + this.props.location.search);
        const params = new URLSearchParams(this.props.location.search);
        this.state.quizname = params.get('quizname')
        const request = new Request('http://127.0.0.1:8080/getleaderboard/' + params.get('quizname'));
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
        console.log(this.state.data)

    }

render() {
    return (
        <div className="App">
            {localStorage.getItem('email') &&
            <div>
            <header className="App-header">
                <h1 className="App-title">LeaderBoard</h1>
            </header>
            <h3>Quiz name:{this.state.quizname}</h3>
                <table className="table-danger">
                <thead>
                        <tr className="table-danger">
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>{this.state.data.map(function (item, key) {
                    return (
                        <tr key={key}>
                            <td>{item.user}</td>
                            <td>{item.score}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
            }
            {!localStorage.getItem('email') &&

                <div>
                    <h1>Access Denied!!</h1>
                    <h3>Please Login!</h3>
                </div>
            }

        </div>
    );
}
}

export default dynamicleader;
