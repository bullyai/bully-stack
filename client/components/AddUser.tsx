import * as React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./AddUser.less";

export default class Navbar extends React.Component<{nav: Object},{}> {

    constructor(props) {
        super(props);
    }

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
                                        <select name="name" className="form-control" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                    <hr />
                                    <div className="form-group">
                                        <label >Insecurity One</label>
                                        <input type="password" className="form-control" id="inputInsecurityOne" placeholder="Afraid of being called fat"></input>
                                    </div>
                                    <div className="form-group">
                                        <label >Insecurity Two</label>
                                        <input type="password" className="form-control" id="inputInsecurityTwo" placeholder="Dislikes their nose"></input>
                                    </div>
                                    <div className="form-group">
                                        <label >Insecurity Three</label>
                                        <input type="password" className="form-control" id="inputInsecurityThree" placeholder="Hates couches"></input>
                                    </div>
                                    
                                
                            </div>
                            <div className="col-12 col-md-6">
                                <img className="img-fluid rounded mx-auto d-block" src="http://via.placeholder.com/350x350" />
                                <hr />
                                <button type="" className="btn btn-primary btn-block">Change Image</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <hr />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}