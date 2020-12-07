import React from 'react';

const MedicamentosRecetados = ({receta}) => {
    return ( 
        <div className="flex justify-items-center items-center justify-center">
            
            <p>{receta.medicamentosPaciente}</p>

        </div>
     );
}
 
export default MedicamentosRecetados;