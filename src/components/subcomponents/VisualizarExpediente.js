import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import usuarioPerfil from '../../img/usuarioPerfil.svg';


const VisualizarExpediente = ({props}) => {

    const location = useLocation();




        console.log(location.state.detail);


    //const {id} = expediente;
    //console.log(expediente);
   //s const {id} = props;

    //console.log(id);

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            
                        >
                        Nuevo</button>
                    </div>
                </div>


                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center">


                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-32 flex justify-center items-center content-center mt-6 rounded-t-extra">
                                <p>jkb</p>
                            </div>


                            <div className="bg-orange-900 flex content-center justify-center ">
 
                                <img src={usuarioPerfil} className="-mt-12" width="120" height="120"/>
                                
                            </div>


                            <div className="bg-orange-500">
                                    <p>Hola</p>
                            </div>

                        </div>



                    </div>
                </div>




            </div>

        </div>
     );
}
 
export default VisualizarExpediente;