import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Navbar.less";

export default class Home extends React.Component {

    constructor (props) {
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}