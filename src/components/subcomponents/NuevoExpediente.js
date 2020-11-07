import React from 'react';
import Barra from "../ui/Barra";
import Encabezado from "../ui/Encabezado";
import Sidebar from "../ui/Sidebar";

const NuevoExpediente = () => {
    return ( 
        <div className="">
            
                <Sidebar/>
            
            
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right">
                <Barra/>

                <div className="flex">

                    <div className="flex w-1/2 justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Nuevo Expediente</p>
                    </div>
                    
                    <div className=" w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            
                        >
                        Guardar</button>
                    </div>
                </div>
                
                

                <div className="flex justify-center">
                    <form className="bg-white mt-10 w-11/12 pb-20">

                        <div className="">
                            <p className="font-source font-bold text-xl pl-12 pt-3">Ingresa los datos del paciente</p>
                        </div>

                        <div className="flex mt-10">

                            <label className="w-3/12 pl-12 text-tercerColor">Nombre: </label>
                            <input 
                            type="text" placeholder="Nombre" 
                            className="w-3/12 shadow appearance-none border-2 py-2 px-3"/>

                            <label className="w-2/12 pl-12 text-tercerColor">Apellidos: </label>
                            <input 
                            type="text" placeholder="Apellidos" 
                            className="w-3/12 shadow appearance-none border-2 py-2 px-3"/>
                        </div>




                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 pl-12 text-tercerColor">Domicilio: </label>
                            <textarea
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Domicilio"
                                

                            ></textarea>
                        </div>





                        <div className=" flex mt-6">

                            <label className="w-3/12 pl-12 text-tercerColor">Telefono: </label>
                            <input 
                            type="tel" placeholder="Telefono" 
                            className="shadow appearance-none border-2 w-3/12 py-2 px-3"/>

                            <label className="w-2/12 pl-12 text-tercerColor">Sexo: </label>

                            <select
                                className="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>

                            </select>


                        </div>



                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 pl-12 text-tercerColor">E-mail: </label>
                            <input 
                            type="Email" placeholder="Correo Electrónico" 
                            className="shadow appearance-none border-2 w-8/12 py-2 px-3"/>

                        </div>




                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 font-source text-tercerColor pl-12">Antecedentes Familiares: </label>
                            <textarea
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Antecedentes Familiares"
                                

                            ></textarea>
                        </div>




                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 pl-12 text-tercerColor">Estilos de vida: </label>
                            <textarea
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Estilos de vida"
                                

                            ></textarea>
                        </div>



                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 pl-12 text-tercerColor">Diagnóstico: </label>
                            <textarea
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Diagnóstico"
                                

                            ></textarea>
                        </div>



                        <div className=" flex justify-around pr-12 pt-6">
                            <button
                                className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                
                            >
                            Toma de presion: </button>


                            <button
                                className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                
                            >
                            Peso: </button>


                            <button
                                className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                
                            >
                            Talla: </button>
                        </div>



                    </form>
                </div>

            </div>
            

        </div>
     );
}
 
export default NuevoExpediente;