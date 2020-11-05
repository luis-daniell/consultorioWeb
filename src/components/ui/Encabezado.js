import React from 'react';

const Boton = ({nombre, nombreBoton}) => {
    return ( 
        <div className=" bg-green-500 h-16 flex w-1/2">
            <div className="w-1/2">
                <p className="">{nombre}</p>

            </div>

            
        </div>
     );
}
 
export default Boton;