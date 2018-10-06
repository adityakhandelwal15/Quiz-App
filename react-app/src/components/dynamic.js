import React, { Component } from 'react';
import './dynamic.css';
import UserProfile from './userProfile';
import rome from "../rome.jpg"

var array = [];
for (let index = 0; index < 20; index++) {
    array.push(false);
}

class dynamic extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            user: UserProfile.getName(),
            scr: 0,
            lifelines:localStorage.getItem("lifelines"),
            display : true
        }
        this.handleLChange = this.handleLChange.bind(this);
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

handleLChange(event,a,n){
    event.preventDefault();
    console.log("i m here!")
    if (localStorage.getItem("lifelines") <= 0) {
        alert("You are out of lifelines!")
    }
    else{
        var n = localStorage.getItem("lifelines");
        localStorage.setItem("lifelines", n - 1);
        this.setState({ lifelines: this.state.lifelines - 1 });;
        if(a != 1){
            alert("Here's your lifeline:\nAnswer is not Option A")
        }else{
            alert("Here's your lifeline:\nAnswer is not Option B")
        }

    }
    
}

    handleO1Change(ans, nbr) {
        if (array[nbr] == false) {
            array[nbr] = true
            if (ans == 1) {
                alert("Correct!")
                this.setState({ scr: this.state.scr + 1 });
            }
            else {
                alert("wrong Answer")
                this.setState({ scr: this.state.scr - 1 });

            }
        }
        console.log("score is " + this.state.scr)
    }
    handleO2Change(ans, nbr) {
        if (array[nbr] == false) {
            array[nbr] = true

            if (ans == 2) {
                alert("Correct!!")
                this.setState({ scr: this.state.scr + 1 });;
            }
            else {
                alert("wrong Answer")

                this.setState({ scr: this.state.scr - 1 });
            }
        }
        console.log("score is " + this.state.scr)


    }
    handleO3Change(ans, nbr) {
        if (array[nbr] == false) {
            array[nbr] = true

            if (ans == 3) {
                alert("You got it Correct!")
                this.setState({ scr: this.state.scr + 1 });;

            }
            else {
                alert("wrong Answer")

                this.setState({ scr: this.state.scr - 1 });
            }
        }
        console.log("score is " + this.state.scr)

    }
    handleO4Change(ans, nbr) {
        if (array[nbr] == false) {
            array[nbr] = true

            if (ans == 4) {
                alert("Whoaaa!!! Correct Ans")
                this.setState({ scr: this.state.scr + 1 });;

            }
            else {
                alert("wrong Answer")
                this.setState({ scr: this.state.scr - 1 });
            }
        }
        console.log("score is " + this.state.scr)

    }
    handleSubmit(event) {
        event.preventDefault();
        const params = new URLSearchParams(this.props.location.search);
        console.log(params.get('quizname'))
        fetch('http://localhost:8080/universalscore', {
            method: 'POST',
            body: JSON.stringify({ quizname: params.get('quizname'), user: localStorage.getItem('email'), score: Number(this.state.scr) }),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300){
                    this.setState({ submitted: true });
                 alert("Submitted Succesfully!")
            }else {
                console.log("error found!")
                alert("You have played this quiz earlier.")
            }
            });
    }


    componentDidMount() {
        console.log("aree dadada   " + this.props.location.search);
        const params = new URLSearchParams(this.props.location.search);
        console.log(params.get('quizname'))
        const request = new Request('http://127.0.0.1:8080/getQues/' + params.get('quizname'));
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
                    <h1 className="App-title">QUIZ </h1>
                    <h2 className="al">Score:{this.state.scr}</h2>
                    <h2 className="al">{localStorage.getItem('email')}</h2>
                    <h2 className="al">Lifelines:{this.state.lifelines}</h2>

                </header>
                <div >{this.state.data.map((item, key) => {
                    return (
                        <div className="cb" key={key}>
                            <h3>{key + 1}.{item.ques}</h3>
                            <div className="d">
                            {item.url !=null &&
                               <img align="right" width="200px" src={item.url}/>
                            }
                                <form>
                                    <input type="checkbox" onClick={(event) => { return this.handleO1Change(item.ans, key + 1) }} />{item.option1}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO2Change(item.ans, key + 1) }} />{item.option2}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO3Change(item.ans, key + 1) }} />{item.option3}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO4Change(item.ans, key + 1) }} />{item.option4}<br /><br />
                                    <button onClick={(event) => { return this.handleLChange(event,item.ans, key + 1) }}>Use lifeline</button>
                
                                </form>
                                {array[key + 1] &&
                                    <div>
                                        <h3>Attempted!</h3>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}

                </div>
                <button onClick={this.handleSubmit}>Submit</button>
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

export default dynamic;
