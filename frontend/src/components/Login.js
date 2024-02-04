import React, { useState, useEffect } from 'react';
import auth from '../utils/Auth';
import OkImg from '../images/union.svg'
import NotOkImg from '../images/unionRed.svg'
import InfoTooltip from './InfoTooltip';
import { useNavigate } from 'react-router-dom';

function Login({buttonText, title, name, handleLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSuccessful = () => {
    navigate('/'); 
  };

  const onFailed = () => {
    setIsErrorPopupOpen(true); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password, onSuccessful, onFailed);
  };

  const closeErrorPopup = () => {
    setIsErrorPopupOpen(false);
    setPassword('');
    setEmail('');
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
            value={email}
            onChange={handleEmailChange}
            type="email"
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
        </form>
      </div>
      <InfoTooltip
        name="error"
        isOpen={isErrorPopupOpen}
        infoText="Что-то пошло не так! Попробуйте ещё раз."
        infoImg={NotOkImg}
        onClose={closeErrorPopup}
      />
    </div>
  );
}
  
export default Login;