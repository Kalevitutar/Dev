import React from 'react';

const Card = (props) => {
  console.log(props.handle, "check on VQ");
  return ( 
	<div className= "card" style={{ backgroundColor: props.favColor}}>
   <img className="imgsrc" src={props.imgSrc} alt="fruits" />
     
       {console.log(props.handle, "inside return")}
      {props.handle === "VuduQueen" ? (
     <h4 style={{ color: "white" }} >
        <p className="handle"> {props.handle}</p>
        <p className="time-zone">{props.timeZone}</p>
        {/* <p className="position">{props.favColor}</p> */}
      </h4> 
      ) : (
      <h4 style={{ color: "black" }} >
        <p className="handle"> {props.handle}</p>
        <p className="time-zone">{props.timeZone}</p>
        {/* <p className="position">{props.favColor}</p> */}
      </h4> 
      )}
    </div>
  );
};
export default Card;



    //  {employeeData.map((employee, id) => (
    //     <Profile
    //       firstName={employee.firstName}
    //       secondName={employee.secondName}
    //       title={employee.title}
    //       office={employee.office}
    //       mobile={employee.mobile}
    //       sms={employee.sms}
    //       email={employee.email}
    //       img={employee.img}
    //       key={id}
    //     />
    //   ))}