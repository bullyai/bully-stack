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

    readonly showAddUser = (match: any) => {
        return <AddUser userId={match.match.params.id}/>;
    };

    render(){
        return(
            <Router>
                <Navbar>
                    <Route exact path="/" component={Home} />
                    <Route path="/adduser" exact component={AddUser} />
                    <Route path="/adduser/:id" exact component={this.showAddUser} />
                    <Route path="/login" component={Login} />
                </Navbar>
            </Router>
        )
    }
}
