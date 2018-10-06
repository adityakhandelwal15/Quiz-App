import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'



class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/previousquiz/' + localStorage.getItem('email'));
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
    console.log(this.state.data)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz App</h1>
        </header>
        <h2>Welcome to the Quiz App {localStorage.getItem('email')}!!</h2>
        {localStorage.getItem('email') && 
        <div>
        <h3>Your Previously attempted quizes</h3>
        <table className="table-hover ">
          <thead>
            <tr>
              <th>Quizname</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function (item, key) {
            return (
              <tr key={key}>
                <td>{item.quizname}</td>
                <td>{item.score}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </div>
        }
      </div>
    );
  }
}

export default Home;
