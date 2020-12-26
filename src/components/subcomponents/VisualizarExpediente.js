import React from 'react';
import {useLocation, useHistory} from "react-router-dom";
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import usuarioPerfil from '../../img/usuarioPerfil.svg';


const VisualizarExpediente = () => {

    const location = useLocation();
    const history = useHistory();

    const {nombre, apellidos, antecedentes, correo, diagnostico, domicilio, estilos, id, peso, presion, sexo, talla, telefono} = location.state.detail;

    
    const expediente = {
        nombre2: nombre, 
        apellidos2: apellidos,
        antecedentes2: antecedentes,
        correo2: correo,
        diagnostico2: diagnostico, 
        domicilio2: domicilio,
        estilos2: estilos,
        id2: id,
        peso2: peso,
        presion2: presion,
        sexo2: sexo, 
        talla2: talla,
        telefono2: telefono
    }

    const abrirPagina = () => {
     
        
        history.push({

            pathname: "/modificar-expediente",
            state: { detail: expediente }

        });
     }

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirPagina()}
                        >
                        Modificar</button>
                    </div>
                </div>

                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">

                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-3xl mt-6">
                                <p>{nombre +" " + apellidos}</p>
                            </div>

                            <div className="bg-colorFondo flex content-center justify-center ">
                                <img src={usuarioPerfil} className="-mt-12" width="120" height="120" alt="Usuario Perfil"/>                             
                            </div>


                            <div className="bg-colorFondo pb-12 rounded-b-extra">
                                    
                                <div className=" flex flex-col sm:flex-row h-auto content-center justify-around">
                                    <div className="w-3/12 flex flex-col">
                                        <p className="text-tercerColor text-2xl">Domicilio</p>
                                        <p>{domicilio}</p>
                                    </div>

                                    <div className="w-3/12">
                                        <p className="text-tercerColor text-2xl">Teléfono</p>
                                       <p>{telefono}</p>
                                    </div>

                                    <div className="w-3/12">
                                        <p className="text-tercerColor text-2xl">Sexo</p>
                                        <p>{sexo}</p>
                                    </div>
                                
                                </div>   
                                
                                <div className="bg-colorFondo flex flex-col sm:flex-row h-auto justify-around mt-4">       
                                    <div className="w-3/12">
                                        <p className="text-tercerColor text-2xl">Diagnóstico</p>
                                        <p>{diagnostico}</p>
                                    </div>

                                    <div className="w-3/12">
                                        <p className="text-tercerColor text-lg">Antecedentes Familiares</p>
                                        <p className="break-words">{antecedentes}</p>
                                    </div>

                                    <div className="w-3/12">
                                        <p className="text-tercerColor text-2xl">Estilos de Vida</p>
                                        <p className="break-words">{estilos}</p>
                                    </div>
                                </div>

                                <div className="flex h-24 flex-col sm:flex-row content-center justify-around">

                                    <div className="w-3/12">
                                        <p className="text-tercerColor text-2xl">E-mail</p>
                                        <p>{correo}</p>
                                    </div>

                                    {presion === "" ? null : 
                                        <div className="w-3/12">
                                            <p className="text-tercerColor text-2xl">Presión</p>
                                            <p>{presion}</p>
                                        </div>
                                    }
                                    
                                   {peso === "" ? null : 
                                   <div className="w-3/12">
                                        <p className="text-tercerColor text-2xl">Peso</p>
                                        <p>{peso}</p>
                                    </div>}

                                </div> 

                                <div className="flex h-24 sm:flex-row flex-col content-center justify-around">

                                    {talla === "" ? null : 
                                        <div className="w-3/12">
                                            <p className="text-tercerColor text-2xl">Talla</p>
                                            <p>{talla}</p>
                                        </div>
                                    }

                                    <div className="w-3/12">
                                    </div>

                                    <div className="w-3/12">
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default VisualizarExpediente;