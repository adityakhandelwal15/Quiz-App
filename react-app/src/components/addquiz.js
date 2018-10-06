import React, { Component } from 'react';
import './CreateQues.css';

var movies = false;
var gk = false;
class addquiz extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                ID: "",
                QuizName: "",
                Genre:""
            },
            submitted: false,
        }
        this.handleIChange = this.handleIChange.bind(this);
        this.handleQChange = this.handleQChange.bind(this);
        this.handleGChange = this.handleGChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        console.log(this.state);
            fetch('http://localhost:8080/quiz', {
                method: 'POST',
                body: JSON.stringify(this.state.formData),
            })
                .then(response => {
                    if (response.status >= 200 && response.status < 300){
                        this.setState({ submitted: true });
                        alert("Submitted Succesfully!")}
                });


    }

    handleQChange(event) {
        this.state.formData.QuizName = event.target.value;
    }
    handleGChange(event) {
        this.state.formData.Genre = event.target.value;
    }
    handleIChange(event)
    {
        this.state.formData.ID = event.target.value;
    }


    render() {

        return (
            <div className="App">
                {localStorage.getItem('email') == "admin@quiz" &&
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">Add Quiz</h1>
                        </header>
                        <br /><br />

                        <div className="formContainer">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label>Quiz ID</label>
                                    <input type="text" className="form-control" value={this.state.ID} onChange={this.handleIChange} />
                                </div>
                                <div className="form-group">
                                    <label>Quiz Name</label>
                                    <input type="text" className="form-control" value={this.state.QuizName} onChange={this.handleQChange} />
                                </div>
                            <div className="form-group">
                                <label>Genre Name</label>
                                <input type="text" className="form-control" value={this.state.GenreName} onChange={this.handleGChange} />
                            </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                }
                {this.state.submitted &&
                    <div>
                        <h2>
                            You have succesfully submited form.
                        </h2>
                        Nice!
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

export default addquiz;
