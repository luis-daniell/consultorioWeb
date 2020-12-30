import React, {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {FirebaseContext} from '../../firebase/Auth';
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";
import paciente from '../../img/paciente.svg';
import recetaDoc from '../../img/recetaDoc.svg';
import cita from '../../img/cita.svg';
import perfil from '../../img/perfil.svg';


export const Dashboard = props => {

  const history = useHistory();
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

  const abrirPerfil = () => {
    history.push("/perfil");
  }

  return (

    <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right h-screen">
                <Barra/>

                <div className=" flex justify-items-center items-center justify-center">
                  <div className="w-8/12 flex justify-start sm:w-10/12 lg:w-11/12 xl:w-11/12">
                    <p className="font-source content-center text-xl sm:text-2xl font-bold lg:pl-8 xl:pl-10 pt-6">Dashboard</p>
                  </div>
                </div>
                
                
                <div className="flex justify-center items-center justify-items-center">
                  <div className="w-8/12 flex justify-start lg:w-11/12 sm:w-10/12 xl:w-11/12">
                    <p className="sm:pl-0 font-source font-bold text-sm content-center lg:text-2xl lg:font-bold lg:pl-8 pt-6 xl:pl-10">Bienvenido {currentUser.displayName}</p>
                  </div>
                </div>
               
                <div className="flex justify-center ">

                    <div className="w-8/12 mt-10 pb-20 lg:flex lg:flex-wrap sm:flex-wrap sm:flex sm:w-10/12 md:w-10/12">

                      <div className="bg-tercerColor sm:w-5/12 lg:w-3/12 md:w-4/12 h-24 rounded-lg flex justify-center items-center justify-items-center sm:flex-wrap">

                        <div className="w-6/12 sm:w-5/12">

                          <div className="flex justify-end">
                            <p className="font-source text-4xl font-bold text-white">{docExpedientes === 0 ? null : docExpedientes}</p>
                          </div>
                          <div className="flex justify-end">

                            <p className="font-source text-lg text-white">{docExpedientes === 0 ? 'Sin datos' : 'Pacientes'}</p>
                          </div>

                        </div>

                        <div className="flex justify-start ml-6 w-5/12">
                          <img src={paciente} width="70" height="70" alt="paciente"/>
                        </div>
                        
                      </div>

                      <div className="bg-cuartoColor mt-3 sm:ml-3 sm:mt-0 sm:w-5/12 lg:mt-0 lg:w-3/12 md:w-4/12 h-24 rounded-lg lg:ml-3 flex justify-center items-center justify-items-center">

                        <div className="w-6/12 sm:w-5/12">
                          <div className="flex justify-end">
                            <p className="font-source text-4xl font-bold text-white">{docCitas === 0 ? null : docCitas}</p>
                          </div>

                          <div className="flex justify-end">
                            <p className="font-source text-lg text-white">{docCitas === 0 ? 'Sin datos' : 'Citas'}</p>
                          </div>
                        </div>

                        <div className="justify-start w-5/12 flex ml-6">
                          <img src={cita} width="70" height="70" alt="cita" />
                        </div>

                      </div>


                      <div className="bg-segundoColor hover:bg-tercerColor cursor-pointer mt-3 sm:w-5/12 lg:mt-0 lg:w-3/12 md:w-4/12 h-24 rounded-lg lg:ml-3 flex justify-center items-center justify-items-center" onClick={() => abrirPerfil()}>
                        
                        <div className="w-6/12 sm:w-5/12">
                          <div className="flex justify-end">
                            <p className="font-source text-lg text-black">Perfil</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-start w-5/12 ml-6">
                          <img src={perfil} width="70"  alt="perfil"/>
                        </div>

                      </div>

                      <div className="bg-primeroColor sm:ml-3 sm:w-5/12 lg:w-3/12 lg:ml-0 md:w-4/12 xl:ml-0 h-24 rounded-lg border-black border-2 mt-3 flex justify-center items-center justify-items-center">
                        
                        <div className="w-6/12 sm:w-5/12">
                          
                          <div className="flex justify-end">
                            <p className="font-source text-4xl font-bold text-black">{docRecetas === 0 ? null : docRecetas}</p>
                          </div>
  
                          <div className="flex justify-end">
                            <p className="font-source text-lg text-black">{docRecetas === 0 ? 'Sin datos' : 'Recetas'}</p>
                          </div>
  
                        </div>


                        <div className="flex justify-start w-5/12 ml-6">
                          <img src={recetaDoc} width="70" height="70" alt="receta"/>
                        </div>

                      </div>

                    </div>
                </div>
            </div>
        </div>
  );
};
