import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';


class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }  

        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    //Inicia sesion del usuario

    async login(correo, password){

        
        return this.auth.signInWithEmailAndPassword(correo, password);
        
    }

    // Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        return await nuevoUsuario.user.updateProfile({
           displayName : nombre
        })
    }



    //Cerrar Sesion de usuario
    async cerrarSesion(){
        return await this.auth.signOut();
    }
    


}

const firebase = new Firebase();
export default firebase;