import React, { Component } from 'react';
import './main.css';
import UserProfile from './userProfile';
import { Redirect } from 'react-router-dom';


class FrontPage extends Component{
    constructor(){
        super();
        this.state={
            formData:{
                email:"",
                password:""
            },
        }
        this.handleEChange = this.handleEChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEChange(event) {
        this.state.formData.email = event.target.value;
    }
    handlePChange(event) {
        this.state.formData.password = event.target.value;
    }
    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:8080/login', {
            credentials:'include',
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if (response.status == 200){
                    localStorage.setItem('email', this.state.formData.email);
                    localStorage.setItem('lifelines', 2);
                    window.location.reload()
                    
                }else{ 
                    console.log("aichya gawat")
                    alert("Failed!")}
            }, err => alert("No Such Email or Password"));
    }
    render(){
    return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
            {localStorage.getItem('email') && 
                <Redirect to='/'></Redirect>
            }
            
        </div>
    );
}
}
export default FrontPage;