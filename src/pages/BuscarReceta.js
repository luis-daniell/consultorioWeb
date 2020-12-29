import React,{useState, useEffect} from 'react';
import RecetasMostrar from '../components/ui/RecetasMostrar';
import Barra from '../components/ui/Barra';
import Sidebar from "../components/ui/Sidebar";
import {useHistory, useLocation} from "react-router-dom";

const BuscarReceta = props => {


    const location = useLocation();
    const [recetas, guardarRecetas]= useState([]);
    const history = useHistory();
    

    useEffect(() => {
        //console.log(location.pathname); // result: '/secondpage'
        let busqued = location.search; // result: '?query=abc'
        let palabra = busqued.substr(3)

        const busqueda = palabra.toLowerCase();//palabra de busqueda.
    
        const filtro = location.state.detail.filter(recetas => {
            return (
            recetas.nombrePaciente.toLowerCase().includes(busqueda) || 
            recetas.apellidosPaciente.toLowerCase().includes(busqueda)
            )
        });
        guardarRecetas(filtro);
      

    }, [ location ]);

    const redireccionar = () => {
        history.push("/recetas");
    }


    return ( 

        
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className=" flex justify-center">

                    <div className="w-6/12 flex justify-start items-center">
                        <p className="font-source content-center text-lg lg:text-2xl font-bold pt-6">Recetas</p>
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
                    <div className="bg-white w-11/12 mt-10 pb-20 pt-6 sm:pt-0">

                        <div className="flex items-center justify-end">
                            <div className="hidden lg:flex  lg:justify-start lg:items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3"></p>
                            </div>

                        </div>


                        <div className="text-colorBoton hidden sm:flex sm:justify-center lg:flex lg:justify-center pt-12">
                            
                            <div className="w-1/12 border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-2/12 sm:w-4/12 md:w-3/12 lg:w-2/12 border-black border-b-2 mb-4 flex justify-center">
                                <p>Nombre</p>
                            </div>

                            <div className="w-3/12 sm:w-3/12 md:w-3/12 lg:justify-center border-black border-b-2 mb-4 flex justify-items-center">
                                <p>Teléfono</p>
                            </div>

                            <div className="w-4/12 sm:w-2/12 md:w-3/12 lg:w-4/12 border-black border-b-2 mb-4">
                                <p></p>
                            </div>

                            <div className="w-1/12 border-black border-b-2 mb-4">
                                
                            </div>
                        </div>


                        {recetas.map(receta => (
                                <RecetasMostrar
                                    key={receta.id}
                                    receta={receta}
                                    props = {props}
                                /> 
                            ))}
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default BuscarReceta;