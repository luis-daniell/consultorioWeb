import React from 'react';

const Boton = ({nombreBoton}) => {
    return ( 
        <div className=" bg-orange-500 h-16 flex w-1/2">
            

            <div>
                <p className="w-1/2">{nombreBoton}</p>
            </div>
            
        </div>
     );
}
 
export default Boton;