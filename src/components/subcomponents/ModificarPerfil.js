import React from 'react';
import {useLocation, useHistory} from "react-router-dom";
import FileUploader from 'react-firebase-file-uploader';
import Barra from '../ui/Barra';
import Sidebar from '../ui/Sidebar';

const ModificarPerfil = () => {


    const history = useHistory();


    const abrirPagina = () => {
     
        
        history.push({

            pathname: "/perfil"

        });
     }



    return ( 
        <div className="">
            
                <Sidebar/>
            
            
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
                <Barra/>

                <div className="flex">

                    <div className="flex w-1/2 justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Modificar Perfil</p>
                    </div>
                    
                    <div className=" w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirPagina()}
                            type="submit"
                        >
                        Guardar</button>
                    </div>
                </div>
                
                

                <div className="flex justify-center">
                    <form 
                    className="bg-white mt-10 w-11/12 pb-20 h-full mb-12"
                   // onSubmit={handleSubmit}
                    >

                        <div className="">
                            <p className="font-source font-bold text-xl pl-12 pt-3">Ingresa los campos a modificar</p>
                        </div>

                        <div className="flex mt-10">

                            <label className="w-3/12 pl-12 text-tercerColor">Doctor: </label>
                            <input 
                                type="text" placeholder="Nombre Completo" 
                                className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="nombre"
                                value=""

                            />

                        </div>




                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 pl-12 text-tercerColor">Nombre del consultorio: </label>
                            <input 
                                type="Email" placeholder="Nombre del consultorio" 
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                id="consultorio"
                                value=""
                            />

                        </div>


                        <div className="flex mt-6">
                            <label className="w-3/12 pl-12 text-tercerColor" htmlFor="imagen">Imagen del Doctor: </label>
                            <FileUploader
                                accept="image/*"
                                id="imagen"
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                //name="imagen"
                                //randomizeFilename
                               // storageRef={firebase.storage.ref("productos")}
                               // onUploadStart={handleUploadStart}
                               // onUploadError={handleUploadError}
                               // onUploadSuccess={handleUploadSuccess}
                               // onProgress={handleProgress}
                            />
                        </div>


                        <div className="flex mt-6">
                            <label className="w-3/12 pl-12 text-tercerColor" htmlFor="imagen">Imagen del consultorio: </label>
                            <FileUploader
                                accept="image/*"
                                id="imagen"
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                               // name="imagen"
                                //randomizeFilename
                               // storageRef={firebase.storage.ref("productos")}
                               // onUploadStart={handleUploadStart}
                                //onUploadError={handleUploadError}
                                //onUploadSuccess={handleUploadSuccess}
                                //onProgress={handleProgress}
                            />
                        </div>


                        <div className="flex mt-10">

                            <label className="w-3/12 pl-12 text-tercerColor">Cédula Profesional: </label>
                            <input 
                                type="text" placeholder="Cédula Profesional" 
                                className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="cedula"
                                value=""

                            />

                        </div>


                        <div className="flex mt-10">

                            <label className="w-3/12 pl-12 text-tercerColor">Teléfono: </label>
                            <input 
                                type="text" placeholder="Teléfono" 
                                className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="telefono"
                                value=""

                            />

                        </div>




                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 pl-12 text-tercerColor">Dirección: </label>
                            <textarea
                                id="direccion"
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Dirección"
                                value=""
                                

                            ></textarea>
                        </div>






                       

                    </form>
                </div>

            </div>
            

        </div>
     );
}
 
export default ModificarPerfil;