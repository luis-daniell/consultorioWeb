import React, {useContext} from 'react';
import {FirebaseContext} from '../../firebase/Auth';
import {useHistory} from "react-router-dom";
import recetaPaciente from '../../img/recetaPaciente.svg';
import doc from '../../img/doc.svg';
import delet from '../../img/delet.svg';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);



const RecetasMostrar = ({receta}) => {


    const {firebase} = useContext(FirebaseContext);

    const history = useHistory();


//console.log(receta);
    const {id, nombrePaciente, telefonoPaciente} = receta;


    const abrirPaginaVisualizar = (id) => {
        history.push({

            pathname: "/imprimir-receta",
            state: { detail: receta }

        });

    }

    const eliminar = (id) => {

        MySwal.fire({
            title: '¿Estas seguro que desea eliminar?',
            text: "No se podrá recuperar el archivo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                firebase.db.collection('recetas').doc(id).delete();
              Swal.fire(
                'Eliminado!',
                'La receta ha sido eliminada',
                'success'
              )
              

            }
          })
        
    }

    return ( 
        <div className="flex content-center items-center justify-items-center justify-center">

            <div className="w-2/12 sm:w-1/12 md:w-1/12 lg:w-1/12 h-12 flex items-center justify-items-center justify-center border-b-2 border-r-2 border-gray-500">
                <img src={recetaPaciente} width="25" alt="recetaPaciente"/>
            </div>

            <div className="pl-1 w-4/12 sm:w-4/12 md:w-3/12 lg:w-2/12 h-12 flex items-center border-b-2 border-gray-500 justify-center">
                <p className="text-tercerColor">{nombrePaciente}</p>
            </div>


            <div className="hidden content-center align-middle sm:flex sm:w-3/12 md:w-3/12 sm:border-b-2 sm:border-gray-500 sm:h-12 lg:w-3/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500 lg:justify-center">
                <p className="text-tercerColor">{telefonoPaciente}</p>
            </div>


            <div className="hidden sm:flex sm:2/12 lg:w-1/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500 lg:justify-items-center lg:justify-around">
                
            </div>




            <div className="w-2/12 sm:w-1/12 lg:w-1/12 h-12 flex items-center border-b-2 border-gray-500 justify-items-center justify-around cursor-pointer"
                onClick={() => abrirPaginaVisualizar(id)} 
            >
                <img src={doc} width="25" alt="documento"/>
            </div>

            <div className="w-2/12 sm:w-1/12 lg:w-1/12 h-12 flex items-center border-b-2 border-gray-500 justify-items-center justify-around cursor-pointer"
                onClick={() => eliminar(id)} 
            >
                <img src={delet} width="25" alt="Eliminar"/>
            </div>





            <div 
                className="hidden md:flex md:w-1/12 md:border-b-2 md:h-12 md:border-r-2 md:border-gray-500 lg:w-1/12 lg:h-12 lg:flex lg:items-center lg:justify-center lg:border-b-2 lg:border-r-2 lg:border-gray-500"
                //onClick={() => abrirPagina(id)} 
            >
                
            </div>

            <div className="hidden sm:flex sm:w-1/12 sm:h-12 sm:border-gray-500 sm:border-b-2 lg:w-1/12 lg:h-12 lg:flex lg:items-center lg:border-b-2 lg:border-gray-500">
                
            </div>


            




        </div>
    );
}
 
export default RecetasMostrar;