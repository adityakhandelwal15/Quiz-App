import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class logout extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
        this.logout = this.logout.bind(this);

    }

logout(){
        localStorage.clear()
        window.location.reload()
}

    componentDidMount() {
        this.logout()
    }
    render()
    {
        return(
            <div>
                <Redirect to ='/'></Redirect>
            </div>
        )
    }

}

export default logout;
