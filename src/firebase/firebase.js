import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';


class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }  

        this.auth = app.auth();
    }

    //Inicia sesion del usuario

    async login(correo, password){

        
        return this.auth.signInWithEmailAndPassword(correo, password);
        
    }

    // Registra un usuario
    async registrar(nombre, email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);

        //return await nuevoUsuario.user.updateProfile({
          //  displayName : nombre
        //})
    }



    //Cerrar Sesion de usuario
    async cerrarSesion(){
        return await this.auth.signOut();
    }
    


}

const firebase = new Firebase();
export default firebase;