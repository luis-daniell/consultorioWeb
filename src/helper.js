import React from 'react';
import {NavLink} from 'react-router-dom';
import usuario from '../src/img/usuario.svg';
import estadistica from '../src/img/estadistica.svg';
import calendario from '../src/img/calendario.svg';
import expediente from '../src/img/expediente.svg';
import historial from '../src/img/historial.svg';
import tablero from '../src/img/tablero.svg';
import receta from '../src/img/receta.svg';


export function agregarEvento (nombre, apellidos, correo, fecha, hora, descripcion ){

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
          //console.log(event)
        gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
          //console.log(token);
          
        })
      })//FIN DE ONCLICK
    })
}

export function obtenerDatosCitas(citas, titulo){
    let enero = 0;
    let febrero = 0;
    let marzo = 0;
    let abril = 0;
    let mayo = 0;
    let junio = 0;
    let julio = 0;
    let agosto = 0;
    let septiembre = 0;
    let octubre = 0;
    let noviembre = 0;
    let diciembre = 0;

    citas.forEach(logArrayElements);
    

    function logArrayElements(element, index, array) {

        if(element.mesCita === "01"){
            enero = enero + 1;

        }else if(element.mesCita === "02"){
            febrero = febrero + 1;

        }else if(element.mesCita === "03"){
            marzo = marzo + 1;

        }else if(element.mesCita === "04"){
            abril = abril + 1;

        }else if(element.mesCita === "05"){
            mayo = mayo + 1;

        }else if(element.mesCita === "06"){
            junio = junio + 1;

        }else if(element.mesCita === "07"){
            julio = julio + 1;

        }else if(element.mesCita === "08"){
            agosto = agosto + 1;

        }else if(element.mesCita === "09"){
            septiembre = septiembre + 1;

        }else if(element.mesCita === "10"){
            octubre = octubre + 1;

        }else if(element.mesCita === "11"){
            noviembre = noviembre + 1;

        }else{
            diciembre = diciembre + 1;
        }

    }

    const meses = [{
        mes: 'Enero',
        cantidad: enero
        },{
        mes: 'Febrero',
        cantidad: febrero
        }, {
        mes: 'Marzo',
        cantidad: marzo
        },
        {
        mes: 'Abril',
        cantidad: abril
        },
        {
        mes: 'Mayo',
        cantidad: mayo
        }, {
        mes: 'Junio',
        cantidad: junio
        }, {
        mes: 'Julio',
        cantidad: julio
        }, {
        mes: 'Agosto',
        cantidad: agosto
        }, {
        mes: 'Septiembre',
        cantidad: septiembre
        }, {
        mes: 'Octubre',
        cantidad: octubre
        }, {
        mes: 'Noviembre',
        cantidad: noviembre
        }, {
        mes: 'Diciembre',
        cantidad: diciembre
        }
    ];

   // console.log(meses);
    const returnedArray = [[titulo, '']];
    for(let i=0; i<meses.length; i++) {
        if(meses[i].cantidad >= 1){
            returnedArray[i+1] = [meses[i].mes, meses[i].cantidad];
        }
    } 

    var filtered = returnedArray.filter(function (el) {
        return el != null;
    });

    return filtered;
}

export function obtenerDatosExpedientes(expedientes, titulo){
        let enero = 0;
        let febrero = 0;
        let marzo = 0;
        let abril = 0;
        let mayo = 0;
        let junio = 0;
        let julio = 0;
        let agosto = 0;
        let septiembre = 0;
        let octubre = 0;
        let noviembre = 0;
        let diciembre = 0;
    //console.log(expedientes);

    expedientes.forEach(logArrayElements);
    

    function logArrayElements(element, index, array) {

      
        if(element.mesExpediente === "01"){
            enero = enero + 1;

        }else if(element.mesExpediente === "02"){
            febrero = febrero + 1;

        }else if(element.mesExpediente === "03"){
            marzo = marzo + 1;

        }else if(element.mesExpediente === "04"){
            abril = abril + 1;

        }else if(element.mesExpediente === "05"){
            mayo = mayo + 1;

        }else if(element.mesExpediente === "06"){
            junio = junio + 1;

        }else if(element.mesExpediente === "07"){
            julio = julio + 1;

        }else if(element.mesExpediente === "08"){
            agosto = agosto + 1;

        }else if(element.mesExpediente === "09"){
            septiembre = septiembre + 1;

        }else if(element.mesExpediente === "10"){
            octubre = octubre + 1;

        }else if(element.mesExpediente === "11"){
            noviembre = noviembre + 1;

        }else{
            diciembre = diciembre + 1;
        }
    }

    const meses = [{
        mes: 'Enero',
        cantidad: enero
        },{
        mes: 'Febrero',
        cantidad: febrero
        }, {
        mes: 'Marzo',
        cantidad: marzo
        },
        {
        mes: 'Abril',
        cantidad: abril
        },
        {
        mes: 'Mayo',
        cantidad: mayo
        }, {
        mes: 'Junio',
        cantidad: junio
        }, {
        mes: 'Julio',
        cantidad: julio
        }, {
        mes: 'Agosto',
        cantidad: agosto
        }, {
        mes: 'Septiembre',
        cantidad: septiembre
        }, {
        mes: 'Octubre',
        cantidad: octubre
        }, {
        mes: 'Noviembre',
        cantidad: noviembre
        }, {
        mes: 'Diciembre',
        cantidad: diciembre
        }
    ];

    const returnedArray = [[titulo, '']];
    for(let i=0; i<meses.length; i++) {

        if(meses[i].cantidad >= 1){
            returnedArray[i+1] = [meses[i].mes, meses[i].cantidad];
        }
            
    } 
    var filtered = returnedArray.filter(function (el) {
        return el != null;
      });

      return filtered;
}

export function obtenerDatosRecetas(recetas, titulo){
  let enero = 0;
        let febrero = 0;
        let marzo = 0;
        let abril = 0;
        let mayo = 0;
        let junio = 0;
        let julio = 0;
        let agosto = 0;
        let septiembre = 0;
        let octubre = 0;
        let noviembre = 0;
        let diciembre = 0;
    //console.log(recetas);

    recetas.forEach(logArrayElements);

    function logArrayElements(element, index, array) {

        if(element.mesReceta === "01"){
            enero = enero + 1;

        }else if(element.mesReceta === "02"){
            febrero = febrero + 1;

        }else if(element.mesReceta === "03"){
            marzo = marzo + 1;

        }else if(element.mesReceta === "04"){
            abril = abril + 1;

        }else if(element.mesReceta === "05"){
            mayo = mayo + 1;

        }else if(element.mesReceta === "06"){
            junio = junio + 1;

        }else if(element.mesReceta === "07"){
            julio = julio + 1;

        }else if(element.mesReceta === "08"){
            agosto = agosto + 1;

        }else if(element.mesReceta === "09"){
            septiembre = septiembre + 1;

        }else if(element.mesReceta === "10"){
            octubre = octubre + 1;

        }else if(element.mesReceta === "11"){
            noviembre = noviembre + 1;

        }else{
            diciembre = diciembre + 1;
        }
    }

    const meses = [{
        mes: 'Enero',
        cantidad: enero
        },{
        mes: 'Febrero',
        cantidad: febrero
        }, {
        mes: 'Marzo',
        cantidad: marzo
        },
        {
        mes: 'Abril',
        cantidad: abril
        },
        {
        mes: 'Mayo',
        cantidad: mayo
        }, {
        mes: 'Junio',
        cantidad: junio
        }, {
        mes: 'Julio',
        cantidad: julio
        }, {
        mes: 'Agosto',
        cantidad: agosto
        }, {
        mes: 'Septiembre',
        cantidad: septiembre
        }, {
        mes: 'Octubre',
        cantidad: octubre
        }, {
        mes: 'Noviembre',
        cantidad: noviembre
        }, {
        mes: 'Diciembre',
        cantidad: diciembre
        }
    ];

    const returnedArray = [[titulo, '']];
    for(let i=0; i<meses.length; i++) {

        if(meses[i].cantidad >= 1){
            returnedArray[i+1] = [meses[i].mes, meses[i].cantidad];
        }    
    } 
    var filtered = returnedArray.filter(function (el) {
        return el != null;
      });
      return filtered;
}


