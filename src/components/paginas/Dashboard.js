import React from "react";
import firebase from "../../firebase/firebase";
import Sidebar from "../ui/Sidebar";

export const Dashboard = props => {

 
  return (

    
    
    <div className="">
      <Sidebar/>

      <div className="bg-colorFondo w-4/5 box-border left-auto float-right">
        <button
          className=" bg-green-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
              firebase.cerrarSesion();
              props.history.push("/");
          }}
        >Logout</button>
      </div>
      
    </div>




  );
};

/*
<div>
        <h1>App Layout</h1>
        <button
          className=" bg-green-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            auth.logout(() => {
              props.history.push("/");
            });
          }}
        >
          Logout
        </button>
      </div>
*/
