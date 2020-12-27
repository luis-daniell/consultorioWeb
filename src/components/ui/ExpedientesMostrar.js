import React from 'react';
import vision from '../../img/vision.svg';
import expedienteUser from '../../img/expedienteUser.svg';
import {useHistory} from "react-router-dom";

const ExpedientesMostrar = ({expediente}) => {


    const {id, nombre, telefono, correo} = expediente;

    const history = useHistory();

   //console.log(props);

    const abrirPagina = (id) => {
        
        history.push({

            pathname: "/visualizar-expediente",
            state: { detail: expediente }

        });
    }

    return ( 
        <div className="flex content-center items-center justify-items-center justify-center cursor-pointer" onClick={() =>abrirPagina(id)}>

            <div className="w-1/12 h-12 flex items-center justify-items-center justify-center border-b-2 border-r-2 border-gray-500">
                <img src={expedienteUser}
                width="25"
                alt="usuario"/>
            </div>

            <div className="pl-1 w-5/12 sm:w-3/12 md:w-2/12 lg:w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{nombre}</p>
            </div>


            <div className="w-5/12 sm:w-3/12 md:w-2/12 lg:w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{telefono}</p>
            </div>


            <div className="hidden md:flex md:w-3/12 md:border-b-2 md:border-gray-500 md:h-12 lg:w-3/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500">
                <p className="text-tercerColor">{correo}</p>
            </div>


            <div 
                className="hidden sm:w-3/12 md:w-2/12 sm:h-12 sm:flex sm:items-center sm:justify-center sm:border-b-2 sm:border-r-2 sm:border-gray-500 cursor-pointer"
                onClick={() => abrirPagina(id)} 
            >
                <img src={vision} width="25" height="" alt="visualizacion"/>
            </div>

            <div className="hidden sm:w-1/12 sm:flex sm:h-12 sm:items-center sm:border-b-2 sm:border-gray-500 lg:w-1/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500">
                
            </div>




        </div>
     );
}
 
export default ExpedientesMostrar;