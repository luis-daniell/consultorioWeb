import React from 'react';
import {useHistory} from "react-router-dom";
import calendario from '../../img/calendario2.svg';
import vision from '../../img/vision.svg';

const CitasMostrar = ({cita}) => {


    const { nombre, fecha, hora, id} = cita;

    const history = useHistory();

   //console.log(props);

    const abrirPagina = (id) => {
        
        history.push({

            pathname: "/modificar-cita",
            state: { detail: cita }

        });
    }

    return ( 
        <div className="flex content-center items-center justify-items-center justify-center">

            <div className="w-1/12 h-12 flex items-center justify-items-center justify-center border-b-2 border-r-2 border-gray-500">
                <img src={calendario} width="25" height="" alt="calendario"/>
            </div>

            <div className="pl-1 w-3/12 sm:w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{nombre}</p>
            </div>


            <div className="w-4/12 sm:w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{fecha}</p>
            </div>


            <div className="w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{hora}</p>
            </div>

            <div className="hidden sm:w-2/12 sm:h-12 sm:flex sm:items-center sm:border-b-2 sm:border-gray-500">
                <p className="text-tercerColor">No atendida</p>
            </div>


            <div 
                className="hidden sm:w-1/12 sm:h-12 sm:flex sm:items-center sm:justify-center sm:border-b-2 sm:border-r-2 sm:border-gray-500 sm:cursor-pointer"
                onClick={() => abrirPagina(id)} 
                
            >
                <img src={vision} width="25" height="" alt="visualizar"/>
            </div>

            <div className="w-1/12 border-l-2 border-b-2 h-12 sm:flex sm:items-center sm:border-b-2 border-gray-500">
                
            </div>




        </div>
     );
}
 
export default CitasMostrar;