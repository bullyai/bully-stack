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



export default class Navbar extends React.Component<{nav: Object},{error: any, isLoaded: boolean, users: UserInfo[], selectedUser?: UserInfo, ensecurities: any[], insecurities: string[] }> {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
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
            insecurities: []
        };
    }

    get insecurities() {
        let insecurities = this.state.ensecurities.filter(x => x.checked).map(x => x.i);
        console.log(insecurities);
        return insecurities;
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

    readonly handleInsecurityChange = (e: React.ChangeEvent<HTMLInputElement>, insecurity: string) => {
        this.state.ensecurities.map(x => {
            if (x.i == e.target.name) x.checked = !x.checked;
        });
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
                token: localStorage.getItem('token')
            })
        }).then(res => res.json())
            .then(result => {
                if (!result.success) throw result.error;

                // todo: go to another page?
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
                                            {/* <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option> */}
                                        </select>
                                    </div>
                                    <hr />
                                    {this.state.ensecurities.map(x => x.i).map(x => <span>
                                        <input name={x} id={`in-${x}`} type="checkbox" onChange={(e) => this.handleInsecurityChange(e, x)} className="tgl tgl-flip"/>
                                        <label data-tg-off={x} data-tg-on={x} htmlFor={`in-${x}`}className="tgl-btn"></label>
                                    </span>)}
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