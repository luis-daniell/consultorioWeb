import React from 'react';

//Funcion para pbtener el access Token
export function obtenerToken() {

    let accessToken= '';
    var gapi = window.gapi
    /* 
      Update with your own Client Id and Api key 
    */
    var CLIENT_ID = "529094084148-em988n3ck312m1g82k3ucm96vudp5ou2.apps.googleusercontent.com"
    var API_KEY = "AIzaSyC5rozZvL1yXtj51_ThlbCFOxAMqDiXcIY"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar"
  
    const handleClick = () => {
  
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
            console.log(accessToken);
  
            //window.open(event.htmlLink)
          })
          
  
          /*
              Uncomment the following block to get events
          */
          /*
          // get events
            gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events);
            window.location.href = `https://calendar.google.com/calendar/u/${events[0].creator.email}`;
            
          })*/
          
          //window.location.href = 'https://calendar.google.com/calendar/';
          //gapi.auth2.window.location.href = 'https://calendar.google.com/calendar/';
  
        })//FIN DE ONCLICK
  
        
  
       
      })
  
      
    }
    handleClick();


    return accessToken;
}