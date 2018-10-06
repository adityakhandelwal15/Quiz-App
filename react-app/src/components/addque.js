import React, { Component } from 'react';
import './CreateQues.css';


class addque extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            formData: {
                
                Genre:"",
                QuizName:"",
                Ques: "",
                Option1: "",
                Option2: "",
                Option3: "",
                Option4: "",
                Url :"",
                Ans: 4,
            },
            
            
            submitted: false,
        }
        this.handleIChange = this.handleIChange.bind(this);
        this.handleGChange = this.handleGChange.bind(this);
        this.handleQNChange = this.handleQNChange.bind(this);
        this.handleQChange = this.handleQChange.bind(this);
        this.handleUChange = this.handleUChange.bind(this);
        this.handleOChange = this.handleOChange.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleAChange = this.handleAChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        console.log(this.state);
            fetch('http://localhost:8080/addque', {
                method: 'POST',
                body: JSON.stringify(this.state.formData,),
            })
                .then(response => {
                    if (response.status >= 200 && response.status < 300){
                        this.setState({ submitted: true });
                        alert("Submitted Succesfully!")}
                });


    }

    handleQChange(event) {
        this.state.formData.Ques = event.target.value;
    }
    handleUChange(event) {
        this.state.formData.Url = event.target.value;
    }
    handleGChange(event) {
        this.state.formData.Genre = event.target.value;

    }
     handleQNChange(event) {
        this.state.formData.QuizName = event.target.value;

    }
    
    // handleBChange(q,g) {
    //     console.log("DSDSdss")
    //     if(flag == false)
    //     {
    //     this.state.Genre = g;
    //     this.state.QuizName = q;
    //     flag = true
    //     }
    // }
    handleIChange(event) {
        this.state.formData.ID = Number(event.target.value);
    }
    handleOChange(event) {
        this.state.formData.Option1 = event.target.value;
    }
    handleO2Change(event) {
        this.state.formData.Option2 = event.target.value;
    }
    handleO3Change(event) {
        this.state.formData.Option3 = event.target.value;
    }
    handleO4Change(event) {
        this.state.formData.Option4 = event.target.value;
    }
    handleAChange(event) {
        this.state.formData.Ans = Number(event.target.value);
    }
    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getquiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
        console.log(this.state.data)

    }

    render() {
        return (
            
            <div className="App">
                {localStorage.getItem('email') == "admin@quiz" &&
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">Make ques</h1>
                        </header>
                        <br /><br />

                        <div className="formContainer">
                            <form onSubmit={this.handleSubmit}>
                                <h3>Select One of the following</h3>
                                <div className="form-group">
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
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                </div>

                                {/* <div className="form-group">
                                    <label>Question Number</label>
                                    <input type="text" className="form-control" value={this.state.ID} onChange={this.handleIChange} />
                                </div> */}
                            <div className="form-group">
                                <label>Genre</label>
                                <input type="text" className="form-control" value={this.state.Genre} onChange={this.handleGChange} />
                            </div>
                            <div className="form-group">
                                <label>Quiz Name</label>
                                <input type="text" className="form-control" value={this.state.QuizName} onChange={this.handleQNChange} />
                            </div>
                                <div className="form-group">
                                    <label>Question</label>
                                    <input type="text" className="form-control" value={this.state.Ques} onChange={this.handleQChange} />
                                </div>
                            <div className="form-group">
                                <label>Url for Image</label>
                                <input type="text" className="form-control" value={this.state.Url} onChange={this.handleUChange} />
                            </div>
                                <div className="form-group">
                                    <label>Option1</label>
                                    <input type="text" className="form-control" value={this.state.Option1} onChange={this.handleOChange} />
                                </div>
                                <div className="form-group">
                                    <label>Option2</label>
                                    <input type="text" className="form-control" value={this.state.Option2} onChange={this.handleO2Change} />
                                </div>
                                <div className="form-group">
                                    <label>Option3</label>
                                    <input type="text" className="form-control" value={this.state.Option3} onChange={this.handleO3Change} />
                                </div>
                                <div className="form-group">
                                    <label>Option4</label>
                                    <input type="text" className="form-control" value={this.state.Option4} onChange={this.handleO4Change} />
                                </div>
                                <div className="form-group">
                                    <label>Ans</label>
                                    <input type="password" className="form-control" value={this.state.Ans} onChange={this.handleAChange} />
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

export default addque;
