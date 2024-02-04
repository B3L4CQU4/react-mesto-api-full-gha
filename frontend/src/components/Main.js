import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext'; 

function Main({ onProfileEdit, onAddCard, onAvatarEdit, onCardClick, onCardLike, cards, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext); 

    return (
        <main>
          <section className="profile">
            <div className="profile__avatar">
              <img className="profile__img" src={currentUser.avatar} alt="Аватар профиля"/>
              <button className="profile__avatar-edit" onClick={onAvatarEdit} />
            </div>
            <div className="profile__info">
              <div className="profile__container">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-btn hoover" type="button" onClick={onProfileEdit} />
              </div>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button className="profile__add-btn hoover" type="button" onClick={onAddCard} />
          </section>
          <section className="elements">
            {cards.map((card) => (
              <Card 
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </section>
        </main>
      );
  }

export default Main;


