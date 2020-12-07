import React from 'react';


const MostrarDato = ({cita}) => {


    //console.log(cita);

    let atendida;
    if(cita.atendida === true){
        atendida='SI'

    }else{
        atendida='NO'
    }


    return ( 
    
        <div className="flex justify-items-center items-center justify-center w-full">
            

                    <div className="border-2 border-black w-3/12 flex justify-center">{cita.fecha}</div>

                    <div className="border-2 border-black w-3/12 flex justify-center">{cita.hora}</div>

                    <div className="border-2 border-black w-3/12 flex justify-center">{atendida}</div>

        </div>
            
        
    );
}
 
export default MostrarDato;