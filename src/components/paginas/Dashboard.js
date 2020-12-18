import React, {useContext, useState, useEffect} from "react";
import {FirebaseContext} from '../../firebase/Auth';
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";
import paciente from '../../img/paciente.svg';
import recetaDoc from '../../img/recetaDoc.svg';
import cita from '../../img/cita.svg';
import perfil from '../../img/perfil.svg';




export const Dashboard = props => {


  const {currentUser} = useContext(FirebaseContext);

  //Documentos en expedientes

  const [docExpedientes, guardarDocExpedientes] = useState(0);

  const [docRecetas, guardarDocRecetas] = useState(0);

  const [docCitas, guardarDocCitas] = useState(0);




  const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
      const obtenerExpedientes =  () => {
        
          firebase.db.collection('expedientes').get().then(snap => {
            const size = snap.size // will return the collection size
            guardarDocExpedientes(size);

          });
        }



      const obtenerCitas =  () => {
        firebase.db.collection('citas').get().then(snap => {
          const size = snap.size // will return the collection size
          guardarDocCitas(size);
        });
      }



    const obtenerRecetas =  () => {
        
      firebase.db.collection('recetas').get().then(snap => {
        const size = snap.size // will return the collection size
        guardarDocRecetas(size);

    });
      
  }

      obtenerExpedientes();
      obtenerCitas();
      obtenerRecetas();

    },[firebase]);


  return (

    <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className=" flex justify-items-center items-center justify-center">
                  <div className="w-8/12 flex justify-start sm:w-10/12 lg:w-11/12 xl:w-11/12">
                    <p className="font-source content-center text-2xl font-bold lg:pl-8 xl:pl-10 pt-6">Dashboard</p>
                  </div>
                </div>
                
                
                <div className="flex justify-center items-center justify-items-center">
                  <div className="w-8/12 flex justify-start lg:w-11/12 sm:w-10/12 xl:w-11/12">
                    <p className="sm:pl-0 font-source font-bold text-sm content-center lg:text-2xl lg:font-bold lg:pl-8 pt-6 xl:pl-10">Bienvenido {currentUser.displayName}</p>
                  </div>
                </div>
               
                <div className="flex justify-center ">

                    <div className="lg:bg-white w-8/12 mt-10 pb-20 lg:flex lg:flex-wrap sm:flex-wrap sm:flex sm:w-10/12 md:w-10/12">

                      <div className="bg-tercerColor sm:w-5/12 lg:w-3/12 md:w-4/12 h-24 rounded-lg flex justify-center items-center justify-items-center sm:flex-wrap">

                        <div className="">
                          <div className="flex justify-end">
                            <p className="font-source text-4xl font-bold text-white">{docExpedientes}</p>
                          </div>

                          <div>
                            <p className="font-source text-lg text-white">Pacientes</p>
                          </div>
                        </div>

                        <div className="flex justify-end ml-6">
                          <img src={paciente} width="70" height="70" alt="paciente"/>
                        </div>
                        
                      </div>


                      <div className="bg-cuartoColor mt-3 sm:ml-3 sm:mt-0 sm:w-5/12 lg:mt-0 lg:w-3/12 md:w-4/12 h-24 rounded-lg lg:ml-3 flex justify-center items-center justify-items-center">

                        <div className="">
                          <div className="flex justify-end">
                            <p className="font-source text-4xl font-bold text-white">{docCitas}</p>
                          </div>

                          <div>
                            <p className="font-source text-lg text-white">Citas</p>
                          </div>
                        </div>

                        <div className="flex justify-end ml-6">
                          <img src={cita} width="70" height="70" alt="cita" />
                        </div>

                      </div>


                      <div className="bg-segundoColor mt-3 sm:w-5/12 lg:mt-0 lg:w-3/12 md:w-4/12 h-24 rounded-lg lg:ml-3 flex justify-center items-center justify-items-center">
                        <div className="">
                          <div>
                            <p className="font-source text-lg text-black">Perfil</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end ml-6">
                          <img src={perfil} width="70" height="70" alt="perfil"/>
                        </div>

                      </div>

                      <div className="bg-primeroColor sm:ml-3 sm:w-5/12 lg:w-3/12 lg:ml-0 md:w-4/12 xl:ml-0 h-24 rounded-lg border-black border-2 mt-3 flex justify-center items-center justify-items-center">
                        
                        <div className="">
                          
                          <div className="flex justify-end">
                            <p className="font-source text-4xl font-bold text-black">{docRecetas}</p>
                          </div>
  
                          <div>
                            <p className="font-source text-lg text-black">Recetas</p>
                          </div>
  
                        </div>


                        <div className="flex justify-end ml-6">
                          <img src={recetaDoc} width="70" height="70" alt="receta"/>
                        </div>

                      </div>

                    </div>
                </div>
            </div>
        </div>
  );
};

/*
<div>
        <h1>App Layout</h1>
        <button
          className=" bg-green-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            auth.logout(() => {
              props.history.push("/");
            });
          }}
        >
          Logout
        </button>
      </div>

      <div className="">
      <Sidebar/>
      <div className="bg-colorFondo w-4/5 box-border left-auto float-right">
        <h2>Bienvenido {currentUser.displayName}</h2>
      </div>
    </div>
*/
