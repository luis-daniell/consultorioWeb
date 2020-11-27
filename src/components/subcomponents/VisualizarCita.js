import React from 'react';

import {useLocation, useHistory} from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";

const VisualizarCita = () => {



    const history = useHistory();

    const abrirNuevaCita = () => {     
        history.push({
            pathname: "/nueva-cita",
            //state: { detail: perfil }
        });
     }




    return ( 
        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
            <Barra/>

            <div className=" flex">

                <div className=" w-1/2 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Citas</p>
                </div>
                
                <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                   
                    <button
                        className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        onClick={() => abrirNuevaCita()}
                    >
                    Nuevo</button>
                    
                    
                </div>
            </div>


            <div className="flex justify-center ">
                <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">
                        
                    <div className="bg-orange-400 w-11/12">
                        hola
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
     );
}
 
export default VisualizarCita;