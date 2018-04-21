import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Navbar";
import AddUser from "./AddUser";
import Home from "./Home";
import Login from "./Login";

// Styles
import "./App.less";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Router>
                <Navbar>
                    <Route exact path="/" component={Home} />
                    <Route path="/adduser" component={AddUser} />
                    <Route path="/login" component={AddUser} />
                </Navbar>
            </Router>
        )
    }
}