import React, { Component } from 'react';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  handleSubmit = (e) =>{
    console.log('running')
    e.preventDefault();
    if(this.props.isUpdating){
      this.props.updateSmurf();
    } else{
      this.props.addSmurf();
    }
  }

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.props.handleInputChange}
            placeholder="name"
            value={this.props.smurf.name}
            type="text"
            name="name"
          />
          <input
            onChange={this.props.handleInputChange}
            placeholder="age"
            type="number"
            value={this.props.smurf.age}
            name="age"
          />
          <input
            onChange={this.props.handleInputChange}
            placeholder="height"
            value={this.props.smurf.height}
            type="text"
            name="height"
          />
          <button type="submit">{this.props.isUpdating ? 'Update Smurf' : 'Add to the village'}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
