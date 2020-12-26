import React from 'react';


const MostrarDato = ({cita}) => {

    let atendida;
    if(cita.atendida === true){
        atendida='SI'

    }else{
        atendida='NO'
    }
    return ( 
    
        <div className="flex justify-items-center items-center justify-center w-full">
            <div className="border-2 border-black w-3/12 flex justify-center h-10 items-center"><p className="">{cita.fecha}</p></div>

            <div className="border-2 border-black w-3/12 flex justify-center h-10 items-center"><p>{cita.hora}</p></div>

            <div className="border-2 border-black w-3/12 flex justify-center h-10 items-center"><p>{atendida}</p></div>
        </div>
    );
}
 
export default MostrarDato;