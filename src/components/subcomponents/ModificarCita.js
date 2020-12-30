import React, { useEffect, useState, useContext } from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {agregarEvento} from '../../helper';
import { v4 as uuidv4 } from 'uuid';
import {FirebaseContext} from '../../firebase/Auth';
import {useFormik} from 'formik';
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const ModificarCita = () => {

    const location = useLocation();
    const history = useHistory();

    const {firebase} = useContext(FirebaseContext);
    const {nombre, apellido, fecha, hora, correo, descripcion, id} = location.state.detail;

    let nombre1 = nombre;
    let apellido1 = apellido;
    let descripcion1 = descripcion;
    let correo1 = correo;

    //Cambiar el valor de la fecha 
    const [dato, guardarDato] = useState('');

    //Cambia el valor a pospuesta, muestra calendario
    const [calendario, guardarCalendario] = useState(false);

    const valor = [
        {codigo: 'noatendida', nombre:'No atendida'},
        {codigo: 'atendida', nombre:'Atendida'},
        {codigo: 'pospuesta', nombre:'Pospuesta'}
    ]

    useEffect(() => {
        if(dato === 'pospuesta'){
            guardarCalendario(true);
            //console.log(dato);
            
        }else{
            guardarCalendario(false);
        }
        
    }, [dato]);

    const formik = useFormik({
        initialValues : {
            nombre: nombre1,
            apellido: apellido1,
            atendida: false,
            correo: correo1,
            descripcion: descripcion1,
            fecha: '',
            hora: '',

        },

        onSubmit: cita => {
            try {
                if(dato === 'pospuesta'){

                    firebase.db.collection('citas').add({
                        nombre: cita.nombre,
                        apellido: cita.apellido,
                        correo: cita.correo,
                        fecha: cita.fecha,
                        hora: cita.hora,
                        descripcion: cita.descripcion,
                        atendida: cita.atendida,
    
                    });

                    agregarEvento(cita.nombre, cita.apellido, cita.correo, cita.fecha, cita.hora, cita.descripcion);
                    MySwal.fire({
                        icon: 'success',
                        title: <p>Datos guardados correctamente</p>
                    })
                    history.push("/visualizar-citas");

                }else if (dato === 'atendida'){

                    firebase.db.collection('citas')
                    .doc(id)
                    .update({
                        atendida: true
                    })
                    MySwal.fire({
                        icon: 'success',
                        title: <p>Datos guardados correctamente</p>
                    })
                    history.push("/visualizar-citas");

                    //console.log(dato);
                }else{
                    MySwal.fire({
                        icon: 'success',
                        title: <p>Datos guardados correctamente</p>
                    })
                    history.push("/visualizar-citas");
                   //console.log(dato);
                }
                
            } catch (error) {
                console.log(error);
            }
        }

    });

    
    
    return ( 
            
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo flex-col lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>

                <div className=" flex justify-center">

                    <div className=" w-11/12 sm:w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-xl sm:text-2xl font-bold sm:pl-12 pt-6">Cita de paciente</p>
                    </div>
                    
                    <div className="hidden sm:w-1/2 sm:flex sm:justify-end sm:items-center sm:pr-12 sm:pt-6">
                        <button
                            className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={formik.handleSubmit}
                            type="submit"
                        >
                        Modificar</button>
                    </div>
                </div>


                <div className="flex justify-center flex-wrap">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">


                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-24 sm:h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-lg sm:text-3xl mt-6">
                                <p>{nombre +" " + apellido}</p>
                            </div>


                            <div className="bg-colorFondo flex content-center justify-center ">

                                <img src={usuarioPerfil} className="-mt-12 w-20 sm:w-28"  alt="UsuarioPerfil"/>
                                
                            </div>


                            <div className="bg-colorFondo pb-12 rounded-b-extra">
                                    
                                <div className="flex h-auto content-center justify-center items-center justify-items-center">
                                    
                                    <div className="flex justify-end pr-4 w-6/12">
                                        <p className="text-tercerColor text-lg lg:text-2xl">Fecha</p>
                                    </div>

                                    <div className="flex justify-start sm:pl-4 w-6/12 text-tercerColor text-2xl">
                                        <p className="text-tercerColor text-lg lg:text-2xl">{fecha}</p>
                                    </div>

                                
                                </div>   
                                
                                <div className="flex h-auto content-center justify-center items-center justify-items-center pt-4">
                                    <div className="flex justify-end pr-4 w-6/12 lg:w-1/6 h-auto">
                                        <p className="text-tercerColor text-lg lg:text-2xl">Hora</p>
                                    </div>

                                    <div className="flex justify-start sm:pl-4 w-6/12 lg:w-1/6 h-auto text-tercerColor text-2xl">
                                        <p className="text-tercerColor text-lg lg:text-2xl">{hora}</p>
                                    </div>
                                </div>

                                <div className="flex h-auto content-center justify-center items-center justify-items-center pt-4">
                                    
                                    <div className="flex justify-center w-11/12 h-auto">

                                    <select
                                        onChange={e => guardarDato(e.target.value)}
                                        value={dato}
                                        className="shadow appearance-none border-2 w-11/12 sm:w-5/12 py-2 px-3"
                                    >
                                        
                                        {valor.map(opcion => (
                                            <option key={uuidv4()} value={opcion.codigo}>{opcion.nombre}</option>
                                        ))}
                                    </select>
                                        
                                    </div>
                                </div>

                                { calendario ?
                                <div className="flex flex-col sm:flex-row justify-items-center items-center justify-center">
                                    <div className="w-11/12 sm:w-3/6 flex flex-col mt-6 justify-items-center items-center justify-center">
                                        <label className="font-source text-tercerColor text-xl sm:text-2xl">Selecciona fecha: </label>
                                        <input
                                            type="date"
                                            name="fecha"
                                            className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                            value={formik.values.fecha}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
            
                                    </div>
        
        
                                    <div className=" w-11/12 sm:w-3/6 flex flex-col mt-6 justify-items-center items-center justify-center">
                                        <label className="font-source text-tercerColor text-xl sm:text-2xl">Selecciona hora: </label>
                                        <input
                                            type="time"
                                            name="hora"
                                            className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                            value={formik.values.hora}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            
                                        />
                                    </div>
                                </div>


                                : null
                                }

                            </div>
                        </div>
                    </div>

                    <div className="w-11/12 flex justify-center pb-10 sm:hidden ">
                        <button
                            className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={formik.handleSubmit}
                            type="submit"
                        >
                        Modificar</button>
                    </div>

                </div>
            </div>
    </div>
    );
}
 
export default ModificarCita;