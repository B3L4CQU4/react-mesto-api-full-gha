import logo from '../images/logo.svg'
import { useNavigate, useLocation } from 'react-router-dom';

function Header({isLogined, onLogout, userEmail}) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate('/sign-in'); 
  };

  const handleRegisterRedirect = () => {
    navigate('/sign-up'); 
  };

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип сайта"
      />
      <div className='header__log-container'>
        {isLogined && (
          <>
            <div className="header__log-info">
              {userEmail}
            </div>
            <button className='header__log-btn' onClick={onLogout}>Выйти</button>
          </>
        )}
        {!isLogined && location.pathname === '/sign-up' && (
          <button className='header__log-btn' onClick={handleLoginRedirect}>Войти</button>
        )}
        {!isLogined && location.pathname === '/sign-in' && (
          <button className='header__log-btn' onClick={handleRegisterRedirect}>Регистрация</button>
        )}
      </div>
    </header>
  )
}

export default Header