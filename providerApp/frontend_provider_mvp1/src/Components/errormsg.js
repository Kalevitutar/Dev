import React from "react";

function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p className="errorp">This is required</p>;
      case "minLength":
        return <p className="errorp">Need minmium 2 charcaters</p>;
      case "maxLength":
        return <p className="errorp">Phone need maximum 10 charcaters</p>;
      case "pattern":
        return <p className="errorp">Enter a valid address</p>;
      case "min":
        return <p className="errorp">Minmium age is 18</p>;
      case "validate":
        return <p className="errorp">Username is already used</p>;
      case "url":
        return <p className="errorp">Use an url format</p>;
      default:
        return null;
    }
  }

  return null;
}
export default ErrroMessage;
