import React from 'react';
import usuarioMovil from '../../img/usuarioMovil.svg'

const CitasMovil = ({cita}) => {
    const { nombre, fecha, hora} = cita;
    return ( 
        <div className="flex w-full justify-end content-center h-10 border-b border-black items-center">

            <div className=" w-1/12 flex-col flex justify-end">
                <img src={usuarioMovil} width="25" alt="Usuario movil"/>
            </div>

            <div className="w-4/12 flex justify-center font-source text-xs">
                <p>{nombre}</p>
            </div>

            <div className="w-2/12 flex justify-center font-source text-xs">
                <p>{hora}</p>
            </div>

            <div className="w-4/12 flex justify-center font-source text-xs">
                <p>{fecha}</p>
            </div>

        </div>
        
     );
}
 
export default CitasMovil;