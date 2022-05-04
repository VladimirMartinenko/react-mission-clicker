import React from 'react';

const Settingstep = ({number,step}) => {
    return (
    <div>
      
      <label htmlFor="">Введите шаг:<input onChange={step} type="text" name="number" value={number} /></label>
    </div>
  );
}

export default Settingstep;
