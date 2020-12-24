import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { FirebaseContext } from "../../firebase/Auth";
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import ordenador from '../../img/ordenador.svg';


export const Perfil = () => {

    const {currentUser, firebase} = useContext(FirebaseContext);

    //Definir el state para el perdil 
    const [perfil, guardarPerfil] = useState([]);
    //State de boton MODIFICAR O ACTUALIZAR
    const [estado, guardarEstado] = useState(false);

    //State del nombre del usuario
    const [nombre, guardarNombre] = useState('');

    //State para los valores del usuario en Perfil

    const [consultorio, guardarConsultorio] = useState('');
    const [especialidad, guardarEspecialidad] = useState('');

    const [cedula, guardarCedula] = useState('');
    const [direccion, guardarDireccion] = useState('');
    const [telefono, guardarTelefono] = useState('');


    //State para las imagenes 
    const [imagen, guardarImagen] = useState('');

    const [logo, guardarLogo] = useState('');


    let imagenPerfil = usuarioPerfil;
    let imagenLogo = ordenador;

    if(imagen === ''){
        imagenPerfil = usuarioPerfil;

    }else{
        imagenPerfil= imagen;
    }


    if(logo === ''){
        imagenLogo = ordenador;

    }else{
        imagenLogo= logo;
    }


    const history = useHistory();

    const abrirPagina = () => {
        history.push({
            pathname: "/modificar-perfil"
        });
     }

     const abrirActualizar = () => {     
        history.push({
            pathname: "/actualizar-perfil",
            state: { detail: perfil }
        });
     }

     useEffect(() => {  
            const obtenerPerfil = async () => {
                const perfilQ = await firebase.db.collection('usuarios').doc(currentUser.uid);
                const perfil = await perfilQ.get();
                if(perfil.exists) {
                   guardarPerfil( perfil.data() );
                   guardarNombre(currentUser.displayName);
                   guardarConsultorio(perfil.data().consultorio);
                   guardarEspecialidad(perfil.data().especialidad);

                   guardarImagen(perfil.data().imagenDoctor);
                   guardarLogo(perfil.data().imagenConsultorio);

                   guardarCedula(perfil.data().cedula);
                   guardarDireccion(perfil.data().direccion);
                   guardarTelefono(perfil.data().telefono);
                   
                   guardarEstado(true);
                } else {
                    guardarEstado(false);
                    console.log("No existe");
                    guardarNombre(currentUser.displayName);
                    guardarConsultorio('Nombre de consultorio');
                    guardarEspecialidad('----------');


                    guardarCedula('----------');
                   guardarDireccion('----------');
                   guardarTelefono('----------');
                }
            }
            obtenerPerfil();
        
    }, [currentUser, firebase]);

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-sm sm:text-base md:text-lg lg:text-2xl font-bold pl-12 pt-6">Perfil</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        {estado ? 
                            <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirActualizar()}
                        >
                        Actualizar</button>
                        : <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirPagina()}
                        >
                        Modificar</button>
                        }
                        
                    </div>
                </div>


                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">


                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold sm:text-2xl md:text-3xl lg:text-3xl mt-6">
                                <p>{nombre}</p>
                            </div>

                            <div className="bg-colorFondo flex content-center justify-center">
                                <img src={imagenPerfil} className="-mt-12 w-20 sm:w-24 md:w-32" alt="imagenPerfil"/>
                            </div>


                            <div className="bg-colorFondo pb-12 rounded-b-extra border-r-2 border-b-2 border-l-2">
                                    
                                <div className="lg:flex lg:flex-wrap lg:justify-around">

                                    <div className="flex flex-col content-center justify-center">
                                        <div className="flex justify-center pt-3 ">
                                            <p className="font-source text-xl lg:text-2xl lg:font-bold">{consultorio}</p>
                                        </div>

                                        <div className="flex justify-center">
                                            <img src={imagenLogo} className="pt-4 w-20 sm:w-24 md:w-32" alt="imagenLogo"/>
                                        </div>
                                    </div>


                                    <div className=" sm:flex sm:items-center sm:content-center sm:justify-around lg:w-11/12 lg:flex lg:items-center lg:content-center lg:justify-around">

                                        <div className="flex flex-col pt-6 items-center justify-items-center justify-center sm:w-6/12 sm:flex sm:flex-col lg:w-6/12 lg:flex lg:flex-col">
                                            <p className="text-tercerColor sm:text-2xl lg:text-2xl">Especialidad</p>
                                            
                                            <div className=" border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{especialidad}</p>
                                            </div>
                                            
                                        </div>

                                        <div className="flex flex-col pt-6 items-center justify-items-center justify-center sm:w-6/12 sm:flex sm:flex-col sm:justify-end lg:w-6/12 lg:flex lg:flex-col lg:justify-end lg:pl-10">
                                            <p className="text-tercerColor sm:text-2xl lg:text-2xl">Cédula Profesional</p>

                                            <div className=" border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{cedula}</p>
                                            </div>

                                        </div>

                                    </div> 


                                    <div className="pt-4 sm:flex sm:items-center sm:content-center sm:justify-around sm:h-32 lg:w-11/12 lg:flex lg:items-center lg:content-center lg:justify-around lg:h-32">
                                        
                                        <div className="sm:w-6/12 lg:w-6/12 flex flex-col items-center justify-items-center justify-center">
                                            <p className="text-tercerColor sm:text-2xl lg:text-2xl">Dirección</p>
                                            
                                            <div className="border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{direccion}</p>
                                            </div>
                                        </div>

                                        <div className="sm:w-6/12 sm:pt-0 lg:w-6/12 lg:pl-10 lg:pt-0 flex flex-col pt-6 items-center justify-items-center justify-center">
                                            <p className="text-tercerColor sm:text-2xl lg:text-2xl">Teléfono</p>
                                            
                                            <div className="border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{telefono}</p>
                                            </div>
                                            
                                        </div>
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