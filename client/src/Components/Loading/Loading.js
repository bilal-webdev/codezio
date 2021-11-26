import React from "react";
import CSSstyle from "./Loading.module.css";
import loading from "../../assets/loading.gif";

function Loading() {
  return (
    <div className={CSSstyle.root}>
      <img src={loading} alt="loading..." />
    </div>
  );
}

export default Loading;
