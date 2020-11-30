import React from 'react';
import Barra from '../ui/Barra';
import Sidebar from "../ui/Sidebar";
import {useHistory} from "react-router-dom";

export const Recetas = () => {


    const history = useHistory();


    const redireccionar = () => {
        history.push("/nueva-receta");
    }




    return ( 
        <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Recetas</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => redireccionar()}
                        >
                        Nuevo</button>
                    </div>
                </div>
                
                

               
                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20">

                        <div className="flex">
                            <div className=" flex w-1/2 justify-start items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3"></p>
                            </div>

                            <div className=" flex w-1/2 justify-end items-center pr-12 pt-6">
                                <input placeholder="Buscar..." className="w-40 h-10 bg-colorFondo text-black"/>
                            </div>


                        </div>

                        <div className="text-colorBoton flex justify-center">
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-2/12  border-black border-b-2 mb-4">
                                <p>Nombre</p>
                            </div>

                            <div className="w-2/12  border-black border-b-2 mb-4">
                                <p>Teléfono</p>
                            </div>

                            <div className="w-5/12  border-black border-b-2 mb-4">
                                <p></p>
                            </div>

                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>
                        </div>
                        
                        
                        
                    </div>
                </div>
                    
               
                

            </div>
            

        </div>
     );
}
 