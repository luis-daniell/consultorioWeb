import React, {useContext} from 'react';
import {useLocation} from "react-router-dom";
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import {FirebaseContext} from '../../firebase/Auth';



const ModificarExpediente = ({props}) => {

    const location = useLocation();

    const history = useHistory();

    const {firebase} = useContext(FirebaseContext);

    
    //console.log(location.state.detail);

    const {nombre2, apellidos2, antecedentes2, correo2, diagnostico2, domicilio2, estilos2, id2, peso2, presion2, sexo2, talla2, telefono2} = location.state.detail;


    let nombre3 = nombre2;
    let apellidos3 = apellidos2;
    let antecedentes3 = antecedentes2;
    let correo3 = correo2;
    let diagnostico3 = diagnostico2;
    let domicilio3 = domicilio2;
    let estilos3 = estilos2;
    let id3 = id2;
    let peso3 = peso2;
    let presion3 = presion2;
    let sexo3 = sexo2;
    let talla3 = talla2;
    let telefono3 = telefono2;
    


    const formik = useFormik({
        initialValues : {
            id: id3,
            nombre: nombre3,
            apellidos: apellidos3,
            domicilio: domicilio3,
            telefono: telefono3,
            sexo: sexo3,
            correo: correo3,
            antecedentes: antecedentes3,
            estilos: estilos3,
            diagnostico: diagnostico3,
            presion: presion3,
            peso: peso3,
            talla: talla3,
        },

        onSubmit: expediente => {
            try {

                firebase.db.collection('expedientes').doc(expediente.id).update(expediente);

                history.push("/expediente");
                
            } catch (error) {
                console.log(error);
            }
        }

    });



    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo h-auto w-4/5 box-border left-auto float-right">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={formik.handleSubmit}
                            type="submit"
                        >
                        Guardar</button>
                    </div>
                </div>


                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center">


                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-3xl mt-6">
                                <p>{nombre2 +" " + apellidos2}</p>
                            </div>


                            <div className="bg-colorFondo flex content-center justify-center ">
 
                                <img src={usuarioPerfil} className="-mt-12" width="120" height="120"/>
                                
                            </div>


                            <div className="bg-colorFondo pb-12 rounded-b-extra">
                                    
                                
                                    
                                    <div className=" flex justify-around">
                                        <label className="text-tercerColor text-2xl w-3/12">Nombre</label>
                                        <input 
                                            type="text" placeholder="Nombre" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="nombre"
                                            value={formik.values.nombre}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        />
                                    </div>

                                    <div className="flex justify-around mt-6">
                                        <label className="text-tercerColor text-2xl w-3/12">Apellidos</label>
                                        <input 
                                            type="text" placeholder="Nombre" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="apellidos"
                                            value={formik.values.apellidos}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>



                                    <div className=" flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Domicilio: </label>
                                        <textarea
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            placeholder="Domicilio"
                                            id="domicilio"
                                            value={formik.values.domicilio}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        ></textarea>
                                    </div>
                                  
                                



                                     
                                    <div className="flex justify-around mt-6">
                                        <label className="text-tercerColor text-2xl w-3/12">Telefono: </label>
                                        <input 
                                            type="tel" placeholder="Telefono" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="telefono"
                                            value={formik.values.telefono}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>




                                    <div className="flex justify-around mt-6">
                                        <label className="text-tercerColor text-2xl w-3/12">Sexo: </label>

                                        <select
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="sexo"
                                            value={formik.values.sexo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="">-- Seleccione --</option>
                                            <option value="hombre">Hombre</option>
                                            <option value="mujer">Mujer</option>

                                        </select>
                                    </div>





                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">E-mail: </label>
                                        <input 
                                            type="Email" placeholder="Correo Electrónico" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="correo"
                                            value={formik.values.correo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                



                                
                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Antecedentes Familiares: </label>
                                        <textarea
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            placeholder="Antecedentes Familiares"
                                            id="antecedentes"
                                            value={formik.values.antecedentes}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        ></textarea>
                                    </div>




                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Estilos de vida: </label>
                                        <textarea
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            placeholder="Estilos de vida"
                                            id="estilos"
                                            value={formik.values.estilos}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                            

                                        ></textarea>
                                    </div>



                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Diagnóstico: </label>
                                        <textarea
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            placeholder="Diagnóstico"
                                            id="diagnostico"
                                            value={formik.values.diagnostico}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        ></textarea>
                                    </div>





                                    {presion2 === "" ? null : 
                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Presion: </label>
                                        <input 
                                            type="text" placeholder="Presión" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="presion"
                                            value={formik.values.presion}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
        
                                    </div>
                                    }
                                    
                                   {peso2 === "" ? null : 
                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Peso: </label>
                                        <input 
                                            type="text" placeholder="Presión" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="peso"
                                            value={formik.values.peso}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
   
                                    </div>
                                    }

                                   


                                
                                    {talla2 === "" ? null : 
                                    <div className="flex justify-around mt-6">
                                        <label htmlFor="descripcion" className="text-tercerColor text-2xl w-3/12">Talla: </label>
                                        <input 
                                            type="text" placeholder="Presión" 
                                            className="w-8/12 shadow appearance-none border-2 py-2 px-3"
                                            id="talla"
                                            value={formik.values.talla}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                    </div>
                                    
                                    }

        


                            </div>

                        </div>



                    </div>
                </div>




            </div>

        </div>
     );
}
 
export default ModificarExpediente;