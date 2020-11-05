import React from 'react';
import Barra from "../ui/Barra";
import Encabezado from "../ui/Encabezado";
import Sidebar from "../ui/Sidebar";
import Boton from "../ui/Boton";

export const Expediente = () => {
    return ( 
        <div className="flex min-h-screen bg-colorFondo ">
            <Sidebar/>
            
            <div className="bg-colorFondo w-4/5">
                <Barra/>

                <div className="bg-orange-600 flex">

                    <div className="bg-yellow-500 w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className=" bg-green-700 w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white font-bold py-2 px-4 rounded cursor-pointer font-source w-32"
                        >
                        Nuevo</button>
                    </div>
                </div>
                
                

                <div className="bg-red-800">
                    Hola
                </div>

            </div>
            

        </div>
        
        
     );
}
 