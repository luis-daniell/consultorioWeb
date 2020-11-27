import React from 'react';
import {useHistory} from "react-router-dom";
import {obtenerToken} from '../../../src/helper';
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";

export const Citas = () => {




    
    const history = useHistory();

    const abrirCita = () => {     
        history.push({
            pathname: "/visualizar-citas",
            //state: { detail: perfil }
        });
     }

     const token = obtenerToken();
     console.log(token);
     



    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Calendario de Citas</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                       
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirCita()}
                        >
                        Ver Citas</button>
                        
                        
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
 
/**
 * Client ID:   657875948864-7lkf7vloqh74rnidjptjqkrr810tvcg9.apps.googleusercontent.com
 * Cliente Secret: XUSZ5sb8LZGBS8zx5C7JJRP_
 * API KEY: AIzaSyDsE0rQ8ORfmmU6OigypW-IQyjFUihvjhg
 * 
 *	
 * ID de CLiente: 529094084148-em988n3ck312m1g82k3ucm96vudp5ou2.apps.googleusercontent.com
 * Tu secreto del cliente: C32hry6h-1IkPI_r1PPy7jek
 * Refresh Token: 1//04HDVOpAKUlGACgYIARAAGAQSNwF-L9IreoJiI5SDC_Ph7hXB_M-Eci9r6oUnhp2Hwvq_AtvpuHYkbig-q1Nb630_kaq2j4R3mPE
 * API KEY: AIzaSyC5rozZvL1yXtj51_ThlbCFOxAMqDiXcIY
 */