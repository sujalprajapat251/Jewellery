import React from 'react';
import ringLoader from "../Img/Sujal/ringLoader.mp4";

const Loader = () => {
  return (
    <div className='s_loader'>
      <video className="loader-video" autoPlay loop muted playsInline aria-hidden="true" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
        <source src={ringLoader} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}


export default Loader;
