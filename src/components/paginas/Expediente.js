import React, {useState} from 'react';
import Barra from "../ui/Barra";
import Encabezado from "../ui/Encabezado";
import Sidebar from "../ui/Sidebar";
import Boton from "../ui/Boton";
import {Redirect} from 'react-router-dom';


export const Expediente = props => {



    const [visibilidad, setVisibilidad] = useState(false)

    //const navigate = useNavigate();


    const redireccionar = () => {
        props.history.push("/nuevo-expediente");
    }

    return ( 
        <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => redireccionar()}
                        >
                        Nuevo</button>
                    </div>
                </div>
                
                

                <div className="bg-red-800">
                    Hola
                </div>

            </div>
            

        </div>
        
        
     );
}
 