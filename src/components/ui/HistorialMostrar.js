import React from 'react';
import vision from '../../img/vision.svg';
import delet from '../../img/delet.svg';
import VisualizarExpediente from '../subcomponents/VisualizarExpediente';
import {useHistory} from "react-router-dom";

const ExpedientesMostrar = ({expediente}) => {


    const {id, nombre, telefono, correo, diagnostico} = expediente;

    

    const history = useHistory();

   //console.log(props);

   //QUEDA PENDIENTE LA ELIMINACION!!!!!!!!!!!!

    const redireccionar = (id) => {

        //console.log(id);
        
        history.push({

            pathname: "/visualizar-historial",
            state: { detail: expediente }

        });
    }

    return ( 
        <div className="flex content-center items-center justify-items-center justify-center">

            <div className="w-1/12 h-12 flex items-center border-b-2 border-r-2 border-gray-500">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMywwLDAsMC4zLDE3OS4xOTk2NTgyMDMxMjUwNywxNzkuMikiPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwyODguMzg5Yy0xNTMuODM3LDAtMjM4LjU2LDcyLjc3Ni0yMzguNTYsMjA0LjkyNWMwLDEwLjMyMSw4LjM2NSwxOC42ODYsMTguNjg2LDE4LjY4Nmg0MzkuNzQ3ICAgIGMxMC4zMjEsMCwxOC42ODYtOC4zNjUsMTguNjg2LTE4LjY4NkM0OTQuNTYsMzYxLjE3Miw0MDkuODM3LDI4OC4zODksMjU2LDI4OC4zODl6IE01NS40OTIsNDc0LjYyOCAgICBjNy4zNS05OC44MDYsNzQuNzEzLTE0OC44NjYsMjAwLjUwOC0xNDguODY2czE5My4xNTksNTAuMDYsMjAwLjUxNSwxNDguODY2SDU1LjQ5MnoiIGZpbGw9IiNhNWE0YmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwYy03MC42NjUsMC0xMjMuOTUxLDU0LjM1OC0xMjMuOTUxLDEyNi40MzdjMCw3NC4xOSw1NS42MDQsMTM0LjU0LDEyMy45NTEsMTM0LjU0czEyMy45NTEtNjAuMzUsMTIzLjk1MS0xMzQuNTM0ICAgIEMzNzkuOTUxLDU0LjM1OCwzMjYuNjY1LDAsMjU2LDB6IE0yNTYsMjIzLjYxMWMtNDcuNzQzLDAtODYuNTc5LTQzLjU4OS04Ni41NzktOTcuMTY4YzAtNTEuNjExLDM2LjQxMy04OS4wNzEsODYuNTc5LTg5LjA3MSAgICBjNDkuMzYzLDAsODYuNTc5LDM4LjI4OCw4Ni41NzksODkuMDcxQzM0Mi41NzksMTgwLjAyMiwzMDMuNzQzLDIyMy42MTEsMjU2LDIyMy42MTF6IiBmaWxsPSIjYTVhNGJmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" />
            </div>

            <div className="pl-1 w-1/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{nombre}</p>
            </div>


            <div className="w-2/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{telefono}</p>
            </div>


            <div className="w-3/12 h-12 flex items-center border-b-2 border-gray-500">
                <p className="text-tercerColor">{correo}</p>
            </div>


            <div 
                className="w-3/12 h-12 flex items-center border-b-2 border-gray-500 "
                
            >
                <p className="text-tercerColor">{diagnostico}</p>
                
            </div>





            <div className="w-1/12 h-12 flex items-center justify-around justify-items-center border-b-2 border-gray-500 border-r-2">
                <img src={vision} width="25" height="" className="cursor-pointer" onClick={() => redireccionar(id)} />
                <img src={delet} width="25" height="" className="cursor-pointer"/>
                
            </div>




        </div>
     );
}
 
export default ExpedientesMostrar;