import React, { useEffect, useContext, useState } from 'react';
import Chart from "react-google-charts";
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




        let enero = 0;
        let febrero = 0;
        let marzo = 0;
        let abril = 0;
        let mayo = 0;
        let junio = 0;
        let julio = 0;
        let agosto = 0;
        let septiembre = 0;
        let octubre = 0;
        let noviembre = 0;
        let diciembre = 0;
    //console.log(citas);

    citas.forEach(logArrayElements);
    

    function logArrayElements(element, index, array) {

        

        if(element.mesCita === "01"){
            enero = enero + 1;

        }else if(element.mesCita === "02"){
            febrero = febrero + 1;

        }else if(element.mesCita === "03"){
            marzo = marzo + 1;

        }else if(element.mesCita === "04"){
            abril = abril + 1;

        }else if(element.mesCita === "05"){
            mayo = mayo + 1;

        }else if(element.mesCita === "06"){
            junio = junio + 1;

        }else if(element.mesCita === "07"){
            julio = julio + 1;

        }else if(element.mesCita === "08"){
            agosto = agosto + 1;

        }else if(element.mesCita === "09"){
            septiembre = septiembre + 1;

        }else if(element.mesCita === "10"){
            octubre = octubre + 1;

        }else if(element.mesCita === "11"){
            noviembre = noviembre + 1;

        }else{
            diciembre = diciembre + 1;
        }

    }

    const meses = [{
        mes: 'Enero',
        cantidad: enero
        },{
        mes: 'Febrero',
        cantidad: febrero
        }, {
        mes: 'Marzo',
        cantidad: marzo
        },
        {
        mes: 'Abril',
        cantidad: abril
        },
        {
        mes: 'Mayo',
        cantidad: mayo
        }, {
        mes: 'Junio',
        cantidad: junio
        }, {
        mes: 'Julio',
        cantidad: julio
        }, {
        mes: 'Agosto',
        cantidad: agosto
        }, {
        mes: 'Septiembre',
        cantidad: septiembre
        }, {
        mes: 'Octubre',
        cantidad: octubre
        }, {
        mes: 'Noviembre',
        cantidad: noviembre
        }, {
        mes: 'Diciembre',
        cantidad: diciembre
        }


    ];


   // console.log(meses);
    const returnedArray = [['citas', '']];
    for(let i=0; i<meses.length; i++) {

        if(meses[i].cantidad >= 1){
            returnedArray[i+1] = [meses[i].mes, meses[i].cantidad];


        }
            
    } 


    var filtered = returnedArray.filter(function (el) {
        return el != null;
      });
    
    console.log(filtered);



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



                <div className=" bg-orange-500 flex justify-center items-center justify-items-center ">
                    <div className="bg-red-700 flex">

                        <Chart
                            width={500}
                            height={300}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={filtered}
                            options={{
                            title: 'Citas Atendidas',
                            chartArea: { width: '80%' },
                            hAxis: {
                                title: 'Citas Atendidas',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'City',
                            },
                            }}
                            legendToggle
                        />
                    </div>



                    <div className="bg-gray-700 flex">
                            
                    <Chart
                            width={500}
                            height={300}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                            ['City', '2010 Population'],
                            ['Enero', 10],
                            ['Febrero', 20],
                            ['Marzo', 25],
                            ['Abril', 30],
                            ['Mayo', 15],
                            ['Junio', 23],
                            ['Julio', 10],
                            ['Agosto', 32],
                            ['Septiembre', 40],
                            ['Octubre', 29],
                            ['Noviembre', 21],
                            ['Diciembre', 19],

                            ]}
                            options={{
                            title: 'Population of Largest U.S. Cities',
                            chartArea: { width: '80%' },
                            hAxis: {
                                title: 'Total Population',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'City',
                            },
                            }}
                            legendToggle
                        />
                    </div>



                </div>


                


            </div>
        </div>
  );
}