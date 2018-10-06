import React, { Component } from 'react';
import './play.css';
import UserProfile from './userProfile';
import rome from "../rome.jpg"

var array = [];
for (let index = 0; index < 20; index++) {
    array.push(false);
}

class dynamicedit extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            user: UserProfile.getName(),
        }
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleQChange = this.handleQChange.bind(this);

    }


    handleQChange(event, k) {

        this.state.data[k].ques = event.target.value
    }

    handleO1Change(event, k) {
        
        this.state.data[k].option1 = event.target.value
    }
    handleO2Change(event, k) {
        
        this.state.data[k].option2 = event.target.value


    }
    handleO3Change(event, k) {
    
        this.state.data[k].option3 = event.target.value

    }
    handleO4Change(event, k) {
        this.state.data[k].option4 = event.target.value
    }
    // handleSubmit(event,k) {
    //     console.log("ssa"+ " " k)
    //     event.preventDefault();
    //     const params = new URLSearchParams(this.props.location.search);
    //     console.log(params.get('quizname'))
    //     // fetch('http://localhost:8080/universalscore', {
    //     //     method: 'POST',
    //     //     body: JSON.stringify({ quizname: params.get('quizname'), user: localStorage.getItem('email'), score: Number(this.state.scr) }),
    //     // })
    //     //     .then(response => {
    //     //         if (response.status >= 200 && response.status < 300)
    //     //             this.setState({ submitted: true });
    //     //     });
    // }


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

        function edit(id,k, event) {
            event.preventDefault();
            console.log( this.state.data[k] );
            fetch('http://localhost:8080/updateque/' + id, {
                method: 'PUT',
                body: JSON.stringify(this.state.data[k]),
            })
                .then(response => {
                    if (response.status >= 200 && response.status < 300)
                        window.location.reload()

                });
        }
        return (
            
            <div className="App">
                {localStorage.getItem('email') &&
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">EDIT QUIZ </h1>
                            <h2 className="al">{localStorage.getItem('email')}</h2>

                        </header>
                        <div >{this.state.data.map((item, key) => {
                            return (
                                <div className="c" key={key}>
                                    <h4>{key + 1}.<input size="100" type="text" onChange={(event) => { return this.handleQChange(event, key ) }} placeholder={item.ques} /></h4>
                                    <div className="d">
                                        <form>
                                            <input type="text" onChange={(event) => { return this.handleO1Change(event, key ) }} placeholder={item.option1} /><br /><br />
                                            <input type="text" onChange={(event) => { return this.handleO2Change(event, key ) }} placeholder={item.option2} /><br /><br />
                                            <input type="text" onChange={(event) => { return this.handleO3Change(event, key ) }} placeholder={item.option3}/><br /><br />
                                            <input type="text" onChange={(event) => { return this.handleO4Change(event, key ) }} placeholder={item.option4}/><br /><br />
                                            <button onClick={edit.bind(this, item.id,key)}>Edit</button>
                                        </form>
                                    </div>
                                </div>
                            )
                        })}

                        </div>
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

export default dynamicedit;
