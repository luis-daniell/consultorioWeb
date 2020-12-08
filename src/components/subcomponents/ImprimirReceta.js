import React,{useContext, useEffect, useState} from 'react';
import Pdf from "react-to-pdf";
import {useLocation, useHistory} from "react-router-dom";
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import {FirebaseContext} from '../../firebase/Auth';


const ref = React.createRef();




const ImprimirReceta = () => {

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


    const {apellidosPaciente, nombrePaciente, fechaHoy, medicamentosPaciente, nombreConsultorio} = location.state.detail;





    const redireccionar = () =>{
        history.push("/recetas");
    }


    return ( 


        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Receta</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                       
                        
                            <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            //onClick={() => abrirActualizar()}
                        >
                        Volver</button>


                        <Pdf targetRef={ref} filename={"Receta a "+ nombrePaciente}>
                       
                        {({ toPdf }) =>
                        <div onClick={() => redireccionar()}>
                            <button
                                className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                onClick={toPdf}
                            >Descargar</button>
                        </div>
                        }
                            
                        </Pdf>
                        
                        
                        
                    </div>
                </div>


                <div className="flex justify-center " >
                    <div ref={ref} className="bg-white w-9/12 mt-10 pb-20 flex justify-center h-full mb-12 flex-col items-center justify-items-center" >


                        <div className="w-10/12 border-r-4 border-l-4 border-indigo-800 border-t-4 mt-6 flex justify-items-center items-center justify-center">
                            <p className="uppercase mt-5 text-2xl font-source">{nombreConsultorio}</p>
                        </div>




                        <div className="border-r-4 border-l-4 border-indigo-800 w-10/12 flex justify-center justify-items-center items-center ">

                            <div className="w-2/12 ">
                            
                                <img src={usuario.imagenConsultorio} className="pt-4" width="120" height="120" alt="Imagen Consultorio"/>
                                            
                            </div>



                            <div className="w-9/12">


                                <div className="flex justify-end justify-items-end items-center">
                                    <p className="font-source text-xl">Fecha:&nbsp;&nbsp;&nbsp;</p>
                                    <p className="underline text-tercerColor text-lg">{fechaHoy}</p>
                                </div>

                                <div className="flex items-center">
                                    <p className="font-source text-xl">Nombre de doctor:&nbsp;&nbsp;&nbsp;</p>
                                    <p className="underline text-tercerColor text-lg">{currentUser.displayName}</p>
                                </div>


                            </div>

                        </div>





                        <div className=" w-10/12 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                            

                            <div className="w-2/12">

                            </div>

                            <div className="w-9/12 flex">

                                <div className=" w-5/12 flex items-center">
                                    <p className="font-source text-xl">Especialidad:&nbsp;&nbsp;&nbsp;</p>
                                    <p className="underline text-tercerColor text-lg">{usuario.especialidad}</p>
                                </div>

                                <div className=" w-7/12 flex justify-end justify-items-end items-center">
                                    <p className="font-source text-xl">Cedula Profesional:&nbsp;&nbsp;&nbsp;</p>
                                    <p className="underline text-tercerColor text-lg">{usuario.cedula}</p>

                                </div>
                                
                            </div>
               
                        </div>




                        <div className="pt-8 w-10/12 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                            
                            
                            <div className="w-7/12 flex items-center">
                                <p className="font-source text-xl">Nombre del paciente:&nbsp;&nbsp;&nbsp;</p>
                                <p className="underline text-tercerColor text-lg">{nombrePaciente +" "}{apellidosPaciente}</p>

                            </div>
                            
                        </div>



                        <div className="pt-5 w-10/12 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                            
                            
                            <div className="w-7/12 flex items-center">
                                <p className="font-source text-xl">Medicamentos Recetados:&nbsp;&nbsp;&nbsp;</p>
                                <p className="underline text-tercerColor text-lg">{medicamentosPaciente}</p>

                            </div>
                            
                        </div>



                        <div className="flex-col w-10/12 border-b-4 border-r-4 border-l-4 border-indigo-800 flex justify-items-center items-center justify-center">
                            
                            <div className="border-b-2 w-4/12 h-40 border-tercerColor">

                            </div>

                            <div className="w-7/12 flex justify-center items-center justify-items-center">
                                <p>Firma</p>

                            </div>

                            <div className="w-7/12 flex justify-center items-center justify-items-center">
                                <p className="uppercase text-lg">{usuario.consultorio}</p>

                            </div>

                            <div className="pb-5 w-7/12 flex justify-center items-center justify-items-center">
                                <p>{usuario.telefono}</p>

                            </div>
                            
                        </div>









                    </div>
                </div>

            </div>
        </div>


     );
}
 
export default ImprimirReceta;