import React from "react";
import {useFormik} from 'formik';
import firebase from '../firebase';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import user from '../img/user.svg'
import candado from '../img/candado.svg'
import userlog from '../img/userlog.svg'

const MySwal = withReactContent(Swal);
export const Login = props => {

  //auth.authenticated = false;

  const formik = useFormik({
    initialValues: {
        correo: '',
        password: '', 
    },

    validationSchema: Yup.object({
      correo: Yup.string()
                .email("Correo Electronico invalido"),
      password: Yup.string()
                .min(5, 'Minimo 5 caracteres'),
    }),

    onSubmit: values => {
      try {
        iniciarSesion(values.correo, values.password);
      } catch (error) {
        console.log(error);
      }
        
    }
  });


  async function iniciarSesion(email, password) {
    try {
      await firebase.login(email, password);
      props.history.push("/dashboard");
      
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario ', error.message);
      //alert("Correo o contraseña incorrecta");
      MySwal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Usuario o contraseña incorrectos',
    })
    }
  }

  return (

    
    <div className="h-screen overflow-hidden flex items-center justify-center bg-cuartoColor ">


      <div className="bg-white shadow-2xl rounded-extra px-12 pb-8 mb-4 flex flex-col sm:w-6/12  md:w-5/12 lg:w-4/12 xl:w-3/12 xl:px-12">

        <div className="-mt-16 flex content-center items-center justify-center">
          <img src={userlog} className="w-32" alt="Usuario"/>
        </div>


        <div className="flex items-center justify-center mt-8">
          <h1 className="font-bold text-lg font-source">Iniciar Sesión</h1>
        </div>


        <div className="border-tercerColor border-2">
        </div>

        <form 
          onSubmit={formik.handleSubmit}
          className=""
        >
          <div className=" mt-4 flex w-full border-2 shadow appearance-none border-red rounded-full text-grey-darker">
                        
            <div className="hidden sm:pl-2 sm:flex sm:content-center">
              <img src={user} width="20" height="20" className="" alt="Imagen Usuario"/>
            </div>
                           
              <input
              required 
              id="correo"
              name="correo"
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="Email" 
              placeholder="Correo Electrónico" 
              className="text-sm w-full py-2 px-3 focus:outline-none focus:bg-white rounded-r-full rounded-l-full lg:rounded-r-full"/>

          </div>

          {formik.touched.correo && formik.errors.correo ? (
            <div className="bg-red-100 border-l-4 text-red-700" role="alert">
              <p>{formik.errors.correo}</p>
            </div>
          ): null}


          <div className="mt-6 flex w-full border-2 shadow appearance-none border-red rounded-full text-grey-darker"> 

            <div className="hidden sm:pl-2 sm:flex sm:content-center">
              <img src={candado} width="20" height="20" className="" alt="contraseña"/>
            </div>
                          
            <input
              required
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="Password" 
              placeholder="Contraseña" 
              className="text-sm w-full py-2 px-3 focus:outline-none focus:bg-white rounded-r-full rounded-l-full lg:rounded-r-full"/>

            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 " role="alert">
                <p>{formik.errors.password}</p>
              </div>
            ): null}

            <div className="flex items-center justify-center pt-6">

              <button
                type="submit"
                className=" bg-tercerColor focus:outline-none text-base hover:bg-blue-dark text-white py-2 px-4 rounded cursor-pointer"       
              >Iniciar Sesión</button>
                          
            </div>

            <div className="flex items-center justify-center pb-4 text-blue-700 pt-6">
              <Link className="" to="/registrar">Crear cuenta</Link>
            </div>

        </form>
      </div>
    </div>
  );
};
