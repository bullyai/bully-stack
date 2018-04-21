import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./AddUser.less";

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

export default class Navbar extends React.Component<{nav: Object},{error: any, isLoaded: boolean, isSubmitted: boolean, users: UserInfo[], selectedUser?: UserInfo, gender: string, insecurities: string}> {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            isSubmitted: false,
            users: [],
            selectedUser: undefined,
            gender: 'male',
            insecurities: ''
        };
    }

    componentDidMount() {

        fetch(`http://localhost:3000/api/users?token=${localStorage.getItem('token')}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((result) => {
                if (!result.success) throw result.error;

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

    readonly userSelectChange = (e: any) => {
        for (const user of this.state.users) {
            console.log(user.id, e.target.value);
            if (user.id.toString() === e.target.value) {
                this.setState({
                    selectedUser: user
                });
                break;
            }
        }
    };

    readonly genderSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ gender: e.target.value });
    };

    readonly handleInsecurityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ insecurities: e.target.value });
    };

    readonly sendNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!this.state.selectedUser) return;
        fetch(`http://localhost:3000/api/active/${this.state.selectedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                insecurities: this.state.insecurities,
                gender: this.state.gender,
                token: localStorage.getItem('token')
            })
        }).then(res => res.json())
            .then(result => {
                if (!result.success) throw result.error;

                this.setState({
                    error: undefined,
                    isSubmitted: true,
                    selectedUser: undefined,
                    gender: 'male',
                    insecurities: ''
                });
            })
            .catch(error => {
                this.setState({ error });
            })
    };

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row addUserTop">
                        <div className="col">
                            <h1>Add User</h1>
                            <hr/>
                        </div>
                    </div>
                    <form className="addUserForm">
                        <div className="row">
                            { this.state.isSubmitted ? <div className="alert alert-success"><span>Yeet</span></div> : null }
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label>User's Name</label>
                                        {/* <input type="name" className="form-control" id="inputName" placeholder="Enter User's Name"></input> */}
                                        <select name="name" className="form-control" onChange={this.userSelectChange}>
                                            {
                                                this.state.users.map((user: UserInfo) => {
                                                    return <option value={user.id}>{user.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <hr />

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select name="gender" className="form-control" onChange={this.genderSelectChange}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Insecurities (one word each, space separated kthxbye)</label>
                                        <textarea placeholder="E.g. something funny here ;)" onChange={this.handleInsecurityChange}>{this.state.insecurities}</textarea>
                                    </div>
                                
                            </div>
                            <div className="col-12 col-md-6">
                                <img className="img-fluid rounded mx-auto d-block" src={this.state.selectedUser && this.state.selectedUser.photo ? this.state.selectedUser.photo : "http://via.placeholder.com/350x350"} />
                                <hr />
                                <button type="" className="btn btn-primary btn-block">Change Image</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                { this.state.error ? <div className="alert alert-danger"><span>Error: ${this.state.error}</span></div> : null }
                                <hr />
                                <button type="submit" className="btn btn-primary" onClick={this.sendNew}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}