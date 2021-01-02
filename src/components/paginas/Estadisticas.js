import React, { useEffect, useContext, useState } from 'react';
import Chart from "react-google-charts";
import {obtenerDatosCitas, obtenerDatosRecetas,  obtenerDatosExpedientes, obtenerDiagnosticoExpedientes} from '../../helper';
import {FirebaseContext} from '../../firebase/Auth';
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";
import {useFormik} from 'formik';

export const Estadisticas = () => {

    const [estado, guardarEstado] = useState(false);
    //const [yearr, guardarYear] = useState('');
    const {firebase} = useContext(FirebaseContext);
    //Año en LocalStorage
    let year = JSON.parse(localStorage.getItem('year'));
    if(!year){
        year = '';
    }

    const [citas, guardarCitas] = useState([]);
    const [expedientes, guardarExpedientes] = useState([]);
    const [recetas, guardarRecetas] = useState([]);
     
    useEffect(() => {

        if(year === ''){
            guardarEstado(true);
        }else{
            //guardarYear(year);
            guardarEstado(false);
        }

        const obtenerCitas =  () => {
            firebase.db.collection('citas')
            .where('atendida','==',true).where('yearCita','==',year.toString()).onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerCitas();

        const obtenerExpedientes =  () => {
            firebase.db.collection('expedientes')
            .where('yearExpediente','==',year.toString()).onSnapshot(manejarSnapshot2);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerExpedientes();


        const obtenerRecetas =  () => {
            firebase.db.collection('recetas')
            .where('yearReceta','==',year.toString()).onSnapshot(manejarSnapshot3);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerRecetas();

    },[year, firebase]);

    //Snapshop nos permite usar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const citass = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });

        //Almacenar los resultados en el state
        guardarCitas(citass);
    }

    //Snapshop nos permite usar la base de datos en tiempo real de firestore
    function manejarSnapshot2(snapshot) {
        const expedientess = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });

        //Almacenar los resultados en el state
        guardarExpedientes(expedientess);
    }

    //Snapshop nos permite usar la base de datos en tiempo real de firestore
    function manejarSnapshot3(snapshot) {
        const recetass = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });

        //Almacenar los resultados en el state
        guardarRecetas(recetass);
    }

    const graficaCitas = obtenerDatosCitas(citas, 'Citas');
    const graficaExpedientes = obtenerDatosExpedientes(expedientes, 'Expedientes');
    const graficaRecetas = obtenerDatosRecetas(recetas, 'Recetas');
    const diagnosticos = obtenerDiagnosticoExpedientes(expedientes, 'Expedientes');
    //console.log(diagnosticos);    

    const formik = useFormik({
        initialValues : {
            year: '',
        },
        onSubmit: dato => {
            localStorage.setItem('year',(dato.year));
            guardarEstado(false);
        }
    });

    return ( 
        <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className="content-center">
                    <div className="ml-4 flex sm:pl-4 md:pl-5 w-11/12 lg:ml-0 lg:pl-0 lg:justify-start items-center">
                        <p className="font-source content-center text-xl sm:text-2xl font-bold lg:pl-12 pt-6">Estadísticas</p>
                    </div>
                </div>

                {estado ? 
                    <div className="w-11/12 flex justify-items-center items-center justify-center mt-10">

                        <form 
                            className="w-11/12 flex lg:justify-start items-center justify-items-center"
                            //onSubmit={handleSubmit}
                            onSubmit={formik.handleSubmit}
                            >
                            <label className="text-lg w-1/12 sm:font-bold lg:w-1/12 text-tercerColor font-source sm:text-2xl ">Año: </label>
                            <select
                                className="lg:ml-4 w-5/12 ml-4 md:w-4/12 md:ml-0 text-xs sm:text-sm shadow appearance-none border rounded lg:w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="year"
                                required
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" className="">-- Seleccione el año --</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>

                            <button
                                className="ml-2 lg:ml-4 sm:text-lg sm:px-5 bg-tercerColor hover:bg-blue-dark text-white px-2 lg:text-xl text-xs rounded-full cursor-pointer font-source lg:w-40 h-8 focus:outline-none"  
                                type="submit"
                            >
                            Guardar</button>

                        </form>
                    </div>
                : 

                    <div className="flex justify-items-center items-center justify-center mt-10">

                        <div className="w-11/12 flex lg:items-center lg:justify-start">

                            <div className="w-2/12 flex sm:w-1/12">
                                <p className="text-tercerColor font-source text-xl sm:text-2xl font-bold">{year}</p>
                            </div>

                            <div className="w-9/12 pl-5">
                                <button
                                    className="bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer text-base font-source sm:w-40 h-8"  
                                    onClick={() => guardarEstado(true)}
                                >
                                Cambiar Año</button>
                            </div>

                        </div>
                    </div>
                }


                <div className="mt-4 flex flex-col justify-center justify-items-center items-center md:flex-row md:justify-around lg:flex-row lg:justify-around lg:items-center lg:justify-items-center ">
                   
                    {citas.length === 0 ?
                        <div className="bg-white flex justify-center items-center h-48 w-11/12 md:w-5/12 lg:w-5/12">
                            <p className="font-source font-bold">No hay datos</p>
                        </div>
                    : 
                        <div className="w-11/12 md:w-5/12 lg:w-5/12">
                            <Chart
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={graficaCitas}
                                options={{
                                    title: 'Citas Atendidas',
                                    chartArea: { width: '80%' },
                                    hAxis: {
                                        title: 'Citas Atendidas',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Citas',
                                    },
                                    colors: ['#41AEA9'],
                                }}
                                legendToggle
                            />
                        </div>
                
                    }

                    {expedientes.length === 0 ?
                        <div className="bg-white flex justify-center items-center h-48 mt-3 w-11/12 md:mt-0 md:w-5/12 lg:w-5/12 lg:mt-0">    
                             <p className="font-source font-bold">No hay datos</p>
                        </div>
                    :
                        <div className="mt-3 w-11/12 md:mt-0 md:w-5/12 lg:w-5/12 lg:mt-0">    
                        
                            <Chart
                                chartType="AreaChart"
                                loader={<div>Loading Chart</div>}
                                data={graficaExpedientes}
                                options={{
                                    title: 'Expedientes Registrados',
                                    hAxis: { title: 'Expedientes', titleTextStyle: { color: '#333' } },
                                    vAxis: { minValue: 0 },
                                    // For the legend to fit, we make the chart area smaller
                                    chartArea: { width: '80%', height: '70%' },
                                    // lineWidth: 25
                                    colors: ['#213E3B'],
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    }
                </div>


                <div className="flex flex-col justify-center justify-items-center items-center md:flex-row md:justify-around lg:flex lg:flex-row lg:justify-around lg:items-center lg:justify-items-center ">
                    
                    {recetas.length === 0 ?

                        <div className="bg-white flex justify-center items-center h-48 mt-3 w-11/12 md:mt-4 md:w-5/12 lg:w-5/12 lg:mt-6">    
                            <p className="font-source font-bold">No hay datos</p>
                        </div>              
                    :
                        <div className="w-11/12 mt-3 md:w-5/12 lg:w-5/12">

                            <Chart
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={graficaRecetas}
                                options={{
                                    title: 'Recetas Creadas',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    }
                   
                    {expedientes.length === 0 ?
                        <div className="bg-white flex justify-center items-center h-48 mt-3 w-11/12 md:mt-4 md:w-5/12 lg:w-5/12 lg:mt-6">    
                            <p className="font-source font-bold">No hay datos</p>
                        </div> 
                    :
                        <div className="w-11/12 mt-3 md:w-5/12 lg:w-5/12">    
                        
                            <Chart
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={diagnosticos}
                                options={{
                                    title: 'Diagnósticos',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />

                        </div>
                    }
                </div>
            </div>
        </div>
  );
}