export function obtenerDiagnosticoExpedientes(expedientes, titulo){
 
  const returnedArray = [[titulo, '']];  
  const arreglo = [];
  expedientes.forEach(logArrayElements);
    
    function logArrayElements(element, index, array) {
      arreglo.push(element.diagnostico);
    }
    
    var repetidos = {};

    arreglo.forEach(function(numero){
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    const llaves = Object.keys(repetidos);
    const valores = Object.values(repetidos);

    for(let i=0; i<llaves.length; i++) {
      returnedArray[i+1] = [llaves[i], valores[i]];
    }

    return returnedArray;
}

export const Ssidebar = ({imagenPerfil}) =>{

    return(
    <div className="w-full pt-3 bg-gray-900">


        <div className="w-full pt-2 pb-2 flex flex-col bg-gray-900">
            <div className="w-full flex justify-start items-center pl-5">
                <img src={imagenPerfil} width="50" alt="Imagen de perfil" className="bg-white rounded-full"/>
            </div>
            <div className="w-9/12 flex pl-5 pt-2">
                <p className="uppercase text-white text-xl tracking-wide text-center font-bold font-source">Consultorio</p>
            </div>
        </div>
        

        <div className="bg-gray-800">
            <nav className="pl-4">
                    
                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg" activeClassName="text-yellow-500"  to="/dashboard">
                    
                    <div className="flex content-center">
                        <div className="flex content-center">
                            <img src={tablero} width="20" height="20" alt="tablero"/>
                        </div>

                        <div className="pl-6">
                            <span className="">Dashboard</span>
                        </div>
                            
                    </div>
                        
                </NavLink> 


                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg mt-8" activeClassName="text-yellow-500"  to="/estadisticas">
                       
                    <div className="flex content-center">
                        <div className="flex content-center">
                                <img src={estadistica} width="20" height="20" alt="estadisticas"/>
                        </div>

                        <div className="pl-6">
                            <span className="">Estadísticas</span>
                        </div>
                    </div>
                        
                </NavLink>

                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg mt-8" activeClassName="text-yellow-500"  to="/recetas">
                        
                    <div className="flex content-center">
                        <div className="flex content-center">
                            <img src={receta} width="20" height="20" alt="receta"/>
                        </div>

                        <div className="pl-6">
                            <span className="">Recetas</span>
                        </div>
                    </div>
                        
                </NavLink>

                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg mt-8" activeClassName="text-yellow-500"  to="/perfil">

                    <div className="flex content-center">
                        <div className="flex content-center">
                            <img src={usuario} width="20" height="20" alt="usuario"/>
                        </div>

                        <div className="pl-6">
                                <span className="">Perfil</span>
                        </div>
                    </div>
                        
                </NavLink>

                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg mt-8" activeClassName="text-yellow-500"  to="/citas">
                        
                    <div className="flex content-center">
                        <div className="flex content-center">
                            <img src={calendario} width="20" height="20" alt="calendario"/>
                        </div>
                        <div className="pl-6">
                            <span className="">Citas</span>
                        </div>
                    </div>
                        
                </NavLink>
                    
                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg mt-8" activeClassName="text-yellow-500"  to="/expediente">
                        
                    <div className="flex content-center">
                        <div className="flex content-center">
                            <img src={expediente} width="20" height="20" alt="expediente"/>
                        </div>
                        <div className="pl-6">
                            <span className="">Expediente</span>
                        </div>
                    </div>

                </NavLink>

                <NavLink className="p-1 text-white block hover:bg-tercerColor hover:text-gray-900 font-source font-bold text-lg mt-8" activeClassName="text-yellow-500"  to="/historial">
                        <div className="flex content-center">
                            <div className="flex content-center">
                                <img src={historial} width="20" height="20" alt="historial"/>
                            </div>
                            <div className="pl-6">
                                <span className="">Historial</span>
                            </div>
                        </div>
                </NavLink>

                </nav>
            </div>  
        </div> 
    );   
}