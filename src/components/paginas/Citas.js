import React from 'react';
import {useHistory} from "react-router-dom";
import Iframe from 'react-iframe';
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";

export const Citas = () => {
    
    const history = useHistory();

    const abrirCita = () => {     
        history.push({
            pathname: "/visualizar-citas",
        });
     }

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
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
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center">
                            
                        <div className="w-11/12 flex justify-items-center items-center justify-center ">

                          
                          
                        <Iframe url="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FMexico_City&amp;src=bHVpcy5kYW5pZWxsLnRpY3NAZ21haWwuY29t&amp;color=%23039BE5"
                          //CONFIGURAR EN GOOGLE CALENDAR PARA EL CORREO OBTENER EL VINCULO AL CALENDARIO PARA COMPARTIRLO
                          width="1000px"
                          height="450px"
                          id="myId"
                          className="w-5/6 justify-center flex justify-items-center items-center "
                          display="initial"
                          position="relative"
                        />
                        
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
     );
}

/**
 * 
 * 
 * 
 * https://calendar.google.com/calendar/embed?src=luisdanielcastro16%40gmail.com&ctz=America%2FMexico_City
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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


 