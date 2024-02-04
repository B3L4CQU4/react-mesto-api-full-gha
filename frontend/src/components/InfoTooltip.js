import React from "react";

function InfoTooltip({
  name,
  isOpen,
  infoText,
  infoImg,
  onClose
}) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`} id={`${name}Popup`}>
      <div className="popup__container">
        <button className="popup__close-btn hoover" type="button" onClick={onClose} />
        <img className="popup__info-img" src={infoImg} alt={infoText}/>
        <h2 className="popup__info-title">{infoText}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip

///${isOpen ? 'popup_is-opened' : ''}