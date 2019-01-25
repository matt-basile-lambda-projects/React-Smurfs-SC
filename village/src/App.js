import React, { Component } from 'react';
import axios from 'axios';

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
      });
    })
    .catch(err => console.log(err))
    // add code to create the smurf using the api
  }


  handleInputChange = e => {
    e.persist();
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
        <SmurfForm 
         smurf={this.state.smurf}
         addSmurf={this.addSmurf}
         handleInputChange={this.handleInputChange}
         />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
