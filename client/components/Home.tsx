import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Home.less";

export default class Home extends React.Component {

    constructor (props) {
        super(props);
    }

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

class Dashboard extends React.Component {
    render() {
        return (
            <div className="flex dashboard">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        )
    }
}


class ProjectCard extends React.Component {
    render() {
        return (
            <Link to='/adduser/ahdhgasiudlufwuiyef' >
                <div className="projectCard">
                    <div className="projectTitleContainer">
                        <div className="relativeContainer">
                            <span className="projectTitle">Project Title</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
