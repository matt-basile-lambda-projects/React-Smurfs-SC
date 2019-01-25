import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink} from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf:{
        name: '',
        age: '',
        height: ''
      }
    };
  }
  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then(res => this.setState({smurfs: res.data}))
    .catch(err => console.log(err))
  }

  addSmurf = event => {
    event.preventDefault();
    axios
    .post("http://localhost:3333/smurfs", this.state.smurf)
    .then(res => {
      this.setState({
        smurfs: res.data,
        smurf:{
          name: '',
          age: '',
          height: ''
        }
      })
      
      this.props.history.push("/");
    })
    .catch(err => console.log(err))
    // add code to create the smurf using the api
  }


  handleInputChange = e => {
    e.persist();
    if(e.target.name === 'height'){
      this.setState(prevState => {
        return {
          smurf: {
            ...prevState.smurf,
            height: `${e.target.value}cm`
          }
        }
      })
    }
    this.setState(prevState => {
      return {
        smurf: {
          ...prevState.smurf,
          [e.target.name]: e.target.value
        }
      };
    });
  };
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <NavLink exact to="/">Smurfs</NavLink>
        <NavLink to="/smurf-form">Add a Smurf</NavLink>
        <Route 
        exact path = "/"
        render={ props =>(
          <Smurfs {...props} smurfs={this.state.smurfs} />
        )}
        /> 
        <Route 
        path="/smurf-form"
        render={ props =>(
        <SmurfForm 
         {...props}
         smurf={this.state.smurf}
         addSmurf={this.addSmurf}
         handleInputChange={this.handleInputChange}
        />)}/>
        
      </div>
    );
  }
}

export default App;
