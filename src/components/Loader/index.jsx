import React from "react";
import LoadImage from "../../assets/img/loader.gif";
export const Loader = () => {
  return (
    <>
      <div className="loader">
        <div>
          <img alt={"loader"} src={LoadImage} />
        </div>
      </div>
    </>
  );
};
