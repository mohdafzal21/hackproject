import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
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
            // console.log(this.state.editVenueId)
            this.setState({editVenue:x})
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

                        {this.state.posts.map((venue, i) => <TableRow key={i} data={venue} updateEditId={this.updateEditId}/>)}

                </ul>
                <CreateVenue xyz={this.updateList}></CreateVenue>
                <EditVenue venue={this.state.editVenue} xyz={this.updateList}></EditVenue>

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
        // console.log(e.target.value);
    }

    render() {
        return (

        <li>
            <div>{this.props.data.email}<br/>
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
            email:"",
            name:""
        };
        this.updateStateName = this.updateStateName.bind(this);
        this.updateStateAddress = this.updateStateAddress.bind(this);
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.updateVenue = this.updateVenue.bind(this)
    }
    updateVenue(){

        console.log(this.props.venue)
        var id=this.props.venue._id
        axios.post('/api/venueEdit/'+id,{email:this.state.email})
            .then(res => {
                this.props.xyz()
            }


        )
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
        console.log(e.target.value)

    }
    render() {
        return(
            <div>
                <form>
                    Name:
                    <input type="text" onChange={this.updateStateEmail}/><br/>
                    {/*<input type="text" onClick={this.updateVenue}/>*/}
                    <Button onClick={this.updateVenue}>Update</Button>
                </form>

            </div>
        )
    }
}







export default App;