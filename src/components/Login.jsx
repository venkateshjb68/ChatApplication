// import React from "react";
// import "./style.css";
// // import { useState } from "react";


// // const [message, setMessage] = useState('');
// const Login = ({newUser,handleChange,logNewUser,setMessage}) => {
//     return (  
//         <div className="card w-100 text-center border-white">
//         <div className="row">
//           <div className="col-12">
//             <h5>Enter Username</h5>
//           </div>
//           <div className="d-flex justify-content-center py-1">
//             <div className="col-4">
              
//             <input type="text" name="username" value={newUser} onChange={(e)=>handleChange(e)}
//               className="form-control mb-4"
//               placeholder="username" autoComplete="off"
        
//                onKeyDown={(e)=>(e.key === "Enter" ? logNewUser() :"")}
//               // onKeyDown={(e) => e.key === "Enter" && logNewUser()}
//               />
//             <button className="btn btn-success w-100" onClick={()=>logNewUser()}>Login</button>
//             </div>
//           </div>
//         </div>
//       </div>
 
// export default Login;
import React from "react";
import "./style.css";

const Login = ({ newUser, handleChange, logNewUser }) => {
  return (
    <div className="card w-100 text-center border-white">
      <div className="row">
        <div className="col-12">
          <h5>Enter Username</h5>
        </div>
        <div className="d-flex justify-content-center py-1">
          <div className="col-4">
            <input
              type="text"
              name="username"
              value={newUser}
              onChange={(e)=>handleChange(e)}
              className="form-control mb-4"
              placeholder="Username"
              autoComplete="off"
              onKeyDown={(e) => e.key === "Enter" && logNewUser()}
            />
            <button className="btn btn-success w-100" onClick={()=>logNewUser()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
