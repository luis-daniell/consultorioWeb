import React from 'react';
import vision from '../../img/vision.svg';
import delet from '../../img/delet.svg';
import expedienteUser from '../../img/expedienteUser.svg';
import {useHistory} from "react-router-dom";

const ExpedientesMostrar = ({expediente}) => {


    const {id, nombre, telefono, correo, diagnostico} = expediente;
    const history = useHistory();

   //console.log(props);

   //QUEDA PENDIENTE LA ELIMINACION!!!!!!!!!!!! porque se eliminaran todos los datos desde aqui

    const redireccionar = () => {

        //console.log(id);
        
        history.push({

            pathname: "/visualizar-historial",
            state: { detail: expediente }

        });
    }

    return ( 
        <div className="flex content-center items-center justify-items-center justify-center" >

            <div className="w-1/12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-500 cursor-pointer" onClick={() => redireccionar()}>
                <img src={expedienteUser} width="25" alt="Usuario"/>
            </div>

            <div className="pl-1 w-3/12 sm:w-2/12 lg:w-1/12 h-12 flex items-center border-b-2 border-gray-500 cursor-pointer" onClick={() => redireccionar()}>
                <p className="text-tercerColor">{nombre}</p>
            </div>


            <div className="hidden sm:w-3/12 sm:pl-4 sm:h-12 sm:flex sm:items-center sm:border-b-2 sm:border-gray-500 lg:w-2/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500">
                <p className="text-tercerColor">{telefono}</p>
            </div>


            <div className="hidden lg:w-3/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500">
                <p className="text-tercerColor">{correo}</p>
            </div>


            <div className="pl-4 w-6/12 sm:w-4/12 lg:w-3/12 h-12 justify-items-center flex items-center border-b-2 border-gray-500 cursor-pointer" onClick={() => redireccionar()}>
                <p className="text-tercerColor overflow-ellipsis">{diagnostico}</p>
                
            </div>

            <div className="w-1/12 h-12 flex items-center justify-around justify-items-center border-b-2 border-gray-500 lg:border-r-2">
                <div className="hidden sm:flex lg:flex">
                    <img src={vision} width="25" height="" className="cursor-pointer" onClick={() => redireccionar(id)} alt="Visualizar"/>
                </div>

                <div>
                    <img src={delet} width="25" height="" className="cursor-pointer" alt="Eliminar"/>
                </div>
                
            </div>

        </div>
     );
}
 
export default ExpedientesMostrar;