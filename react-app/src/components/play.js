import React, { Component } from 'react';
import './play.css';
import UserProfile from './userProfile';
import rome from "../rome.jpg"
import music from './music';

var array = [];
for (let index = 0; index < 20; index++) {
    array.push(false);
}
var m =[];
for (let index = 0; index < 20; index++) {
    m.push(false);
}
var flag = false;
class play extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            user: UserProfile.getName(),
            scr: 0,
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            isChecked4: false,
            flag : false,
            lifelines: localStorage.getItem("lifelines"),
            
        }
        this.handleLChange = this.handleLChange.bind(this);
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleM1Change = this.handleM1Change.bind(this);
        this.handleM2Change = this.handleM2Change.bind(this);
        this.handleM3Change = this.handleM3Change.bind(this);
        this.handleM4Change = this.handleM4Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleC = this.handleC.bind(this);

    }
    handleLChange(event, a, n) {
        event.preventDefault();
        console.log("i m here!")
        if (localStorage.getItem("lifelines") <= 0) {
            alert("You are out of lifelines!")
        }
        else {
            var n = localStorage.getItem("lifelines");
            localStorage.setItem("lifelines", n - 1);
            this.setState({ lifelines: this.state.lifelines - 1 });;
            if (a != 1) {
                alert("Here's your lifeline:\nAnswer is not Option A")
            } else {
                alert("Here's your lifeline:\nAnswer is not Option B")
            }

        }

    }

    handleC(event)
    {
        event.preventDefault();

        if(flag == false){
        if (this.state.isChecked1 == true && this.state.isChecked2 == false && this.state.isChecked3 == true  && this.state.isChecked4 == false ) {
            this.setState({ scr: this.state.scr + 1 });
            alert("Correct");

        }else{
            this.setState({ scr: this.state.scr - 1 });
            alert("Wrong!");
        }
        flag = true;
    }
    }
    handleM1Change(event){
        this.setState({
            isChecked1: !this.state.isChecked1,
        });
        console.log(this.state.isChecked1);
    }
    handleM2Change(event) {
        this.setState({
            isChecked2: !this.state.isChecked2,
        });
    }
    handleM3Change(event) {
        this.setState({
            isChecked3: !this.state.isChecked3,
        });
    }
    handleM4Change(event) {
        this.setState({
            isChecked4: !this.state.isChecked4,
        });
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
                this.setState({ scr: this.state.scr + 1 });
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
                this.setState({ scr: this.state.scr + 1 });

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
                this.setState({ scr: this.state.scr + 1 });

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
        fetch('http://localhost:8080/score2', {
            method: 'POST',
            body: JSON.stringify({ quizname: "gk", user: localStorage.getItem('email'), score: Number(this.state.scr) }),
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
        const request = new Request('http://127.0.0.1:8080/getQuestions');
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
                    <h1 className="App-title">GK QUIZ </h1>
                    <h2 className="al">Score:{this.state.scr}</h2>
                    <h2 className="al">{localStorage.getItem('email')}</h2>
                        <h2 className="al">Lifelines:{this.state.lifelines}</h2>
                    
                </header>
                <div className="cb">
                    <h3>
                        1.  Which of the following are nobel prize winners?(multiple correct ans)
                            </h3>
                    <form>
                        <input type="checkbox" onClick={(event) => { return this.handleM1Change() }} />Amartya Sen<br /><br />
                        <input type="checkbox" onClick={(event) => { return this.handleM2Change() }} />Issac Newton<br /><br />
                        <input type="checkbox" onClick={(event) => { return this.handleM3Change() }} />Kailash Satyarthi<br /><br />
                        <input type="checkbox" onClick={(event) => { return this.handleM4Change() }} />Bill Gates
                        <button onClick={this.handleC}>Check</button>
                        {flag &&
                            <div>
                                <h4>Attempted!</h4>
                            </div>
                        }
                    </form>
                </div>
                <div >{this.state.data.map((item, key) => {
                    return (
                        <div className="cb" key={key}>
                            <h3>{key + 2}.{item.ques}</h3>
                            <div className="d">
                                <form>
                                    <input type="checkbox" onClick={(event) => { return this.handleO1Change(item.ans, key + 1) }} />{item.option1}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO2Change(item.ans, key + 1) }} />{item.option2}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO3Change(item.ans, key + 1) }} />{item.option3}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO4Change(item.ans, key + 1) }} />{item.option4}<br /><br />
                                    <button onClick={(event) => { return this.handleLChange(event, item.ans, key + 1) }}>Use lifeline</button>

                                </form>
                                {array[key+1] &&
                                    <div>
                                    <h3>Attempted!</h3>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
               
                <h3>Name of the famous building given below is:</h3>
                    <img src={rome} />
                    <br></br>
                    <input type="checkbox" onClick={(event) => { return this.handleO1Change(1, 11) }} />Colosseum<br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO2Change(1, 11) }} />Eiffel Tower<br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO3Change(1, 11) }} />Empire State Building<br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO4Change(1, 11) }} />Machi Pichu <br /><br />
                    {array[11] &&
                        <div>
                            <h3>Attempted!</h3>
                        </div>
                    }
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

export default play;
