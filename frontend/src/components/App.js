import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Footer from './Footer';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/Auth';
import { useNavigate } from 'react-router-dom';



function App() {

  const [isProfileEditPopupOpen, setIsProfileEditPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isAvatarEditPopupOpen, setIsAvatarEditPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();

  const updateUserData = (newEmail) => {
    setCurrentUser(current => ({ ...current, email: newEmail }));
  };

  useEffect(() => {
    const checkToken = async () => {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        try {
          const tokenData = await auth.checkToken(jwt);
          updateUserData(tokenData.data.email);
          setIsLogined(true);
          performNavigation();
        } catch (err) {
          console.log(err);
          setIsLogined(false);
        }
      }
    };
    
    checkToken();
  }, []);

  useEffect(() => {
    if (isLogined) {
      Promise.all([api.getUserInfo(), api.getInitialCards()]) 
      .then(([userInfo, initialCards]) => { 
        setCurrentUser({...currentUser, ...userInfo}); 
        setCards(initialCards);
      }) 
      .catch((err) => { 
        console.log(err); 
      });
    }
  }, [isLogined]);

  const handleRegistration = async (email, password, onSuccessful, onFailed) => {
    try {
      await auth.register(email, password);
      onSuccessful(); 
    } catch (error) {
      console.log(error);
      onFailed(); 
    }
  };

  const handleLogin = async (email, password, onSuccessful, onFailed) => {
    try {
      const authData = await auth.login(email, password);
      localStorage.setItem('jwt', authData.token);
      updateUserData(email);
      setIsLogined(true);
      onSuccessful();
    } catch (error) {
      console.log(error);
      onFailed(); 
    }
  };
  
  const performNavigation = () => {
    navigate('/');
  };
  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleAvatarEditClick = () => {
    setIsAvatarEditPopupOpen(true);
  };
  
  const handleProfileEditClick = () => {
    setIsProfileEditPopupOpen(true);
  };
  
  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsProfileEditPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsAvatarEditPopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.updateProfile(name, about)
      .then((updatedUserInfo) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: updatedUserInfo.name,
          about: updatedUserInfo.about,
        }));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then((updatedUserInfo) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          avatar: updatedUserInfo.avatar
        }));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddCard(cardData) {
    api.addCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt'); 
    setIsLogined(false); 
    navigate('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLogined={isLogined} onLogout={handleLogout} userEmail={currentUser.email}/>
      <Routes>
        <Route path="/sign-in" element={
          <Login
            handleLogin={handleLogin}
            title="Вход"
            name="Login"
            buttonText="Войти"
          />
          } 
        />
        <Route path="/sign-up" element={
          <Register
            handleRegistration={handleRegistration} 
            title="Регистрация"
            name="Register"
            buttonText="Зарегистрироваться"
          />}
        />
        <Route 
          path="/"
          element={
          <ProtectedRoute isLogined={isLogined}>
            <>
              <Main 
                onProfileEdit={handleProfileEditClick}
                onAddCard={handleAddCardClick}
                onAvatarEdit={handleAvatarEditClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
              <EditProfilePopup
                isOpen={isProfileEditPopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                isOpen={isAvatarEditPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <AddCardPopup
                isOpen={isAddCardPopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddCard}
              />
              <PopupWithForm
                    title="Вы уверены?"
                    name="del"
                    buttonText="Да"
                    isSubmitDisabled={false}
                  >
              </PopupWithForm>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </>
          </ProtectedRoute>
            } 
        />
        <Route 
          path="*"
          element={isLogined ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
