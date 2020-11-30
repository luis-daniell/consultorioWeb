import React from 'react';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import {useLocation, useHistory} from "react-router-dom";



const Previsualizacion = () => {


    const location = useLocation();
    const history = useHistory();
    console.log(location.state.detail);




    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Previsualización de la receta</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                       
                        
                            <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            //onClick={() => abrirActualizar()}
                        >
                        Volver</button>
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            //onClick={() => abrirPagina()}
                        >
                        Descargar</button>
                        
                        
                    </div>
                </div>


                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">


                        <div className="w-10/12">

                            <p>----</p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default Previsualizacion;

