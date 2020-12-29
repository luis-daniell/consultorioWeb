import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import Barra from "../ui/Barra";
import Iframe from 'react-iframe';
import Sidebar from "../ui/Sidebar";

export const Citas = () => {

    const [estado, guardarEstado] = useState(false);
    
    const history = useHistory();

    const abrirCita = () => {     
        history.push({
            pathname: "/visualizar-citas",
        });
    }

    let calendarioLocal = localStorage.getItem('calendario');
    if(!calendarioLocal){
        calendarioLocal = '';
    }

    useEffect(() => {
        if(calendarioLocal === ''){
            guardarEstado(true);
        }else{
            //guardarYear(year);
            guardarEstado(false);
        }
    }, [calendarioLocal])


    const formik = useFormik({
        initialValues : {
            calendario: '',
        },


        onSubmit: dato => {
            
            localStorage.setItem('calendario',(dato.calendario.toString()));
            guardarEstado(false);

        }

    });

    //const urlCalendario = devolverCalendario(<iframe src="https://calendar.google.com/calendar/embed?src=luisdanielcastro16%40gmail.com&ctz=America%2FMexico_City" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>);
    //console.log(urlCalendario);



    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right h-screen">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center sm:text-lg md:text-xl lg:text-2xl font-bold pl-12 pt-6">Calendario de Citas</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-3 lg:px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirCita()}
                        >
                        Ver Citas</button>
                    </div>
                </div>


                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 flex justify-center">
                        {estado ?
                        <div>
                            <form 
                                className="w-11/12 flex lg:justify-start items-center justify-items-center"
                                //onSubmit={handleSubmit}
                                onSubmit={formik.handleSubmit}
                                >
                                <label className="text-base w-1/12 sm:font-bold lg:w-3/12 text-tercerColor lg:font-bold font-source sm:text-xl lg:text-3xl">Calendario</label>
                                
                                <input
                                    required
                                    id="calendario" 
                                    type="text" placeholder="Incorporar codigo de calendario" 
                                    className="bg-orange-300 lg:ml-4 w-5/12 ml-4 md:w-4/12 md:ml-0 text-xs sm:text-lg lg:text-lg shadow appearance-none border rounded lg:w-5/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formik.values.calendario}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />


                                <button
                                    className="ml-2 lg:ml-4 focus:outline-none sm:text-lg sm:px-5 bg-tercerColor hover:bg-blue-dark text-white px-2 lg:text-xl text-xs rounded-full cursor-pointer font-source lg:w-40 h-8"  
                                    type="submit"
                                >
                                Guardar</button>

                            </form>
                            <div>
                                <ol>
                                    <li>Dirijase al calendario de google Calendar</li>
                                    <li>Seleccione configuracion</li>
                                    <li>Seleccione el calendario</li>
                                    <li>Seleccione Integrar Calendario</li>
                                    <li>Copie la URL publica del calendario</li>
                                    <li>Pegue el codigo la caja de texto</li>
                                </ol>
                            </div>
                        </div>

                        :
                            <div className="bg-orange-600 w-full flex items-center justify-center">
                                <div className="w-full flex items-center justify-center">
                                    <Iframe 
                                        url={calendarioLocal}
                                        //CONFIGURAR EN GOOGLE CALENDAR PARA EL CORREO OBTENER EL VINCULO AL CALENDARIO PARA COMPARTIRLO
                                        
                                        id="myId"
                                        className="h-96 w-11/12"
                                        display="initial"
                                        position="relative"
                                    />
                                </div>
                            
                            </div>
                    }    
                    </div>
                </div>
            </div>
        </div>
     );
}

/**
 * https://calendar.google.com/calendar/embed?src=luisdanielcastro16%40gmail.com&ctz=America%2FMexico_City
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


 