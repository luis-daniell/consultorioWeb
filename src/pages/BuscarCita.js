import React,{useState, useEffect} from 'react';
import CitasMostrar from '../components/ui/CitasMostrar';
import Barra from '../components/ui/Barra';
import Sidebar from "../components/ui/Sidebar";
import {useHistory, useLocation} from "react-router-dom";

const BuscarCita = (props) => {

    const location = useLocation();
    const [citas, guardarCitas]= useState([]);
    const history = useHistory();
    

    useEffect(() => {
        //console.log(location.pathname); // result: '/secondpage'
        let busqued = location.search; // result: '?query=abc'
        let palabra = busqued.substr(3)

        const busqueda = palabra.toLowerCase();//palabra de busqueda.
    
        const filtro = location.state.detail.filter(citas => {
            return (
            citas.nombre.toLowerCase().includes(busqueda) || 
            citas.apellido.toLowerCase().includes(busqueda)
            )
        });
        guardarCitas(filtro);
      

    }, [ location ]);

    const redireccionar = () => {
        history.push("/visualizar-citas");
    }
    
    return ( 
        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
            <Barra/>

            <div className=" flex justify-center">

                <div className=" w-6/12 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pt-6">Citas</p>
                </div>
                
                <div className="w-5/12 flex justify-end items-center sm:pr-12 pt-6">

                   
                    <button
                        className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        onClick={() => redireccionar()}
                    >
                    Volver</button>
                    
                    
                </div>
            </div>




            <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 pt-6">

                        

                        <div className="text-colorBoton hidden sm:flex sm:justify-center lg:flex lg:justify-center pt-14">
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-3/12 sm:w-2/12  border-black border-b-2 mb-4">
                                <p>Paciente</p>
                            </div>

                            <div className="w-4/12 sm:w-2/12  border-black border-b-2 mb-4">
                                <p>Fecha</p>
                            </div>

                            <div className="w-3/12 sm:w-6/12  border-black border-b-2 mb-4">
                                <p>Hora</p>
                            </div>

                            <div className="hidden sm:w-1/12  border-black border-b-2 mb-4">
                                
                            </div>
                        </div>
                        

                        {citas.map(cita => (
                                <CitasMostrar
                                    key={cita.id}
                                    cita={cita}
                                    props = {props}
                                /> 
                            ))}
                        
                        
                    </div>
                </div>

        </div>
    </div>
     );
}
 
export default BuscarCita;