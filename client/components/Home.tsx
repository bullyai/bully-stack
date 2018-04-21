import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Home.less";

interface UserData {
    tags: string[];
    gender: 'male' | 'female' | 'other';
    info: UserInfo;
}

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

class Dashboard extends React.Component<{},{error: any, isLoaded: boolean, users: UserData[]}> {

    constructor (props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            users: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/active?token=${localStorage.getItem('token')}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((result) => {
                if (!result.success) throw result.error;

                console.log(result.users);

                this.setState({
                    isLoaded: true,
                    users: result.users
                });
            })
            .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    render() {
        return (
            localStorage.getItem('token') ?
            <div className="flex dashboard">
                { this.state.isLoaded && this.state.users.length ?
                    this.state.users.map((user: UserData) => {
                        return <ProjectCard userObj = {user.info} />
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
                <div className="projectCard" style={ { backgroundImage: 'url(' + this.props.userObj.photo || '' + ')', backgroundSize: 'cover' } }>
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
