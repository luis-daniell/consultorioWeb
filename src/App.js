import React from 'react';
import { Login } from "./login/login";
import { Cuenta } from "./login/crearcuenta";
import { Dashboard } from "./components/paginas/Dashboard";
import { Estadisticas } from "./components/paginas/Estadisticas";
import {Recetas} from "./components/paginas/Recetas";
import {Perfil} from "./components/paginas/Perfil";
import  {Citas}  from './components/paginas/Citas';
import {Expediente} from "./components/paginas/Expediente";
import {Historial} from './components/paginas/Historial';



import NuevoExpediente from "./components/subcomponents/NuevoExpediente";


import PrivateRoute from "./login/private.route";
import { AuthProvider } from "./components/ui/Auth";
import { Route, Switch } from "react-router-dom";

import firebase, { FirebaseContext } from "./firebase";



const App = () => {
  return ( 

    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >

      <AuthProvider>
        <Switch>
          
              <Route exact path="/" component={Login} />
              <Route exact path="/registrar" component={Cuenta} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/estadisticas" component={Estadisticas} />
              <PrivateRoute exact path="/recetas" component={Recetas} />
              <PrivateRoute exact path="/perfil" component={Perfil} />              
              <PrivateRoute exact path="/citas" component={Citas}/>
              <PrivateRoute exact path="/expediente" component={Expediente} />
              <PrivateRoute exact path="/historial" component={Historial}/> 

              <PrivateRoute exact path="/nuevo-expediente" component={NuevoExpediente}/> 


        </Switch>
      </AuthProvider>
    </FirebaseContext.Provider>
   );
}
 
export default App;

/*import React from 'react';
import {Router, Route} from 'react-router';
import firebase, {FirebaseContext} from './firebase';
import Login from './components/login';
import Tablero from './components/tablero';

<Route path="*" component={() => "404 NOT FOUND"} />
function App() {




    return(
    <FirebaseContext.Provider
    value={{
        firebase
      }}
    >
        <Router>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/tablero" element={<Tablero/>}/>

        </Router>

    </FirebaseContext.Provider>
);  
}

export default App;
*/