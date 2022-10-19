// bring the api call info into here via props

import React from "react";

import "../Components/Card.css";




// const Card = (props) => {
//   return ( 
// 	<div className= "card" style={{ backgroundColor: props.favColor}}>
//    <img className="imgsrc" src={props.imgSrc} alt="fruits" />
//       {props.handle === "VuduQueen" ? (
//      <h4 style={{ color: "white" }} >
//         <p className="handle"> {props.handle}</p>
//         <p className="time-zone">{props.timeZone}</p>
//       </h4> 
//       ) : (
//       <h4 style={{ color: "black" }} >
//         <p className="handle"> {props.handle}</p>
//         <p className="time-zone">{props.timeZone}</p>
//       </h4> 
//       )}
//     </div>
//   );
// };
// export default Card;


const Card = (props) => {

//   function setWidth() {
//     var w=document.getElementById('poster').offsetWidth
//     document.getElementById('title').setAttribute("style","width:"+w+"px");
//     document.getElementById('plot').setAttribute("style","width:"+w+"px");
//     document.getElementById('release-date').setAttribute("style","width:"+w+"px");
// }

  return ( 
	<div className= "card" style={{ color: "black", fontSize: "h4" }}>
        <img className="poster" id="poster" src={props.movie.Poster} alt="movie poster" />
            <p className="card-title" id="card-title">{props.movie.Title}</p>
            <p className="plot" id="plot">{props.movie.Plot}</p>
            <p className="release-date" id="release-date">{props.movie.Released}</p>
            {/* {setWidth()} */}
    </div>
  );
};
export default Card;