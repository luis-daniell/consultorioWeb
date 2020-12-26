import React, {useState, useContext} from 'react';
import {useFormik} from 'formik';
import Barra from "../ui/Barra";
import {FirebaseContext} from '../../firebase/Auth';
import Sidebar from "../ui/Sidebar";


const NuevoExpediente = props => {

    //Botones
    const [presion, guardarPresion] = useState(true);
    const [peso, guardarPeso] = useState(true);
    const [talla, guardarTalla] = useState(true);

    //Context con las operaciones de firebase
    const {firebase} = useContext(FirebaseContext);

    const f = new Date();
    const year = f.getFullYear().toString();
    const mes =  (f.getMonth() +1).toString();

    const formik = useFormik({
        initialValues : {
            nombre: '',
            apellidos: '',
            domicilio: '',
            telefono: '',
            sexo: '',
            correo: '',
            antecedentes: '',
            estilos: '',
            diagnostico: '',
            presion: '',
            peso: '',
            talla: '',
            yearExpediente: year,
            mesExpediente: mes,
        },

        onSubmit: async expediente => {
            try {
                await firebase.db.collection('expedientes').add(expediente);
                
                props.history.push("/expediente");

            } catch (error) {
                console.log(error);
            }
        }

    });

    return ( 
        <div className="">
            
            <Sidebar/>
            
            
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right">
                <Barra/>

                <div className="flex justify-center">
                    <form 
                    className="w-11/12 pb-20"
                    onSubmit={formik.handleSubmit}
                    >

                        <div className="flex">
                            <div className="flex w-11/12 sm:w-1/2 justify-start items-center">
                                <p className="font-source content-center text-2xl font-bold pt-6">Nuevo Expediente</p>
                            </div>
                            
                            <div className="hidden sm:w-1/2 sm:flex justify-end items-center pr-12 pt-6">
                                <button
                                    className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                    type="submit"
                                >
                                Guardar</button>
                            </div>
                        </div>
                    

                        <div className="bg-white pb-10 mt-8">

                            <div className="">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Ingresa los datos del paciente</p>
                            </div>

                            <div className="flex flex-wrap justify-center sm:justify-start mt-10">
                                <label className="hidden sm:flex sm:w-3/12 md:w-3/12 md:flex pl-12 text-tercerColor">Nombre: </label>
                                <input
                                    required 
                                    type="text" 
                                    placeholder="Nombre" 
                                    className="w-11/12 sm:w-8/12 md:w-3/12 shadow appearance-none border-2 py-2 px-3"
                                    id="nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <label className="hidden sm:flex sm:w-3/12 sm:mt-6 md:mt-0 md:w-2/12 md:flex pl-12 text-tercerColor">Apellidos: </label>
                                <input
                                    required
                                    id="apellidos" 
                                    type="text" placeholder="Apellidos" 
                                    className="w-11/12 mt-6 sm:w-8/12 sm:mt-6 md:mt-0 md:w-3/12 shadow appearance-none border-2 py-2 px-3"
                                    value={formik.values.apellidos}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            <div className=" flex justify-center sm:justify-start mt-6">
                                <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Domicilio: </label>
                                <textarea
                                    required
                                    id="domicilio"
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    placeholder="Domicilio"
                                    value={formik.values.domicilio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                            </div>

                            <div className=" flex flex-wrap justify-center sm:justify-start mt-6">

                                <label className="hidden sm:flex sm:w-3/12 md:w-3/12 md:flex pl-12 text-tercerColor">Telefono: </label>
                                <input
                                    pattern="\([0-9]{3}\) [0-9]{3}[-][0-9]{4}"
                                    title="Un número de teléfono válido consta de un área de código de 3 dígitos entre paréntesis, un espacio, los tres primeros dígitos del número, un espacio o guión (-) y cuatro dígitos más. Ej. (123) 987-1232" 
                                    required
                                    type="tel" 
                                    placeholder="Telefono" 
                                    className="w-11/12 sm:w-8/12 md:w-3/12 shadow appearance-none border-2 py-2 px-3"
                                    id ="telefono"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <label className="hidden sm:flex sm:w-3/12 sm:mt-6 md:mt-0 md:w-2/12 md:flex pl-12 text-tercerColor">Sexo: </label>
                                <select
                                    className="w-11/12 mt-6 sm:w-8/12 sm:mt-6 md:mt-0 md:w-3/12 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="sexo"
                                    required
                                    value={formik.values.sexo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">-- Seleccione Sexo --</option>
                                    <option value="hombre">Hombre</option>
                                    <option value="mujer">Mujer</option>

                                </select>
                            </div>

                            <div className=" flex justify-center sm:justify-start mt-6">
                                <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">E-mail: </label>
                                <input
                                    required 
                                    type="Email" placeholder="Correo Electrónico" 
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    id="correo"
                                    value={formik.values.correo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>


                            <div className="flex justify-center sm:justify-start mt-6">
                                <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 font-source text-tercerColor pl-12">Antecedentes Familiares: </label>
                                <textarea
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    placeholder="Antecedentes Familiares"
                                    id="antecedentes"
                                    value={formik.values.antecedentes}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                            </div>

                            <div className="flex justify-center sm:justify-start mt-6">
                                <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Estilos de vida: </label>
                                <textarea
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    placeholder="Estilos de vida"
                                    id="estilos"
                                    value={formik.values.estilos}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                            </div>

                            <div className="flex justify-center sm:justify-start mt-6">
                                <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Diagnóstico: </label>
                                <textarea
                                    required
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    placeholder="Diagnóstico"
                                    id="diagnostico"
                                    value={formik.values.diagnostico}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                            </div>


                            { presion ? null : (
                                <div className="flex justify-center sm:justify-start mt-6">
                                    <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Presion: </label>
                                    <input 
                                        type="text" placeholder="Presión" 
                                        className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                        id="presion"
                                        value={formik.values.presion}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>)
                            }

                            { peso ? null : (
                                <div className=" flex justify-center sm:justify-start mt-6">
                                    <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Peso: </label>
                                    <input 
                                        type="text" placeholder="Peso" 
                                        className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                        id="peso"
                                        value={formik.values.peso}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>)
                            }


                            { talla ? null : (
                                <div className="flex justify-center sm:justify-start mt-6">
                                    <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 pl-12 text-tercerColor">Talla: </label>
                                    <input 
                                        type="text" placeholder="Talla" 
                                        className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                        id="talla"
                                        value={formik.values.talla}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>)
                            }



                            <div className="flex-wrap flex sm:flex sm:justify-around sm:pr-12 sm:pt-6 ">
                                { presion ? (
                                    <button
                                        className="bg-tercerColor hover:bg-blue-dark ml-4 mt-6 text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                        onClick={() => guardarPresion(false)}
                                        
                                    >Toma de presion</button>)
                                    : null
                                    }

                                    { peso ? (
                                        <button
                                            className="bg-tercerColor hover:bg-blue-dark ml-4 mt-6 text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                            onClick= {() => guardarPeso(false)}
                                        >Peso</button>)
                                    : null}


                                    { talla ? (
                                        <button
                                            className="bg-tercerColor hover:bg-blue-dark ml-4 mt-6 text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                            onClick={()=>guardarTalla(false)}
                                        >Talla</button>)
                                    : null
                                    }
                            </div>

                        </div>

                        <div className="w-11/12 flex justify-center mt-6 sm:hidden ">
                            <button
                                className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                type="submit"
                            >
                            Guardar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoExpediente;