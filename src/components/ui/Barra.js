import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { FirebaseContext } from "../../firebase/Auth";
import usuarioPerfil from '../../img/usuarioPerfil.svg';



  


const Barra = () => {

    const history = useHistory();


    const [imagen, guardarImagen] = useState('');
    const {currentUser, firebase} = useContext(FirebaseContext);




    let imagenPerfil = usuarioPerfil;



    useEffect(() => {  
        const obtenerPerfil = async () => {
            const perfilQ = await firebase.db.collection('usuarios').doc(currentUser.uid);
            const perfil = await perfilQ.get();
            if(perfil.exists) {
               guardarImagen(perfil.data().imagenDoctor);

               //guardarConsultarDB(false);
            } else {
                console.log("No existe");
            }
        }
        obtenerPerfil();
    
    }, [firebase, currentUser]);



    if(imagen === ''){
        imagenPerfil = usuarioPerfil;

    }else{
        imagenPerfil= imagen;
    }



        const [open, setOpen] = React.useState(false);

        const handleClick = () => {
            setOpen((prev) => !prev);
        };

        const handleClickAway = () => {
            setOpen(false);
        };


        const cerrarSesion = () => {

            firebase.cerrarSesion();
            history.push("/");

        }


    return ( 

        <div className="bg-white h-12 flex justify-items-center items-center">
           
           <ClickAwayListener onClickAway={handleClickAway}>


                <div className="w-11/12">
                        

                    <div className="flex justify-end items-center">


                        <div className="flex mr-4">
                            <p className="font-source font-bold text-xs">{currentUser.displayName}</p>
                        </div>
                        
                        
                        

                        <a href="# " id="menu-btn" onClick={handleClick}><img src={imagenPerfil} width="30" alt="Imagen de perfil"/></a>
                    

                    


                        {open ? (


                            <div id="dropdown" className="flex bg-white flex-col absolute rounded mt-32 p-2 text-sm w-32 border-black border-2">
                                <a href="# " className="px-2 py-1 hover:bg-segundoColor rounded">Configuración</a>
                                <a href="# " className="px-2 py-1 hover:bg-segundoColor rounded" onClick={()=> cerrarSesion()}>Cerrar Sesión</a>
                            </div>




                        ) : null}

                    </div>
                </div>



            </ClickAwayListener>
        </div>
     );
}
 
export default Barra;

/***
 * 
 * 
 * 
 * 
 * 
 * <button
          className=" bg-green-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
              
          }}
        >Logout</button>

         <img src={imagenPerfil} width="30"/>
                
                <select name="select">
                    
                    <option value="value1">Value 1</option> 
                    <option value="value2" selected>Value 2</option>
                    <option value="value3">Value 3</option>
                </select>

                componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);



  }















  <div className="flex ">

            <ul>
                <li>
                    

                    {estado 
                    ?
                    
                    :null}
                    
                </li>
            </ul>
               
                
            </div>










 */