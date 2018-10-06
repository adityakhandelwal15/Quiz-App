import React, { Component } from 'react';
import './SingleQue.css';

class SingleQue extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            ans_correct: false
        }
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleO1Change(event) {
        this.state.a[0] = event.target.checked
    }
    handleO2Change(event) {
        this.state.a[1] = event.target.checked

    }
    handleO3Change(event) {
        this.state.a[2] = event.target.checked

    }
    handleO4Change(event) {
        this.state.a[3] = event.target.checked

    }
    handleSubmit(ans) {
        if (this.state.a[ans] == true) {
            this.state.ans_correct = true;
            console.log(this.state.ans_correct)
        }
    }


    componentDidMount() {

        const request = new Request('http://127.0.0.1:8080/single');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
        console.log(this.state.data)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">GK QUIZ</h1>
                </header>
                <div >{this.state.data.map((item, key) => {
                    return (
                        <div className="c" key={key}>
                            <h3>{key + 1}.{item.ques}</h3>
                            <div className="d">
                                <form>
                                    <input type="checkbox" onClick={this.handleO1Change} />{item.option1}<br /><br />
                                    <input type="checkbox" onClick={this.handleO2Change} />{item.option2}<br /><br />
                                    <input type="checkbox" onClick={this.handleO3Change} />{item.option3}<br /><br />
                                    <input type="checkbox" onClick={this.handleO4Change} />{item.option4}<br /><br />
                                    <button type="submit" onClick={(event) => { event.preventDefault(); return this.handleSubmit(item.ans) }}>Submit</button>
                                </form>
                            </div>
                        </div>
                    )
                })}
                </div>

            </div>
        );
    }
}

export default SingleQue;
