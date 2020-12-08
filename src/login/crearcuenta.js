import React from 'react';
import {useFormik} from 'formik';
import firebase from '../firebase';
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";

export const Cuenta = () => {

   const history = useHistory();


    const formik = useFormik({
        initialValues: {
            nombre: '',
            correo: '',
            password: '', 
        },
    
        validationSchema: Yup.object({
          nombre: Yup.string()
                      .min(5, 'Minimo 5 caracteres'),
          correo: Yup.string()
                      .email("Correo Electronico invalido"),
    
          password: Yup.string()
                      .min(5, 'Minimo 5 caracteres'),
        }),
    
        onSubmit: values => {
            try {
              crearCuenta(values.nombre, values.correo, values.password);
             
              
             } catch (error) {
                 console.log(error);
             }
            
        }
    });


    async function crearCuenta(nombre, email, password) {
        try {
          await firebase.registrar(nombre, email, password);
          alert("Usuario Registrado");
          history.push("/");
        } catch (error) {
        
          console.error('Hubo un error al crear el usuario ', error.message);
        }
      }

    



    return ( 
    
    <div className="h-screen overflow-hidden flex items-center justify-center bg-cuartoColor">
        
          <div className="bg-white shadow-2xl rounded-extra h-login px-24 pt-6 pb-8 mb-4 flex flex-col  w-5/6 xl:w-1/3 sm:w-3/5 lg:w-2/5 md:w-1/2">
            
            <div className="flex items-center justify-center">
                <h1 className="font-bold text-3xl mb-4">Crear Cuenta</h1>
            </div>

            <form
              onSubmit={formik.handleSubmit} 
            >
                

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nombre</label>
                    <input
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3"
                        id="nombre"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Nombre" 
                    />
                </div>
                
                {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-5" role="alert">
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ): null}

    
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3"
                        id="correo"
                        name="correo"
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="Email" 
                        placeholder="Correo Electrónico" 
                    />
                </div>
                {formik.touched.correo && formik.errors.correo ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-5" role="alert">
                                <p>{formik.errors.correo}</p>
                            </div>
                        ): null}



                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="Password" 
                        placeholder="Contraseña" 
                    />
                </div>

                {formik.touched.password && formik.errors.password ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-5" role="alert">
                                <p>{formik.errors.password}</p>
                            </div>
                        ): null}

                <div className="flex items-center justify-center">
                    <button
                    type="submit"
                    className=" bg-tercerColor hover:bg-blue-dark text-white font-bold py-2 px-4 rounded cursor-pointer" 
                    >Crear Cuenta</button>
                </div>


            </form>
        </div>
      </div>
    );
};