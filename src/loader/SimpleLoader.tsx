import React from "react";
import './styles.scss';
const SimpleLoader = ({colour}: {colour: string}) => {
  return (
    <div className={"OUR-simple-loader"}>
      <div className='loadDot' style={{background: colour}}/>
      <div className='loadDot' style={{background: colour}}/>
      <div className='loadDot' style={{background: colour}}/>
    </div>
  )
}

export default SimpleLoader;
