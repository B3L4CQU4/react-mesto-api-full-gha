function ImagePopup({ card, onClose }) {
    return (
      <div className={`popup popup_zoombg ${card ? 'popup_is-opened' : ''}`} id="popup_image">
        <div className="popup__content">
          <button className="popup__close-btn hoover" type="button" onClick={onClose} />
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <p className="popup__image-title">
            {card?.name}
          </p>
        </div>
      </div>
    );
  }
  
export default ImagePopup;
