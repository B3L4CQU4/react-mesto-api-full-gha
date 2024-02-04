import React, { useState, useEffect, useContext }  from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); 
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }
      
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
    }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profileEdit"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      isSubmitDisabled={false}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        autoComplete="off"
        placeholder="Имя"
        name="name"
        id="nameInput"
        minLength={2}
        maxLength={40}
        required
        value={name}
        onChange={handleNameChange}
      />
      <span id="name-error" className="error" />
      <input
        className="popup__input"
        autoComplete="off"
        placeholder="Вид деятельности"
        name="job"
        id="jobInput"
        minLength={2}
        maxLength={200}
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span id="job-error" className="error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
