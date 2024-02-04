import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddCardPopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addCard"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__input"
        autoComplete="off"
        placeholder="Название"
        name="title"
        id="titleInput"
        minLength={2}
        maxLength={30}
        required
        value={name}
        onChange={handleNameChange}
      />
      <span id="title-error" className="error" />
      <input
        className="popup__input"
        placeholder="Ссылка на картинку"
        name="URL"
        id="urlInput"
        type="url"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span id="URL-error" className="error" />
    </PopupWithForm>
  );
}

export default AddCardPopup;