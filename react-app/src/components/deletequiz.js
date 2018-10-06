import React, { Component } from 'react';
import './DeletePerson.css';

class deletequiz extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }


    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getquiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {

        function del(id, event) {
            fetch('http://localhost:8080/deletequiz/' + id, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.status >= 200 && response.status < 300)
                        window.location.reload()

                });
        }

        return (
            <div className="App">
                {localStorage.getItem('email') == "admin@quiz" &&
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">Delete Quiz</h1>
                        </header>

                        <table className="table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Quiz Name</th>
                                    <th>Genre</th>
                                    
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(function (item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>{item.quizname}</td>
                                        <td>{item.genre}</td>
                                        <td><button onClick={del.bind(this, item.id)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                }
                {localStorage.getItem('email') != "admin@quiz" &&
                    <div>
                        <h1>Access Denied!!</h1>
                        <h2>Note:</h2><h3>Only Admin have access to the requested page!</h3>
                    </div>
                }
            </div>
        );
    }
}

export default deletequiz;
