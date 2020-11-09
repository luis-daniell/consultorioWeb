import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar = props => {




    return ( 
        <aside className="w-1/5 fixed h-screen bg-gray-800 float-left">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold font-source">Consultorio</p>

                <p className="mt-3 text-gray-600">Administra tu consultorio</p>

                <nav  className="mt-10">
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/dashboard">Dashboard</NavLink> 
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/estadisticas">Estadisticas</NavLink>
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/recetas">Recetas</NavLink>
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/perfil">Perfil</NavLink>
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/citas">Citas</NavLink>
                    
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/expediente">Expediente</NavLink>
                    <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 font-source font-bold text-2xl" activeClassName="text-yellow-500"  to="/historial">Historial</NavLink>
                    
                </nav>

                
                

            </div>
        </aside>

        
     );
}
 
//Se quito en exact to ="true"
export default Sidebar;