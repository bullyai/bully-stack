import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Login.less";

export default class Login extends React.Component<{},{email: string, password: string, error: string}> {

    constructor (props: any) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            error: undefined
        }
    }

    handleEmailChange (e: any) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e: any) {
        this.setState({password: e.target.value});
    }

    sendLoginInfo() {
        // Getting username and password
        fetch("https://localhost:3000/api/login", {
            method: 'POST',
            body: `username=${this.state.email}&password=${this.state.password}`
        })
        .then(res => res.json())
        .then(
            (result) => {
                localStorage.setItem('token', result.token);
            },
            (error) => {
                console.log(`Error in fetching token: \n\t ${error}`);
                this.setState({ error });
            }
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h1>Login</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <form>
                            <div className="form-group">
                                <label>Tanda Email address</label>
                                <input type="email" className="form-control" id="inputEmails" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Tanda Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                            </div>
                            { this.state.error ? <div className="alert alert-danger"><span>Error: ${this.state.error}</span></div> : null }
                            <button onClick={this.sendLoginInfo} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

