import React, {useContext, useEffect, useRef, useState} from 'react';
import { useReactToPrint } from "react-to-print";
import {agregarEvento} from '../../helper';
import {useLocation, useHistory} from "react-router-dom";
import {FirebaseContext} from '../../firebase/Auth';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';


const Previsualizacion = () => {
    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });

    const location = useLocation();
    const history = useHistory();

    const {currentUser, firebase} = useContext(FirebaseContext);
    const [usuario, guardarUsuario] = useState([]);
    
    useEffect(() => {
        const obtenerUsuario = async () => {

            const userQ = await firebase.db.collection('usuarios').doc(currentUser.uid);
            const usuario = await userQ.get();
            guardarUsuario(usuario.data());

        }
        obtenerUsuario();
    },[firebase, currentUser]);

    const {nombrePaciente, apellidosPaciente, medicamentos, idPaciente, nuevaCita, correoPaciente, fecha, hora, descripcionCita, telefonoPaciente} = location.state.detail;
    
    const f = new Date();
    const mes = (f.getMonth() +1);
    const year =  f.getFullYear();
    const fech = f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate();

    
    const segundaFuncion =()=> {

      if(nuevaCita === true){

        try {
            firebase.db.collection('recetas').add({
    
                nombreConsultorio: usuario.consultorio,
                fechaHoy: fech,

                nombreDoctor: usuario.nombre,
                
                doctorEspecialidad: usuario.especialidad,
                doctorCedula: usuario.cedula,
                
                nombrePaciente: nombrePaciente,
                apellidosPaciente: apellidosPaciente,
                medicamentosPaciente: medicamentos,
                telefonoPaciente: telefonoPaciente, 
                pacienteId: idPaciente,
                mesReceta: mes.toString(),
                yearReceta: year.toString(),
                
    
            });
            
            history.push("/recetas");
    
        } catch (error) {
            console.log(error);
        }


      }else{

        try {
            firebase.db.collection('recetas').add({
    
                nombreConsultorio: usuario.consultorio,
                fechaHoy: fech,
                nombreDoctor: usuario.nombre,
                
                doctorEspecialidad: usuario.especialidad,
                doctorCedula: usuario.cedula,
                
                nombrePaciente: nombrePaciente,
                apellidosPaciente: apellidosPaciente,
                medicamentosPaciente: medicamentos,
                telefonoPaciente: telefonoPaciente, 
                pacienteId: idPaciente,
                mesReceta: mes.toString(),
                yearReceta: year.toString(),
                
    
            });

            firebase.db.collection('citas').add({
                id: idPaciente,
                nombre: nombrePaciente,
                apellido: apellidosPaciente,
                correo: correoPaciente,
                fecha: fecha,
                hora: hora,
                descripcion: descripcionCita,
                atendida: false,
                mesCita: mes.toString(),
                yearCita: year.toString(),

            });
            
            agregarEvento(nombrePaciente, apellidosPaciente, correoPaciente, fecha, hora, descripcionCita);

            history.push("/recetas");
    
        } catch (error) {
            console.log(error);
        }
      }
  }

  const abrirVolver = () => {
    
    history.push("/nueva-receta");
  }


    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>

                <div className="flex w-full items-center justify-center justify-items-center">

                    <div className="w-5/12 lg:w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-xl sm:text-2xl font-bold lg:pl-12 pt-6">Previsualización de la receta</p>
                    </div>
                    
                    <div className="w-6/12 lg:w-1/2 flex justify-end sm:items-center sm:pr-12 pt-6">

                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-24 sm:w-28 md:w-36 lg:w-40 h-8"
                            onClick={() => abrirVolver()}
                        >Volver</button>
                      
                        <div onClick={() => segundaFuncion()} className="hidden sm:flex pl-5 lg:flex">
                            <button
                                className=" bg-tercerColor  hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source sm:w-28 md:w-36 w-40 h-8"
                                onClick={handlePrint}
                            >Descargar</button>
                        </div>
                        
                    </div>
                </div>

                <div className="flex justify-center " >
                    <div className="mt-10 w-full flex flex-col items-center justify-center">

                    
                        <div ref={ref} className="bg-white w-11/12 lg:w-11/12 pb-20 flex justify-center mb-12 flex-col items-center justify-items-center" >

                            <div className="w-10/12 border-r-4 border-l-4 border-indigo-800 border-t-4 mt-6 flex justify-items-center items-center justify-center">
                                <p className="uppercase mt-5 md:text-xl lg:text-2xl font-source">{usuario.consultorio}</p>
                            </div>
                            

                            <div className="border-r-4 border-l-4 md:flex-nowrap lg:flex-nowrap border-indigo-800 w-10/12 flex justify-center justify-items-center items-center ">
                                
                                <div className="flex justify-center w-3/12 md:w-3/12 lg:w-2/12">
                                    <img src={usuario.imagenConsultorio} className="pt-4" width="120" height="120" alt="ImagenConsultorio"/>                                   
                                </div>

                                <div className=" w-7/12 flex justify-center flex-wrap md:w-7/12 lg:w-9/12">

                                    <div className="pt-5 w-11/12 lg:w-full flex justify-end lg:justify-end justify-items-end items-center">
                                        <p className="font-source text-sm sm:text-base md:text-xl lg:text-xl">Fecha:&nbsp;&nbsp;&nbsp;</p>
                                        <p className="underline text-tercerColor text-sm sm:text-base lg:text-lg">{fech}</p>
                                    </div>

                                    <div className="pt-5 lg:w-full w-11/12 items-center flex flex-wrap justify-start lg:items-center lg:justify-start lg:flex-nowrap lg:justify-items-start">
                                        
                                        <p className="font-source text-sm sm:text-base md:text-xl lg:text-xl">Nombre de doctor:&nbsp;&nbsp;&nbsp;</p>
                                        <p className="underline text-tercerColor text-sm sm:text-base lg:text-lg">{currentUser.displayName}</p>
                                    </div>

                                </div>

                            </div>


                            <div className="pt-5 w-10/12 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                                
                                <div className="w-full sm:w-11/12 md:w-full lg:w-full flex justify-center lg:flex-nowrap">
                                    
                                    <div className="pt-5 lg:pt-0 flex-wrap lg:flex-nowrap w-5/12 flex items-center">
                                        <p className="font-source text-sm sm:text-base md:text-xl lg:text-xl">Especialidad:&nbsp;&nbsp;&nbsp;</p>
                                        <p className="underline text-tercerColor text-sm sm:text-base lg:text-lg">{usuario.especialidad}</p>
                                    </div>

                                    <div className="pt-5 lg:pt-0 w-6/12 flex-wrap lg:flex-nowrap flex lg:justify-end lg:justify-items-end items-center">
                                        <p className="font-source text-sm sm:text-base md:text-xl lg:text-xl">Ced. Prof.:&nbsp;&nbsp;&nbsp;</p>
                                        <p className="underline text-tercerColor text-sm sm:text-base lg:text-lg">{usuario.cedula}</p>
                                    </div>
                                </div> 

                            </div>

                            <div className="lg:pt-8 w-10/12 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">        
                                
                                <div className="pt-5 lg:pt-0 w-11/12 lg:w-11/12 flex flex-wrap lg:flex-nowrap items-center">
                                    <p className="font-source text-sm sm:text-base md:text-xl lg:text-xl">Nombre del paciente:&nbsp;&nbsp;&nbsp;</p>
                                    <p className="underline text-tercerColor text-sm sm:text-base lg:text-lg">{nombrePaciente +" "}{apellidosPaciente}</p>
                                </div>                            
                            </div>


                            <div className="pt-5 w-10/12 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                                <div className="w-11/12 flex-wrap lg:flex-nowrap lg:w-11/12 flex items-center">
                                    <p className="font-source text-sm sm:text-base md:text-xl lg:text-xl">Medicamentos Recetados:&nbsp;&nbsp;&nbsp;</p>
                                    <p className="underline text-tercerColor text-sm sm:text-base lg:text-lg">{medicamentos}</p>
                                </div>                            
                            </div>

                            <div className="flex-col w-10/12 border-b-4 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                                
                                <div className="border-b-2 w-4/12 h-40 border-tercerColor">
                                </div>

                                <div className="w-7/12 flex justify-center items-center justify-items-center">
                                    <p className="text-xs md:text-lg lg:text-lg">Firma</p>
                                </div>

                                <div className="w-7/12 flex justify-center items-center justify-items-center">
                                    <p className="uppercase text-xs md:text-lg lg:text-lg">{usuario.consultorio}</p>
                                </div>

                                <div className="pb-5 w-7/12 flex justify-center items-center justify-items-center">
                                    <p className="text-xs md:text-lg lg:text-lg">{usuario.telefono}</p>
                                </div>
                                
                            </div>
                        </div>

                        <div onClick={() => segundaFuncion()} className="flex justify-center mb-8 sm:hidden">
                            <button
                                className=" bg-tercerColor  hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source sm:w-28 md:w-36 w-40 h-8"
                                onClick={handlePrint}
                            >Descargar</button>
                        </div>



                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Previsualizacion;

