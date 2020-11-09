import React from 'react';

const ExpedientesMostrar = ({expediente}) => {


    const {nombre} = expediente;

    return ( 
        <p>{nombre}</p>
     );
}
 
export default ExpedientesMostrar;