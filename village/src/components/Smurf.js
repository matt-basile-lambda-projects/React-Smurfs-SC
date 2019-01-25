import React from 'react';

const Smurf = props => {
  console.log(props)
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <button onClick={() => props.deleteSmurf(props.id)}>Remove Smurf</button>
      <button onClick={ e => props.populateSmurfForm(e, props.id)}>Morph Smurf</button>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

