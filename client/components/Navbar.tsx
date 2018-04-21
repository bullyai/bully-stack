import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Navbar.less";

export default class Navbar extends React.Component<{},{}> {

    constructor (props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="nav">
                    <div className="left">
                        <span className="navTitle">bullyAI</span>
                    </div>
                    <div className="right">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/adduser">Add User</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            {/* { navObject.array.forEach(element => {
                                return<li><Link to={element.path}>{element.name.toString()}</Link></li>
                            }) } */}
                        </ul>
                    </div>
                </div>
                { this.props.children }
            </div>
        )
    }
}