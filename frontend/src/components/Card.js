import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'; 

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext); 
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = `elements__like-btn hoover-like ${isLiked ? 'elements__like-btn_active' : ''}`;
    
    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
      onCardLike(card);
    };

    const handleDeleteClick = () => {
      onCardDelete(card);
    };

    return (
      <div className="elements__card">
        {isOwn && <button className="elements__del-btn hoover" type="button" onClick={handleDeleteClick} />} 
        <img className="elements__img" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="elements__card-container">
          <h2 className="elements__title">{card.name}</h2>
          <div className="elements__like-area">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
            <span className="elements__likes-counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    );
}

export default Card;