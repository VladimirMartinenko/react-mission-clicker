import React from 'react';

const Settingstep = ({step,installstep}) => {
    return (
    <div>
      
      <label htmlFor="">Введите шаг:<input onChange={installstep} type="text" name="number" value={step} /></label>
    </div>
  );
}

export default Settingstep;
