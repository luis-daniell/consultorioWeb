import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import Imagen from './components/ui/Imagen';

//Funcion para pbtener el access Token



const styles = StyleSheet.create({
  
  title: {
    fontSize: 24,
    textAlign: 'center'
  },

  image: {
    height: 120,
    width: 120,
    marginVertical: 30,
    marginHorizontal: 100,
  },
});


export function obtenerToken(accessToken) {

    //let accessToken;
    var gapi = window.gapi
    /* 
      Update with your own Client Id and Api key 
    */
    var CLIENT_ID = "529094084148-em988n3ck312m1g82k3ucm96vudp5ou2.apps.googleusercontent.com"
    var API_KEY = "AIzaSyC5rozZvL1yXtj51_ThlbCFOxAMqDiXcIY"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar"
  
    
  
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
            'summary': 'Acceso al calendario',
            'description': 'Se ha agregado este evento como prueba, lo puedes elimianr',
            'start': {
              'dateTime': '2020-11-27T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2020-11-27T09:15:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
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
            const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
            accessToken = token.access_token;
            //console.log(accessToken);
            
            //window.open(event.htmlLink)
          })
          
  

          

        })//FIN DE ONCLICK


        
      })

      //console.log(accessToken);
      return accessToken;     
      //console.log(accessToken);
    //console.log(accessToken);
    //return accessToken;
}



export function PdfDocument(props) {
  console.log("pdf props", props.data.consultorioLogo);
 // const data = nombre;
  //const img = props.data.consultorioLogo;
  const img ="https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg";
  const metodo = 'GET';
 
//Se configuro en google cloud
 
  return (

    <Document>
      <Page size="A4" wrap >
          <Text style={styles.title}>{props.data.nombreConsultorio}</Text>
          <Image style={styles.image} src={{ uri: img, method: metodo, headers: {'Access-Control-Allow-Origin:' :'*'}, body: '' }} />
          
      </Page>
    </Document>



    /*
    <Document>
      <Page >
        {data
          ? data.map((a, index) => {
              return (
                <View key={index} >
                  
                  <View >
                    <Text >{data}</Text>
                     
                     
                  </View>
                </View>
              );
            })
          : ""}
      </Page>
    </Document>*/
  );


  
  
}