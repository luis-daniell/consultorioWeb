import React from 'react';

const Imagen = ({nombreImagen}) => {
    return ( 
        <div className=" bg-orange-500 h-16 flex w-1/2">
            
                <img src={nombreImagen}/>
            
        </div>
     );
}
 
export default Imagen;