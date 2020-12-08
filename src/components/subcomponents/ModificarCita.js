import React, { useEffect, useState, useContext } from 'react';
import {useLocation, useHistory} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {FirebaseContext} from '../../firebase/Auth';
import {useFormik} from 'formik';
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';


const ModificarCita = () => {




    const location = useLocation();
    const history = useHistory();

    const {firebase} = useContext(FirebaseContext);


    const {nombre, apellido, fecha, hora, correo, descripcion, id} = location.state.detail;


    //console.log(location.state.detail);

    let nombre1 = nombre;
    let apellido1 = apellido;
    let descripcion1 = descripcion;
    let correo1 = correo;



    //Cambiar el valor de la fecha 
    const [dato, guardarDato] = useState('');

    //Cambia el valor a pospuesta, muestra calendario
    const [calendario, guardarCalendario] = useState(false);


    const valor = [
        {codigo: 'noatendida', nombre:'No atendida'},
        {codigo: 'atendida', nombre:'Atendida'},
        {codigo: 'pospuesta', nombre:'Pospuesta'}
    ]


    useEffect(() => {
        if(dato === 'pospuesta'){
            guardarCalendario(true);
            //console.log(dato);
            
        }else{
            guardarCalendario(false);
        }
        
    }, [dato]);




    const formik = useFormik({
        initialValues : {
            nombre: nombre1,
            apellido: apellido1,
            atendida: false,
            correo: correo1,
            descripcion: descripcion1,
            fecha: '',
            hora: '',

        },

        onSubmit: cita => {
            try {

                if(dato === 'pospuesta'){


                    firebase.db.collection('citas').add({
                        nombre: cita.nombre,
                        apellido: cita.apellido,
                        correo: cita.correo,
                        fecha: cita.fecha,
                        hora: cita.hora,
                        descripcion: cita.descripcion,
                        atendida: cita.atendida,
    
                    });

                    agregarEvento(cita.nombre, cita.apellido, cita.correo, cita.fecha, cita.hora, cita.descripcion);

                    history.push("/visualizar-citas");



                   
                  // console.log(dato);


                }else if (dato === 'atendida'){

                    firebase.db.collection('citas')
                    .doc(id)
                    .update({
                        atendida: true
                    })
                    history.push("/visualizar-citas");

                    //console.log(dato);
                }else{
                    history.push("/visualizar-citas");
                   //console.log(dato);
                }
                

                
                

            } catch (error) {
                console.log(error);
            }
        }

    });

    function agregarEvento (nombre, apellidos, correo, fecha, hora, descripcion ){

        console.log(nombre);
        console.log(apellidos);
        console.log(correo);
        console.log(fecha);
        console.log(hora);
        console.log(descripcion);

        
        var gapi = window.gapi
        
        //  Update with your own Client Id and Api key 
        
        var CLIENT_ID = "529094084148-em988n3ck312m1g82k3ucm96vudp5ou2.apps.googleusercontent.com"
        var API_KEY = "AIzaSyC5rozZvL1yXtj51_ThlbCFOxAMqDiXcIY"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar"
      
        //https://www.youtube.com/watch?v=zrLf4KMs71E
      
          gapi.load('client:auth2', () => {
            console.log('loaded client')
      
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
      
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
            
      
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              
              var event = {
                'summary': `Cita a: ${nombre} ${apellidos}`,
                'description': `${descripcion}`,
                'start': {
                  'dateTime': `${fecha}T${hora}:00-06:00`,
                  'timeZone': 'America/Mexico_City'
                },
                'end': {
                  'dateTime': `${fecha}T${hora}:00-06:00`,
                  'timeZone': 'America/Mexico_City'
                },
                'attendees': [
                  {'email': `${correo}`}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              }
              
              var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
              })
      
              request.execute(event => {
                console.log(event)
                const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
                console.log(token);
                
                //console.log(accessToken);
                
                //window.open(event.htmlLink)
              })
            })//FIN DE ONCLICK
          })
       
      }
    

    return ( 
            
    
    
        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
            <Barra/>

            <div className=" flex">

                <div className=" w-1/2 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Cita de paciente</p>
                </div>
                
                <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                    <button
                        className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        onClick={formik.handleSubmit}
                        type="submit"
                    >
                    Modificar</button>
                </div>
            </div>


            <div className="flex justify-center ">
                <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">


                    <div className="w-10/12">

                        <div className="bg-tercerColor border-1 border-black h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-3xl mt-6">
                            <p>{nombre +" " + apellido}</p>
                        </div>


                        <div className="bg-colorFondo flex content-center justify-center ">

                            <img src={usuarioPerfil} className="-mt-12" width="120" height="120" alt="UsuarioPerfil"/>
                            
                        </div>


                        <div className="bg-colorFondo pb-12 rounded-b-extra">
                                
                            <div className=" flex h-auto content-center justify-center items-center justify-items-center">
                                <div className="flex flex-col w-1/6">
                                    <p className="text-tercerColor text-2xl">Fecha</p>
                                    
                                </div>

                                <div className=" w-1/6 text-tercerColor text-2xl">
                                    <p>{fecha}</p>
                                </div>

                            
                            </div>   
                            



                            <div className=" flex h-auto content-center justify-center items-center justify-items-center pt-4">
                                <div className="flex flex-col w-1/6 h-auto">
                                    <p className="text-tercerColor text-2xl">Hora</p>
                                    
                                </div>

                                <div className="w-1/6 h-auto text-tercerColor text-2xl">
                                    <p>{hora}</p>
                                </div>

                            
                            </div>





                            <div className=" flex h-auto content-center justify-center items-center justify-items-center pt-4">
                                <div className="flex flex-col w-2/6 h-auto">

                                <select
                                    onChange={e => guardarDato(e.target.value)}
                                    value={dato}
                                >
                                    
                                    {valor.map(opcion => (
                                        <option key={uuidv4()} value={opcion.codigo}>{opcion.nombre}</option>
                                    ))}
                                </select>
                                    
                                </div>
                            </div>

                            { calendario ?
                            <div className="flex justify-items-center items-center justify-center">
                                <div className="w-3/6 flex mt-6 justify-items-center items-center justify-center">

                                    
                                    <input
                                        type="date"
                                        name="fecha"
                                        className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                        value={formik.values.fecha}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        
                                    
                                    />
        
                                </div>
    
    
                                <div className="w-3/6 flex mt-6 justify-items-center items-center justify-center">
        
                                    <input
                                        type="time"
                                        name="hora"
                                        className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                        value={formik.values.hora}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        
                                    />
                                </div>
                            </div>


                            : null
                            }









                        </div>

                    </div>



                </div>
            </div>




        </div>

    </div>
    
     );
}
 
export default ModificarCita;