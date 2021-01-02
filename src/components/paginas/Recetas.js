import React,{useState, useContext, useEffect} from 'react';
import {FirebaseContext} from '../../firebase/Auth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import RecetasMostrar from '../ui/RecetasMostrar';
import Barra from '../ui/Barra';
import Sidebar from "../ui/Sidebar";
import {useHistory} from "react-router-dom";
import lupa from '../../img/lupa.svg';

const MySwal = withReactContent(Swal);

export const Recetas = (props) => {

    const history = useHistory();

    

    const {firebase, currentUser} = useContext(FirebaseContext);
    const [recetas, guardarRecetas] = useState([]);
    const [existencia, guardarExistencia] = useState(false);
    const [docExpedientes, guardarDocExpedientes] = useState(0);


    useEffect(() => {
        const obtenerRecetas =  () => {
            firebase.db.collection('recetas').onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios            
        }
        const obtenerExpedientes =  () => {
        
            firebase.db.collection('expedientes').get().then(snap => {
            const size = snap.size // will return the collection size
            guardarDocExpedientes(size);
      
            });
          } 
        
        const obtenerPerfil = async () => {
            const perfilQ = await firebase.db.collection('usuarios').doc(currentUser.uid);
            const perfil = await perfilQ.get();
            if(perfil.exists) {
                guardarExistencia(true);
            } else {
                guardarExistencia(false);
            }
        }
        obtenerExpedientes();
        obtenerRecetas();
        obtenerPerfil();
    },[firebase, currentUser]);

    //Snapshop nos permite usar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const recetass = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });

        //Almacenar los resultados en el state
        guardarRecetas(recetass);
    }


    const [ busqueda, guardarBusqueda] = useState('');

    const buscarReceta = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // redireccionar a /buscar
        history.push({
            pathname: "/buscarReceta", 
            search:`?q=${busqueda}`,
            state: { detail: recetas }
        })
    }

    const redireccionar = () => {
        if(existencia){
            if (docExpedientes === 0){
                MySwal.fire('Necesitas tener expedientes')
            }else{
                history.push("/nueva-receta");
            }
            
        }else{
            MySwal.fire('Necesitas configurar tu perfil')
        }
        
        
    }

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className=" flex justify-center">

                    <div className="w-6/12 flex justify-start items-center">
                        <p className="font-source content-center text-lg lg:text-2xl font-bold pt-6">Recetas</p>
                    </div>
                    
                    <div className="w-5/12 flex justify-end items-center sm:pr-12 pt-6">
                        <button
                            className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => redireccionar()}
                        >
                        Nuevo</button>
                    </div>
                </div>


                <form
                    onSubmit={buscarReceta}
                    className="flex justify-center sm:hidden mt-4"
                >
                    <div className="bg-colorFondo flex items-center w-11/12 border-black border">
                        <i className="pl-2"><img src={lupa} width="15" alt="lupa"/></i>
                        <input
                            required
                            type="search" 
                            placeholder="Buscar..." 
                            className="bg-colorFondo w-11/12 flex justify-center pl-2 lg:w-40 h-10 text-black focus:outline-none"
                            onChange={e =>  guardarBusqueda(e.target.value) }
                        />

                    </div>    
                </form>


                <div className="flex justify-center ">

                    {recetas.length === 0 ?

                        <div className="bg-white w-11/12 h-40 flex justify-center items-center justify-items-center mt-10 ">
                            <p className="font-source font-bold">Sin datos</p>
                        </div>
                    :

                        <div className="bg-white w-11/12 mt-10 pb-20 pt-6 sm:pt-0">

                            <div className="flex items-center justify-end">
                                <div className="hidden lg:flex lg:w-1/2 lg:justify-start lg:items-center">
                                    <p className="font-source font-bold text-xl pl-12 pt-3"></p>
                                </div>

                                <form
                                    onSubmit={buscarReceta}
                                    className="hidden sm:flex mr-6 sm:w-1/2 sm:pr-4 sm:justify-end pt-6"
                                >
                                    <div className="bg-colorFondo flex items-center">
                                        <i className="pl-2"><img src={lupa} width="15" alt="lupa"/></i>
                                        <input
                                            required
                                            type="search" 
                                            placeholder="Buscar..." 
                                            className="w-full lg:w-40 h-10 pl-2 bg-colorFondo focus:outline-none"
                                            onChange={e =>  guardarBusqueda(e.target.value) }
                                        />
                                    </div>
                                </form>
                            </div>


                            <div className="text-colorBoton hidden sm:flex sm:justify-center lg:flex lg:justify-center">
                                
                                <div className="w-1/12 border-black border-b-2 mb-4">
                                    
                                </div>

                                <div className="w-2/12 sm:w-4/12 md:w-3/12 lg:w-2/12 border-black border-b-2 mb-4 flex justify-center">
                                    <p>Nombre</p>
                                </div>

                                <div className="w-3/12 sm:w-3/12 md:w-3/12 lg:justify-center border-black border-b-2 mb-4 flex justify-items-center">
                                    <p>Teléfono</p>
                                </div>

                                <div className="w-4/12 sm:w-2/12 md:w-3/12 lg:w-4/12 border-black border-b-2 mb-4">
                                    <p></p>
                                </div>

                                <div className="w-1/12 border-black border-b-2 mb-4">
                                    
                                </div>
                            </div>
                            
                            {recetas.map(receta => (
                                    <RecetasMostrar
                                        key={receta.id}
                                        receta={receta}
                                        props = {props}
                                    /> 
                                ))}
                            
                        </div>
                    
                    }
                    
                </div>
            </div>
        </div>
     );
}
 