import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Login.less";

export default class Login extends React.Component<{},{}> {

    constructor (props: any) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <label>Tanda Email address</label>
                            <input type="email" className="form-control" id="inputEmails" placeholder="Enter email"></input>
                        </div>
                        <div className="form-group">
                            <label>Tanda Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}