import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import { render } from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            editVenue: ""
        };


        this.updateList = this.updateList.bind(this)
        this.updateEditId = this.updateEditId.bind(this)

    }
    updateEditId(x) {
        this.setState(x, function () {
            console.log(this.state.editVenueId)
        })
    }


    componentDidMount() {
        // debugger;
        axios.get("/api/venueList")
            .then(res => {
                console.log(res);
                const posts = res.data.venueList;
                this.setState({posts: posts});
            });
    }


    updateList() {
        axios.get("/api/venueList")
            .then(res => {
                console.log(res);
                const posts = res.data.venueList;
                this.setState({posts: posts});
            });
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        {this.state.posts.map((venue, i) => <TableRow key={i} data={venue} updateEditId={this.updateEditId}/>)}
                    </li>
                </ul>
                <CreateVenue xyz={this.updateList}></CreateVenue>
                <EditVenue venue={this.state.editVenue}></EditVenue>

             </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Header</h1>
            </div>
        );
    }
}

class TableRow extends React.Component {
    constructor(props){
        super(props);
        this.editFormSetState = this.editFormSetState.bind(this);
    }

    editFormSetState(e){ this.props.updateEditId(this.props.data);
        console.log(e.target.value);
    }

    render() {
        return (
            /*<table>
                <tr>
                    <th>name</th>
                    <th>email</th>

                </tr>
                <tr>
                    <td>{this.props.data.name}</td>
                    <td>{this.props.data.email}</td>
                    <div>

                    </div>

                 </tr>

             </table>*/

        <li>
            <div>{this.props.data.name}<br/>
                {this.props.data._id}</div>
            <Button value={this.props.data._id} onClick={this.editFormSetState}>Edit</Button>
        </li>


        );
    }
 }

class CreateVenue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: ""
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.createVenue = this.createVenue.bind(this);

    }


    updateStateEmail(e) {
        this.setState({email: e.target.value})
        console.log(this.state.email)
    }


    createVenue(e) {
        axios.post("/api/createVenue", {email: this.state.email})
            .then(res => {
                console.log(res.data);

                this.props.xyz()

            });
    }

    render() {
        return (

            <div>
                <input type="text" onChange={this.updateStateEmail}/>
                <Button  value={this.state.update} onClick={this.createVenue}/>
            </div>
        );
    }
}
class EditVenue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            address:"",
            email:""
        };
        this.updateStateName = this.updateStateName.bind(this);
        this.updateStateAddress = this.updateStateAddress.bind(this);
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.updateVenue = this.updateVenue.bind(this)
    }
    updateVenue(){
        // axios.post()
    }
    updateStateName(e){
        console.log(this.props)
        this.setState({name:e.target.value},function(){
            console.log(this.props);
        })
    }
    updateStateAddress(e){
        this.setState({address:e.target.value})
    }
    updateStateEmail(e){
        this.setState({email:e.target.value})
    }
    render() {
        return(
            <div>
                <form>
                    Name:
                    <input type="text" defaultValue={this.props.venue.name} onChange={this.updateStateName}/><br/>
                    <input type="text" onClick={this.updateVenue}/>
                </form>
                <Button onClick={this.updateVenue}>Update</Button>
            </div>
        )
    }
}







export default App;