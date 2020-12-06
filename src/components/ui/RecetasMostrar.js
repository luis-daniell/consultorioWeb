import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../../firebase/Auth';
import {useHistory} from "react-router-dom";
import recetaPaciente from '../../img/recetaPaciente.svg';
import doc from '../../img/doc.svg';
import delet from '../../img/delet.svg';


const RecetasMostrar = ({receta}) => {


    const {firebase} = useContext(FirebaseContext);

    const history = useHistory();


//console.log(receta);
    const {id, nombrePaciente, telefonoPaciente, apellidosPaciente} = receta;






    const abrirPaginaVisualizar = (id) => {
        history.push({

            pathname: "/imprimir-receta",
            state: { detail: receta }

        });

    }

    const eliminar = (id) => {
        firebase.db.collection('recetas').doc(id).delete();
    }


    


    return ( 
        <div className="flex content-center items-center justify-items-center justify-center">

            <div className="w-1/12 h-12 flex items-center justify-items-center justify-center border-b-2 border-r-2 border-gray-500">
                <img src={recetaPaciente} width="25"/>
            </div>

            <div className="pl-1 w-2/12 h-12 flex items-center border-b-2 border-gray-500 justify-center">
                <p className="text-tercerColor">{nombrePaciente}</p>
            </div>


            <div className="w-3/12 h-12 flex items-center border-b-2 border-gray-500 justify-center">
                <p className="text-tercerColor">{telefonoPaciente}</p>
            </div>


            <div className="w-1/12 h-12 flex items-center border-b-2 border-gray-500 justify-items-center justify-around">
                
            </div>




            <div className="w-1/12 h-12 flex items-center border-b-2 border-gray-500 justify-items-center justify-around cursor-pointer"
                onClick={() => abrirPaginaVisualizar(id)} 
            >
                <img src={doc} width="25"/>
            </div>

            <div className="w-1/12 h-12 flex items-center border-b-2 border-gray-500 justify-items-center justify-around cursor-pointer"
                onClick={() => eliminar(id)} 
            >
                
                <img src={delet} width="25"/>
            </div>





            <div 
                className="w-1/12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-500"
                //onClick={() => abrirPagina(id)} 
            >
                
            </div>

            <div className="w-1/12 h-12 flex items-center border-b-2 border-gray-500">
                
            </div>


            




        </div>
    );
}
 
export default RecetasMostrar;