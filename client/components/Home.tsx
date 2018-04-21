import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Home.less";

interface UserInfo {
    id: number;
    name: string;
    dob?: string;
    employmentStart: string;
    email: string;
    photo: string;
    phone: string;
    hourlyRate?: number;
    licenseNumber?: string;
}

export default class Home extends React.Component {

    

    render(){
        return (
            <div>
                <Title />
                <Dashboard />
            </div>
        )
    }
}

class Title extends React.Component {
    render() {
        return (
            <div className="titleContainer">
                <h1>Dashboard</h1>
            </div>
        )
    }
}

class Dashboard extends React.Component<{},{error: any, isLoaded: boolean, users: UserInfo[]}> {

    constructor (props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            users: undefined
        };
    }

    componentDidMount() {
        fetch("https://localhost:3000/api/user", {
            method: 'POST',
            body: `token=${localStorage.getItem('token')}`
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    users: result.user 
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        return (
            localStorage.getItem('token') ?
            <div className="flex dashboard">
                { this.state.isLoaded ? 
                    this.state.users.map((user: UserInfo) => {
                        return <ProjectCard userObj = {user} />
                    })
                : <Link to='/adduser' >
                    <div className="projectCard">
                        <div className="projectTitleContainer">
                            <div className="relativeContainer">
                                <span className="projectTitle">Add a User</span>
                            </div>
                        </div>
                    </div>
                </Link>}
            </div> :
            <div className="flex">
                <span>Please login</span>
            </div>
        )
    }
}


class ProjectCard extends React.Component<{userObj: UserInfo},{}> {

    constructor(props) { super(props); }

    render() {
        return (
            <Link to={'/adduser/' + this.props.userObj.id} >
                <div className="projectCard">
                    <div className="projectTitleContainer">
                        <div className="relativeContainer">
                            <span className="projectTitle">Project: {this.props.userObj.name}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
