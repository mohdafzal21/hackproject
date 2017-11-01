import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        // debugger;
        axios.get("/api/venueList")
            .then(res => {
                console.log(res);
                const posts = res.data.venueList;
                this.setState({ posts:posts});
            });
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        {this.state.posts.map((venue, i) => <TableRow key = {i}
                                                                      data = {venue} />)}
                    </li>
                </ul>
                <CreateVenue></CreateVenue>
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
    render() {
        return (
            <table>
                <tr>
                    <th>name</th>
                    <th>email</th>
                </tr>
                <tr>
                    <td>{this.props.data.name}</td>
                    <td>{this.props.data.email}</td>
                </tr>

            </table>

            //
            // <div>
            //     <div>{this.props.data.name}</div>
            //
            // // </div>
        );
    }
}

// class App extends React.Component{
//
//     constructor(props){
//         super(props);
//         this.state= {
//            name: "asd",
//             email:"a@a.co"
//
//         }
//     }
// }


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


    updateStateEmail(e){
        this.setState({email:e.target.value})
        console.log(this.state.email)
    }


     createVenue(e){
         axios.post("/api/createVenue", {email:this.state.email})
             .then(res => {
                 console.log(res.data);
             });
     }

      render() {
          return (

              <div>
                  <input type="text" onChange={this.updateStateEmail}/>
                  <input type="submit" value={this.state.update} onClick={this.createVenue}/>
              </div>
          );
      }

}


export default App;