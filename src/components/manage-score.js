// import { TextField, Button, MenuItem, Select } from '@mui/material';
// import * as React from 'react';
// import { useNavigate } from "react-router-dom";
// import { matchApi } from "../services/api";

// function ManageScore() {
//   // const [user, setUser] = React.useState(null);
//   // let userId = 2;
//   // React.useEffect(() => {
//   //   fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setUser(data));
//   // }, [userId]);

//   // if (!user) return <p>Loading...</p>;

//   // const initialState = ;
//   const reducer = (state, action) => {
//     // switch (action.actionType) {
//     //   case "add":
//     //     return {
//     //       cartItems: state.cartItems.push({ name: 'Shirt', count: 1 })
//     //     }
//     //   case "remove":
//     //     return {
//     //       cartItems: []
//     //     }
//     // }

//     if(action.actionType==='add'){
//       // previousCount.current=state.cartItems;
//       return {cartItems: state.cartItems+1}
//     }
//     else if(action.actionType==='remove'){
//       // previousCount.current=state.cartItems;
//       return {cartItems: state.cartItems-1}
//     }
//   }
//   const [state, dispatch] = React.useReducer(reducer, {
//     cartItems: 0
//   })

//   const previousCount = React.useRef(0);
//   return (
//     <>
//       <button onClick={()=>dispatch({ actionType: "add" })}>Add</button>
//       <button onClick={()=>dispatch({ actionType: "remove" })}>Remove</button>
//       Cart Items: {state.cartItems}
//       <br></br>
//       Previous Cart Count: {previousCount.current}
//       {/* {state.cartItems.length && state.cartItems.map(item => (
//         <ul>
//           <li>{item.name} - {item.count}</li>
//         </ul>
//       ))} */}
//     </>
//   );
// }

// export default ManageScore;