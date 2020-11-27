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

                   guardarCedula(perfil.data().cedula);
                   guardarDireccion(perfil.data().direccion);
                   guardarTelefono(perfil.data().telefono);
                   
                   guardarEstado(true);
                   //guardarConsultarDB(false);
                } else {
                    guardarEstado(false);
                    console.log("No existe");
                    guardarNombre(currentUser.displayName);
                    guardarConsultorio('Nombre de consultorio');
                    guardarEspecialidad('----------');


                    guardarCedula('----------');
                   guardarDireccion('----------');
                   guardarTelefono('----------');
                    //guardarError( true );
                    //guardarConsultarDB(false);
                }
            }
            obtenerPerfil();
        
    }, []);

    //console.log(perfil);

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Perfil</p>
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

                            <div className="bg-tercerColor border-1 border-black h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-3xl mt-6">
                                <p>{nombre}</p>
                            </div>


                            <div className="bg-colorFondo flex content-center justify-center">
 
                                <img src={usuarioPerfil} className="-mt-12" width="120" height="120"/>
                                
                            </div>


                            <div className="bg-colorFondo pb-12 rounded-b-extra border-r-2 border-b-2 border-l-2">
                                    
                                  
                                



                                <div className="flex flex-wrap justify-around">




                                    
                                        <div className="w-11/12 flex flex-col content-center justify-center ">
                                            
                                            <div className="flex justify-center pt-3">
                                                <p className="font-source text-2xl">{consultorio}</p>
                                            </div>

                                            <div className="flex justify-center">
                                                <img src={ordenador} className="pt-4" width="120" height="120"/>
                                            </div>
                                            

                                        </div>





                                    <div className="w-11/12 flex items-center content-center justify-around">

                                        <div className="w-6/12 flex flex-col">
                                            <p className="text-tercerColor text-2xl">Especialidad</p>
                                            
                                            <div className=" border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{especialidad}</p>
                                            </div>
                                            
                                        </div>

                                        <div className="w-6/12 flex flex-col justify-end pl-10">
                                            <p className="text-tercerColor text-2xl">Cédula Profesional</p>

                                            <div className=" border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{cedula}</p>
                                            </div>

                                        </div>

                                    </div> 



                                    <div className="w-11/12 flex items-center content-center justify-around h-32">
                                        <div className="w-6/12">
                                            <p className="text-tercerColor text-2xl">Dirección</p>
                                            
                                            <div className="border-4 border-tercerColor w-10/12 flex justify-around h-10 items-center">
                                                <p>{direccion}</p>
                                            </div>
                                        </div>

                                        <div className="w-6/12 pl-10">
                                            <p className="text-tercerColor text-2xl">Teléfono</p>
                                            
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