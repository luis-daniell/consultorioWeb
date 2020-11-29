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
                <img src={calendario} width="25" height=""/>
            </div>

            <div className="pl-1 w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{nombre}</p>
            </div>


            <div className="w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{fecha}</p>
            </div>


            <div className="w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{hora}</p>
            </div>

            <div className="w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">No atendida</p>
            </div>


            <div 
                className="w-1/12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-500 cursor-pointer"
                onClick={() => abrirPagina(id)} 
                
            >
                <img src={vision} width="25" height="" />
            </div>

            <div className="w-1/12 h-12 flex items-center border-b-2 border-gray-500">
                
            </div>




        </div>
     );
}
 
export default CitasMostrar;