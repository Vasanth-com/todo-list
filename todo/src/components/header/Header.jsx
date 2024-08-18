import React, { useEffect, useState } from 'react'

const Header = () => {

    const [lightMode, setLightMode] = useState(false);
  
    const handleChangeMode = () => setLightMode(!lightMode);
  
    useEffect(() =>{
      const body = document.querySelector("body");
      if (lightMode) {
        body.classList.add("lightmode");
      } else {
        body.classList.remove("lightmode");
      }
    }, [lightMode]);
  
    return (
      <div className='heading'>
        <h2 className='heading__title'>todo</h2>
        <fieldset className="colormodes">
          <legend className="visually-hidden">Color mode selections</legend>
          <input 
            className="colormodes__input"
            type='radio'
            id='darkmode'
            name='colormode'
            aria-label='darkmode'
            value='darkmode'
            defaultChecked
            onChange={handleChangeMode}
            />
          <label
            htmlFor="darkmode"
            className="colormodes__toggler"
          />
          <input 
            className="colormodes__input"
            type='radio' 
            id='lightmode' 
            name='colormode' 
            aria-label='lightmode'
            onChange={handleChangeMode}
             />
          <label
            htmlFor="lightmode"
            className="colormodes__toggler"
          />
          <div className="colormodes__focus-trick"></div>
        </fieldset> 
      </div>
    );
  }

export default Header
