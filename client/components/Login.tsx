import * as React from 'react';

// Styles
import "./Login.less";
import { Redirect } from 'react-router';

export default class Login extends React.Component<{},{email: string, password: string, isDone: boolean, error?: string}> {

    constructor (props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isDone: false,
            error: undefined
        }
    }

    readonly handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email: e.target.value});
    };

    readonly handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: e.target.value});
    };

    readonly sendLoginInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Getting username and password
        console.log('Sending state:', this.state);
        fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then((result) => {
                    if (!result.success) throw result.error;
                    console.log('oy');
                    localStorage.setItem('token', result.token);
                    this.setState({ isDone: true });
                })
            .catch(error => {
                console.log(`Error in fetching token: \n\t ${error}`);
                this.setState({ error });
            })
    };

    render() {
        return (
            <div className="container">
                { this.state.isDone ? <Redirect to="/" /> : null }
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
                            { this.state.error ? <div className="alert alert-danger"><span>Error: {this.state.error}</span></div> : null }
                            <button onClick={this.sendLoginInfo} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

