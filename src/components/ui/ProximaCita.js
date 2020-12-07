import React from 'react';

const ProximaCita = ({cita}) => {

    return ( 
        <div className="flex justify-items-center items-center justify-center w-full">
           <p>La próxima cita sera el: {cita.fecha} a las {cita.hora}</p>
        </div>
     );
}
 
export default ProximaCita;