import React,{useContext, useState} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {FirebaseContext} from '../../firebase/Auth';
import {useFormik} from 'formik';
import FileUploader from 'react-firebase-file-uploader';
import Barra from '../ui/Barra';
import Sidebar from '../ui/Sidebar';

const ActualizarPerfil = ({perfil}) => {
    


    const history = useHistory();
    const location = useLocation();

    const {firebase, currentUser} = useContext(FirebaseContext);


    const {nombre, consultorio, cedula, telefono, direccion, especialidad} = location.state.detail;

    //console.log(location.state.detail);

    let nombre2 = nombre;
    let consultorio2 = consultorio;
    let cedula2 = cedula;
    let telefono2 = telefono;
    let direccion2 = direccion;
    let especialidad2 = especialidad;

   //console.log(currentUser.uid);

     //State para las imagen de doctor
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState('');

    //State para las imagen de consultorio
    const [subiendo2, guardarSubiendo2] = useState(false);
    const [progreso2, guardarProgreso2] = useState(0);
    const [urlimagen2, guardarUrlimagen2] = useState('');



     //Validacion y leer los datos del formulario
     const formik = useFormik({

        initialValues: {
            uid: currentUser.uid,
            nombre: nombre2,
            especialidad: especialidad2,
            consultorio: consultorio2,
            imagenDoctor: '',
            imagenConsultorio: '',
            cedula: cedula2, 
            telefono: telefono2,
            direccion: direccion2,

        },


        onSubmit: perfill => {
            try {
                perfill.imagenDoctor = urlimagen;
                perfill.imagenConsultorio = urlimagen2;
                firebase.db.collection('usuarios').doc(currentUser.uid).update(perfill);
              
                currentUser.updateProfile({
                    displayName: perfill.nombre
                  }).then(function() {
                    history.push("/perfil");
                  })
                
            } catch (error) {
                console.log(error);
            }
        }
     });

     //Todo sobre las imagenes
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }

    const handleUploadError = error => {
        guardarSubiendo(false);
        //console.log(error);
    }

    const handleUploadSuccess = async nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);

        //Almacenar la URL de destino

        const url = await firebase
                    .storage
                    .ref("perfil")
                    .child(nombre)
                    .getDownloadURL();
        //console.log(url);
        guardarUrlimagen(url);
    }

    const handleProgress = progreso => {
        guardarProgreso(progreso);
        //console.log(progreso);
    }

    //Todo sobre las imagen de consultorio
    const handleUploadStart2 = () => {
        guardarProgreso2(0);
        guardarSubiendo2(true);
    }

    const handleUploadError2 = error => {
        guardarSubiendo2(false);
        //console.log(error);
    }

    const handleUploadSuccess2 = async nombre => {
        guardarProgreso2(100);
        guardarSubiendo2(false);

        //Almacenar la URL de destino

        const url2 = await firebase
                    .storage
                    .ref("perfil")
                    .child(nombre)
                    .getDownloadURL();
        //console.log(url2);
        guardarUrlimagen2(url2);
    }

    const handleProgress2 = progreso => {
        guardarProgreso2(progreso);
        //console.log(progreso);
    }


    return ( 
        <div className="">
            
            <Sidebar/>
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>
                <div className="flex justify-center ">

                    <div className="w-11/12 sm:w-6/12 sm:flex sm:justify-start sm:items-center">
                        <p className="font-source content-center text-xl sm:text-2xl font-bold pt-6">Modificar Perfil</p>
                    </div>
                    <div className="hidden sm:w-5/12 sm:flex sm:justify-end sm:items-center sm:pr-12 sm:pt-6">
                        <button
                            className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={formik.handleSubmit}
                            type="submit"
                        >
                        Guardar</button>
                    </div>
                </div>
                
                

                <div className="flex justify-center">
                    <form 
                        className="bg-white mt-10 w-11/12 pb-20 h-full mb-12"
                    >
                        <div className="flex justify-center sm:justify-start">
                            <p className="font-source font-bold text-base sm:text-xl sm:pl-12 pt-3">Ingresa los campos a modificar</p>
                        </div>

                        <div className="flex justify-center sm:justify-start mt-10">

                            <label className="hidden sm:flex sm:w-3/12 sm:pl-12 text-tercerColor">Doctor: </label>
                            <input 
                                type="text" placeholder="Nombre Completo" 
                                className="w-11/12 sm:w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />

                        </div>


                        <div className="flex justify-center sm:justify-start mt-10">

                            <label className="hidden sm:flex sm:w-3/12 sm:pl-12 text-tercerColor">Especialidad: </label>
                            <input 
                                type="text" placeholder="Especialidad de Doctor" 
                                className="w-11/12 sm:w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="especialidad"
                                value={formik.values.especialidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />

                        </div>


                        <div className="flex justify-center sm:justify-start mt-6">
                            <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 sm:pl-12 text-tercerColor">Nombre del consultorio: </label>
                            <input 
                                type="text" placeholder="Nombre del consultorio" 
                                className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                id="consultorio"
                                value={formik.values.consultorio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                        </div>


                        <div className="justify-center sm:justify-start flex mt-6">
                            <label className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor" htmlFor="imagen">Imagen del Doctor: </label>
                            <FileUploader
                                accept="image/*"
                                //accept=".svg"
                                id="imagenDoctor"
                                className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                name="imagenDoctor"
                                randomizeFilename
                                storageRef={firebase.storage.ref("perfil")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>

                        {subiendo && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progreso}%`}}>
                                    {progreso} %
                                </div>
                            </div>
                        )}

                        {urlimagen && (
                           <p className="bg-green-500 text-white p-3 text-center my-5">
                               La imagen se subió correctamente
                           </p> 
                        )}

                        <div className="flex justify-center sm:justify-start mt-6">
                            <label className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor" htmlFor="imagen">Imagen del consultorio: </label>
                            <FileUploader
                                accept="image/*"
                                //accept=".svg"
                                id="imagenConsultorio"
                                className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                name="imagenConsultorio"
                                randomizeFilename
                                storageRef={firebase.storage.ref("perfil")}
                                onUploadStart={handleUploadStart2}
                                onUploadError={handleUploadError2}
                                onUploadSuccess={handleUploadSuccess2}
                                onProgress={handleProgress2}
                            />
                        </div>

                        {subiendo2 && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progreso}%`}}>
                                    {progreso2} %
                                </div>
                            </div>
                        )}

                        {urlimagen2 && (
                           <p className="bg-green-500 text-white p-3 text-center my-5">
                               La imagen se subió correctamente
                           </p> 
                        )}

                        <div className="flex justify-center sm:justify-start mt-10">

                            <label className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Cédula Profesional: </label>
                            <input 
                                type="text" placeholder="Cédula Profesional" 
                                className="w-11/12 sm:w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="cedula"
                                value={formik.values.cedula}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="flex justify-center sm:justify-start mt-10">

                            <label className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Teléfono: </label>
                            <input 
                                type="text" placeholder="Teléfono" 
                                className="w-11/12 sm:w-8/12 shadow appearance-none border-2 py-2 px-3"
                                id="telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="flex justify-center sm:justify-start mt-6">
                            <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Dirección: </label>
                            <textarea
                                id="direccion"
                                className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                placeholder="Dirección"
                                value={formik.values.direccion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>
                        
                    </form>
                </div>

                <div className="flex pb-10 justify-center sm:hidden">
                        <button
                            className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={formik.handleSubmit}
                            type="submit"
                        >
                        Guardar</button>
                    </div>
            </div>
        </div>
     );
}
 
export default ActualizarPerfil;