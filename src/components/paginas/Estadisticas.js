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
            firebase.db.collection('citas').where('atendida','==',true).where('yearCita','==',year.toString()).onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerCitas();

        const obtenerExpedientes =  () => {
            firebase.db.collection('expedientes').where('yearExpediente','==',year.toString()).onSnapshot(manejarSnapshot2);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerExpedientes();


        const obtenerRecetas =  () => {
            firebase.db.collection('recetas').where('yearReceta','==',year.toString()).onSnapshot(manejarSnapshot3);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
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
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Estadísticas</p>
                    </div>

                    
                </div>

            
                
                {estado ? 
                <div className="w-11/12 flex justify-items-center items-center justify-center mt-10">

                    <form 
                        className="w-11/12 items-center"
                        //onSubmit={handleSubmit}
                        onSubmit={formik.handleSubmit}
                        >
                        <label className="w-2/4 text-tercerColor font-bold font-source text-3xl">Año: </label>
                        <select
                            className="ml-4 shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="year"
                            required
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">-- Seleccione el año --</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>

                        </select>



                        <button
                            className="ml-4 bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"  
                            type="submit"
                        >
                        Guardar</button>

                    </form>
                </div>
                : 


                <div className="w-11/12 flex justify-items-center items-center justify-center mt-10">

                    <div className="w-11/12 flex items-center">

                        <div className="w-3/12 flex justify-center items-center justify-items-center">
                            <p className="text-tercerColor font-source text-3xl font-bold">{year} </p>
                        </div>
                        

                        <button
                            className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"  
                            onClick={() => guardarEstado(true)}
                        >
                        Cambiar Año</button>
                    </div>
                </div>
                }


                <div className="flex justify-center items-center justify-items-center ">
                    <div className="bg-red-700 flex">

                        <Chart
                            width={500}
                            height={300}
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
                            }}
                            legendToggle
                        />
                    </div>

                    <div className="bg-gray-700 flex">    
                    
                    <Chart
                        width={'500px'}
                        height={'300px'}
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
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    />
                    </div>

                </div>


                <div className="flex justify-center items-center justify-items-center ">
                    <div className="bg-red-700 flex">

                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={graficaRecetas}
                        options={{
                            title: 'Recetas Creadas',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />
                    </div>

                    <div className="bg-gray-700 flex">    
                    
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={diagnosticos}
                            options={{
                                title: 'Diagnósticos',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />

                    </div>

                </div>


                
            </div>
        </div>
  );
}