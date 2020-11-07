import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Sidebar = props => {




    return ( 
        <aside className="w-1/5 fixed h-screen bg-gray-800 float-left">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold font-source">Consultorio</p>

                <p className="mt-3 text-gray-600">Administra tu consultorio</p>

                <nav  className="mt-10">
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/dashboard">Dashboard</Link>
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/estadisticas">Estadisticas</Link>
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/recetas">Recetas</Link>
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/perfil">Perfil</Link>
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/citas">Citas</Link>
                    
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/expediente">Expediente</Link>
                    <Link className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500" exact="true" to="/historial">Historial</Link>
                </nav>

                
                

            </div>
        </aside>

        
     );
}
 
export default Sidebar;