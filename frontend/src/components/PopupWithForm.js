function PopupWithForm(
  { title,
    name,
    children,
    isOpen,
    onClose,
    buttonText,
    isSubmitDisabled,
    onSubmit
  }){
  // Определение класса для кнопки в зависимости от типа попапа и состояния кнопки 😢
  const buttonClassName = `popup__save-btn ${name === 'del' ? 'popup__save-btn_del hoover-save' : 'hoover-save'} ${isSubmitDisabled ? 'popup__save-btn_disabled' : ''}`;

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`} id={`${name}Popup`}>
      <div className="popup__container">
        <button className="popup__close-btn hoover" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" method="post" name={`${name}Form`} id={`${name}Form`} onSubmit={onSubmit}>
          {children}
          <button className={buttonClassName} type="submit" disabled={isSubmitDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;