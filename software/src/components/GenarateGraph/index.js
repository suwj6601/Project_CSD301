// import React, { useState } from "react";
// import "./style.css";

// const GenerateGraph = () => {
//   const [isInputNumberVex, setIsInputNumberVex] = useState(true);
//   const [numberVex, setNumberVex] = useState(0);
//   const [src, setSrc] = useState("");
//   const [des, setDes] = useState("");
//   const [weight, setWeight] = useState("");

//   var graphMatrix = new Array([]);

//   const addEdge = () => {
//     if (isInputNumberVex) {
//       setIsInputNumberVex(false);
//     } else {
//       graphMatrix[src][des] = weight;

//       setSrc("");
//       setDes("");
//       setWeight("");
//       console.log("add");
//     }
//   };

//   // visualieze graph matrix
//   const visualizeGraph = () => {
//     var graphMatrix = [numberVex][numberVex];
//     for (var i = 0; i < numberVex; i++) {
//       for (var j = 0; j < numberVex; j++) {
//         if (graphMatrix[i][j] == 0) {
//           console.log("0");
//         } else {
//           console.log(graphMatrix[i][j]);
//         }
//       }
//     }
//   };

//   return (
//     <div className="main">
//       <div className="container">
//         <div className="title">Generate Adjacency Matrix</div>

//         <label
//           class="input "
//           style={{ pointerEvents: !isInputNumberVex ? "none" : "auto" }}
//         >
//           <input
//             class="input__field hero"
//             type="text"
//             placeholder=" "
//             onChange={(e) => setNumberVex(e.target.value)}
//           />
//           <span class="input__label">Input number of vertical</span>
//         </label>

//         <div style={{ display: !isInputNumberVex ? "block" : "none" }}>
//           <label class="input">
//             <input
//               class="input__field hero"
//               type="text"
//               placeholder=" "
//               onChange={(e) => setSrc(e.target.value)}
//               value={src}
//             />
//             <span class="input__label">Input the source vertex</span>
//           </label>
//           <label class="input">
//             <input
//               class="input__field hero"
//               type="text"
//               placeholder=" "
//               onChange={(e) => setDes(e.target.value)}
//               value={des}
//             />
//             <span class="input__label">
//               Input the source destination vertex
//             </span>
//           </label>
//           <label class="input">
//             <input
//               class="input__field hero"
//               type="text"
//               placeholder=" "
//               onChange={(e) => setWeight(e.target.value)}
//               value={weight}
//             />
//             <span class="input__label">Enter the weight of the edge</span>
//           </label>
//         </div>

//         <div className="btn">
//           <button class="button-23 add" role="button" onClick={addEdge}>
//             Add
//           </button>
//           <button
//             class="button-23 generate"
//             role="button"
//             onClick={visualizeGraph}
//           >
//             Generate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateGraph;
