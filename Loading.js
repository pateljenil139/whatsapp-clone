import React from "react";
import { Circle } from "better-react-spinkit";

function Loading() {
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
         // This ensures that the container takes the full viewport height
      };
  

  return (
    <div style={containerStyle}>
      <center>
        <p>Wait for A Second</p>
        <Circle color="gray" size={60}   />
      </center>
    </div>
  );
}

export default Loading;
