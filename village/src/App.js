import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink} from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf'

const cleanSmurf = {
  name: '',
  age: '',
  height: '',
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf:{
        name: '',
        age: '',
        height: ''
      },
      isUpdating: false,
      id: null
    };
  }
  // Read
  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then(res => this.setState({smurfs: res.data}))
    .catch(err => console.log(err))
  }
  // Create
  addSmurf = () => {
    axios
    .post("http://localhost:3333/smurfs", this.state.smurf)
    .then(res => {
      this.setState({
        smurfs: res.data,
        smurf: cleanSmurf,
      })
      this.props.history.push("/");
    })
    .catch(err => console.log(err.message))
    // add code to create the smurf using the api
  }
  // Delete
  deleteSmurf = id =>{
    axios
    .delete(`http://localhost:3333/smurfs/${id}`)
    .then(res => this.setState({
      smurfs: res.data
    }))
    .catch(err => console.log(err))
  }

  populateSmurfForm = (e, id) =>{
    e.preventDefault();
    this.setState({smurf: this.state.smurfs.find(smurf => smurf.id === id)});
    this.setState({isUpdating:true});
    this.props.history.push("/smurf-form")
  }
  changeID = (e, ID) =>{
    e.preventDefault();
    this.setState({id: ID });
  }

  updateSmurf = () =>{
    console.log(this.state.smurf)
    axios.put(`http://localhost:3333/smurfs/${this.state.smurf.id}`, this.state.smurf)
    .then(res => {
      this.setState({
        smurfs: res.data,
        isUpdating: false,
        smurf: cleanSmurf
      })
      this.props.history.push("/")
    })
    .catch(err => console.log(err))
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
          <Smurfs 
          {...props}
          changeID={this.changeID}
          populateSmurfForm={this.populateSmurfForm}
          smurf={this.state.smurf}
          deleteSmurf={this.deleteSmurf}
          smurfs={this.state.smurfs} />
        )}
        /> 
        <Route 
        path="/smurf-form"
        render={ props =>(
        <SmurfForm 
         {...props}
         isUpdating ={this.state.isUpdating}
         updateSmurf = {this.updateSmurf}
         smurf={this.state.smurf}
         addSmurf={this.addSmurf}
         handleInputChange={this.handleInputChange}
        />)}/>
         <Route 
        path='/smurf/:id' 
        render={props=>
        <Smurf {...props} 
        smurfs={this.state.smurfs}
        
        />}
        />

      </div>
    );
  }
}

export default App;
