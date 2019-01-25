import React from 'react';
import{Link} from 'react-router-dom'

class Smurf extends React.Component{
  constructor(props){
    super(props);
    this.state={
      smurf: '',
      
    }
  }

//   componentDidMount() {
//     const id = this.props.match.params.id;
//     console.log(id)
//     this.fetchSmurf(id);
//   }
//   componentWillReceiveProps(newProps){
//     console.log(newProps.match.params.id)
//     console.log(this.props.match.params.id)
//     if(this.props.match.params.id === newProps.match.params.id){
//       this.fetchSmurf(this.props.match.params.id);
//   }
// }

// fetchSmurf = id => {
//     console.log(id)
//     this.setState({smurf: this.props.smurfs.find(smurf=> smurf.id === id)});


render(){
  

  return (
   
    <div className="Smurf">
      <Link to={`/smurf/${this.props.id}`}> <h3>{this.props.name}</h3></Link>
      <strong>{this.props.height} tall</strong>
      <p>{this.props.age} smurf years old</p>
      <button onClick={() => this.props.deleteSmurf(this.props.id)}>Remove Smurf</button>
      <button onClick={ e => this.props.populateSmurfForm(e, this.props.id)}>Morph Smurf</button>
    </div>
    
  );
}
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

