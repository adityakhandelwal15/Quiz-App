import React, { Component } from 'react';
import './play.css';
import UserProfile from './userProfile';
import fast from '../fast.jpg';


var array=[];
for (let index = 0; index < 20; index++) {
    array.push(false);
}
var flag = false;


class playMovies extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            user: UserProfile.getName(),
            scr : 0,
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            isChecked4: false,
            play: false,
            lifelines: localStorage.getItem("lifelines"),
        }
        this.url = "http://animeuniverse.yolasite.com/resources/Death%20Note%20-%20L%27s%20Theme%20B.mp3";
        this.audio = new Audio(this.url);
        this.togglePlay = this.togglePlay.bind(this);

        this.handleLChange = this.handleLChange.bind(this);

        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleO1Change = this.handleO1Change.bind(this);
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
    handleC(event) {
        event.preventDefault();

        if (flag == false) {
            if (this.state.isChecked1 == true && this.state.isChecked2 == true && this.state.isChecked3 == false && this.state.isChecked4 == true) {
                this.setState({ scr: this.state.scr + 1 });
                alert("Correct");

            } else {
                this.setState({ scr: this.state.scr - 1 });
                alert("Wrong!");
            }
            flag = true;
        }
    }
    handleM1Change(event) {
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
    
    togglePlay() {
        this.setState({ play: !this.state.play });
        //console.log(this.audio);
        this.state.play ? this.audio.play() : this.audio.pause();
    }

    handleO1Change(ans,nbr) {
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
        console.log("score is "+this.state.scr)
    }
    handleO2Change(ans,nbr) {
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
        console.log("score is "+this.state.scr)


    }
    handleO3Change(ans,nbr) {
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
        console.log("score is "+this.state.scr)

    }
    handleO4Change(ans,nbr) {
        if (array[nbr]==false) {
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
        console.log("score is "+this.state.scr)

    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/score', {
            method: 'POST',
            body: JSON.stringify({ quizname: "movies", user: localStorage.getItem('email'), score: Number(this.state.scr)}),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300){
                    this.setState({ submitted: true });
                    alert("Submitted Succesfully!")
            }else{
                console.log("error found!")
                alert("You have played this quiz earlier.")
            }}
            );
    }


    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getQuestions2');
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
                    <h1 className="App-title">MOVIES QUIZ </h1>
                    
                    <h2 className="al">Score:{this.state.scr}</h2>
                        <h2 className="al">Lifelines:{this.state.lifelines}</h2>
                
                </header>

                <div className="cb">
                    <h2>1.Guess the movie/anime from the music:</h2>
                    <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button><br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO1Change(2, 0) }} />One Punch Man<br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO2Change(2, 0) }} />Death note<br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO3Change(2, 0) }} />Naruto<br /><br />
                    <input type="checkbox" onClick={(event) => { return this.handleO4Change(2, 0) }} />Stien's Gate
                    {array[0] &&
                        <div>
                            <h4>Attempted!</h4>
                        </div>
                    }
                </div>
                <div className="cb">
                    <h3>
                        2. Which of the following movies are stared by Dwayne "The ROCK" Johnson?(multiple correct ans)
                            </h3>
                    <form>
                        <input type="checkbox" onClick={(event) => { return this.handleM1Change() }} />Baywatch<br /><br />
                        <input type="checkbox" onClick={(event) => { return this.handleM2Change() }} />Central Intelligance<br /><br />
                        <input type="checkbox" onClick={(event) => { return this.handleM3Change() }} />XXX-Return of Xander Cage<br /><br />
                        <input type="checkbox" onClick={(event) => { return this.handleM4Change() }} />The Rundown<br /><br />
                        <button onClick={this.handleC}>Check</button>
                    </form>
                    {flag &&
                        <div>
                            <h4>Attempted!</h4>
                        </div>
                    }
                </div>
                <div >{this.state.data.map((item, key) => {
                    return (
                        <div className="cb" key={key}>
                            <h3>{key + 3}.{item.ques}</h3>
                            <div className="d">
                                <form>
                                    <input type="checkbox" onClick={(event) => { return this.handleO1Change(item.ans,key + 3) }} />{item.option1}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO2Change(item.ans,key + 3) }} />{item.option2}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO3Change(item.ans,key + 3) }} />{item.option3}<br /><br />
                                    <input type="checkbox" onClick={(event) => { return this.handleO4Change(item.ans, key + 3) }} />{item.option4}<br /><br />
                                    <button onClick={(event) => { return this.handleLChange(event, item.ans, key + 1) }}>Use lifeline</button>
                                    
                                </form>
                                {array[key + 3] &&
                                    <div>
                                        <h3>Attempted!</h3>
                                    </div>
                                }
                            </div>

                        </div>
                    )
                })}
                </div>
                <div>
                <h3>Guess the name of Movie:</h3>
                <img src={fast} />
                <br></br>
                <input type="checkbox" onClick={(event) => { return this.handleO1Change(1, 11) }} />Fast-Five<br /><br />
                <input type="checkbox" onClick={(event) => { return this.handleO2Change(1, 11) }} />XXX<br /><br />
                <input type="checkbox" onClick={(event) => { return this.handleO3Change(1, 11) }} />The Fast and The Furious<br /><br />
                <input type="checkbox" onClick={(event) => { return this.handleO4Change(1, 11) }} />Mission Impossible-2<br /><br />
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

export default playMovies;
