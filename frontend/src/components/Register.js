import React, { useState, useEffect } from 'react';
import auth from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import OkImg from '../images/union.svg'
import NotOkImg from '../images/unionRed.svg'
import InfoTooltip from './InfoTooltip';

function Register({buttonText, title, name, handleRegistration}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate('/sign-in');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSuccessful = () => {
    setInfoText('Вы успешно зарегистрировались!');
    setImgPath(OkImg);
    setIsPopupOpen(true);
    setIsRegistrationSuccessful(true);
  };

  const onFailed = () => {
    setInfoText('Что-то пошло не так! Попробуйте ещё раз.');
    setImgPath(NotOkImg);
    setIsPopupOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration(email, password, onSuccessful, onFailed);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPassword('');
    setEmail('');
    if (isRegistrationSuccessful) {
      auth.login(email, password);
      navigate('/');
    }
  };

  return (
    <div className='authorization'>
      <div className="authorization__container">
        <h2 className="authorization__title">{title}</h2>
        <form className="authorization__form" onSubmit={handleSubmit} method="post" name={`${name}Form`} id={`${name}Form`}>
          <input
            className="authorization__input"
            autoComplete="off"
            placeholder="Email"
            name="email"
            id="emailInput"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <span id="email-error" className="error" />
          <input
            className="authorization__input"
            placeholder="Пароль"
            name="password"
            id="passwordInput"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span id="password-error" className="error" />
          <button className="authorization__save-btn" type="submit">
            {buttonText}
          </button>
          <button className="authorization__btn" onClick={handleSignInRedirect}>Уже зарегистрированы? Войти</button>
        </form>
      </div>
      <InfoTooltip
        name="InfoPopup"
        isOpen={isPopupOpen}
        infoText={infoText}
        infoImg={imgPath}
        onClose={closePopup}
      />
    </div>
  );
}

export default Register;