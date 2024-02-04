import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = ''; 
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatarEdit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__input"
        type="url"
        name="avatarUrl"
        id="avatarUrlInput"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="avatarUrl-error" className="error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;