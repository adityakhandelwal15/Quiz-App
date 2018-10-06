import React, { Component } from 'react';
import './NewPerson.css';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
var valid = false;


const responseGoogle = (response) => {
  console.log(response);
  var em = response.w3.U3;

  fetch('http://localhost:8080/people', {
    method: 'POST',
    body: JSON.stringify({ lastName: response.w3.wea, firstName: response.w3.ofa, email: response.w3.U3, password: response.w3.U3}),
})
    .then(response => {
      if (response.status >= 200 && response.status < 500)
        {
      localStorage.setItem("email", em)
      localStorage.setItem("lifelines", 2)
      window.location.reload()
      console.log("asslkla");}

    });
  }

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password:"",
      },
      submitted: false,
      failed : false
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.formData.email.includes('@') && this.state.formData.password.length>5 )
    {
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        else{
          alert("Sorry!")
          this.setState({failed: true});
        }
      });
  }else{
    alert("Email invalid! or password too small")
  }
  }
  handleFChange(event) {
    this.state.formData.firstName = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastName = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;

  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;

  }

  render() {

    return (
      
      <div className="App">
        
        <header className="App-header">
          <h1 className="App-title">Sign Up</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        <br></br>
        <h3>Login using Google</h3>
        <GoogleLogin
          clientId="54649735704-jt98qt37mg3kltaohrffs2h7d26odfuv.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        {localStorage.getItem('email') &&
          <Redirect to='/'></Redirect>
        }
        {this.state.submitted &&
          <div>
            <h2>
              You have succesfully created your account.
            </h2>
             Welcome To the QUIZ App
          </div>
        }
        {this.state.failed &&
          <div>
            <h2>
              Error ocurred!!
            </h2>
            Please choose another emailID.
          </div>
        }

      </div>
    );
  }
}

export default NewPerson;
