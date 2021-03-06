import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./AddUser.less";
import { Redirect } from 'react-router';

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

export default class Navbar extends React.Component<{userId?: Object},{error: any, isLoaded: boolean, isSubmitted: boolean, users: UserInfo[], selectedUser?: UserInfo, ensecurities: any[], gender: string, insecurities: string[] }> {

    constructor(props) {
        super(props);

        this.state = {
            error: undefined,
            isLoaded: false,
            isSubmitted: false,
            users: [],
            selectedUser: undefined,
            ensecurities: [
                { i: "bald", checked: false },
                { i: "family", checked: false },
                { i: "overweight", checked: false},
                { i: "work", checked: false },
                { i: "appearance", checked: false },
                { i: "hair", checked: false },
                { i: "misc", checked: false },
                { i: "fitness", checked: false },
                { i: "intelligence", checked: false },
                { i: "spouse", checked: false },
                { i: "personality", checked: false }
            ],
            insecurities: [],
            gender: 'male',
        };
    }

    get insecurities() {
        let insecurities = this.state.ensecurities.filter(x => x.checked).map(x => x.i);
        console.log(insecurities);
        return insecurities;
    }

    componentDidMount() {
        console.log('AddUse rmounted');

        fetch(`http://localhost:3000/api/users?token=${localStorage.getItem('token')}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((result) => {
                if (!result.success) throw result.error;

                this.setState({
                    isSubmitted: false,
                    isLoaded: true,
                    users: result.users
                });
            })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        });

        if (this.props.userId) {
            console.log('userId = ' + this.props.userId);
            fetch(`http://localhost:3000/api/active/${this.props.userId}?token=${localStorage.getItem('token')}`, {
                method: 'GET'
            }).then(res => res.json())
                .then(result => {
                    console.log('Got the state!');
                    if (!result.success) throw result.error;

                    const newState = {
                        selectedUser: result.data.info,
                        ensecurities: this.state.ensecurities.map(i => {
                            return { i: i.i, checked: result.data.tags.indexOf(i.i) !== -1 };
                        }),
                        gender: result.data.gender
                    };
                    console.log('Setting state:', newState);
                    console.log('Old data was:', result.data);
                    this.setState(newState);
                })
                .catch(error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                });
        }
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

    readonly handleInsecurityChange = (e: React.ChangeEvent<HTMLInputElement>, insecurity: string) => {
        this.state.ensecurities.map(x => {
            if (x.i == e.target.name) x.checked = !x.checked;
        });
    }

    readonly genderSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ gender: e.target.value });
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
                insecurities: this.insecurities.join(" "),
                token: localStorage.getItem('token'),
                gender: this.state.gender
            })
        }).then(res => res.json())
            .then(result => {
                if (!result.success) throw result.error;

                this.setState({
                    error: undefined,
                    isSubmitted: true,
                    selectedUser: undefined,
                    gender: 'male',
                    insecurities: []
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
                            { this.state.isSubmitted ? <Redirect to="/" /> : null }
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
                                        <select name="gender" className="form-control" value={this.state.gender} onChange={this.genderSelectChange}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {this.state.ensecurities.map(x => <span>
                                        <input name={x.i} id={`in-${x.i}`} type="checkbox" onChange={(e) => this.handleInsecurityChange(e, x.i)} defaultChecked={x.checked} className="tgl tgl-flip"/>
                                        <label data-tg-off={x.i} data-tg-on={x.i} htmlFor={`in-${x.i}`}className="tgl-btn"></label>
                                    </span>)}                                
                            </div>
                            <div className="col-12 col-md-6">
                                <img className="img-fluid rounded mx-auto d-block" src={this.state.selectedUser && this.state.selectedUser.photo ? this.state.selectedUser.photo : "http://via.placeholder.com/350x350"} />
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