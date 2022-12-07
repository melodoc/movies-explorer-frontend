import { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { RootPageHelper } from '../../helpers/rootPageHelper';
import { CardHelper } from '../../helpers/cardHelper';
import { ROUTES } from '../../constants/routes';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { authApiClient } from '../../utils/MainApi';
import { mainApiClient } from '../../utils/MainApi';
import { moviesApiClient } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { NotFound } from '../NotFound/NotFound';
import { Profile } from '../Profile/Profile';
import { Toast } from '../Toast/Toast';
import { Preloader } from '../Preloader/Preloader';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userInformation, setUserInformation] = useState({
    email: '',
    loggedIn: !!localStorage.getItem(LOCAL_STORAGE_KEYS.Token)
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [toastLabel, setToastLabel] = useState();
  const [cards, setCards] = useState();
  const [cardsLabel, setCardsLabel] = useState(ERROR_LABELS.Movies.notFound);
  const [savedCards, setSavedCards] = useState();
  const [savedCardsLabel, setSavedCardsLabel] = useState(ERROR_LABELS.Movies.notFound);

  const { headerType, hasHeader, hasFooter } = RootPageHelper.getPageProps(location);

  const handleRegisterSubmit = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await authApiClient.register({ name, email, password });
      history.push(ROUTES.SignIn);
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const res = await authApiClient.login({ email, password });
      localStorage.setItem(LOCAL_STORAGE_KEYS.Token, res.token);
      setUserInformation({ email, loggedIn: true });
      setIsTokenValid(true);
      history.push(ROUTES.Movies);
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeProfile = async ({ email, name }) => {
    console.info(email, name);
    try {
      const userInformation = await mainApiClient.setUserInfo({ email, name });
      setCurrentUser(userInformation ?? {});
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection);
    }
  };

  const loadMainCards = async () => {
    if (!CardHelper.hasSavedFilms()) {
      setIsLoading(true);
      try {
        const movies = await moviesApiClient.getMovies();
        CardHelper.setLocalStorageMovies(movies);
        setCards(movies);
      } catch {
        setCards([]);
        setCardsLabel(ERROR_LABELS.Movies.connection);
        console.error(ERROR_LABELS.Movies.connection);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loadSavedCards = async () => {
    try {
      const movies = await mainApiClient.getMovies();
      setSavedCards(movies);
    } catch {
      setSavedCards([]);
      setSavedCardsLabel(ERROR_LABELS.Movies.connection);
      console.error(ERROR_LABELS.Movies.connection);
    }
  };

  const loadInitData = async () => {
    if (userInformation.loggedIn) {
      try {
        const userInformation = await mainApiClient.getUserInformation();
        setCurrentUser(userInformation ?? {});
      } catch {
        console.error(ERROR_LABELS.Form.connection);
        setToastLabel(ERROR_LABELS.Form.connection);
      }
    }
  };

  const handleLogOut = () => {
    setCards(null);
    setSavedCards(null);
    setCardsLabel(ERROR_LABELS.Movies.notFound);
    setSavedCardsLabel(ERROR_LABELS.Movies.notFound);
  };

  useEffect(() => {
    loadInitData();
  }, [userInformation.loggedIn]);

  useEffect(() => {
    loadMainCards();
    loadSavedCards();
  }, []);

  useEffect(() => {
    setIsTokenValid(!!localStorage.getItem(LOCAL_STORAGE_KEYS.Token));
  }, [isTokenValid]);

  return (
    <>
      {hasHeader && <Header type={headerType} isLoggedIn={userInformation.loggedIn} />}
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path={ROUTES.About} exact>
            <Main />
          </Route>
          <Route path={ROUTES.SignUp}>
            <Register onSubmit={handleRegisterSubmit} isLoading={isLoading} />
          </Route>
          <Route path={ROUTES.SignIn}>
            <Login onSubmit={handleLoginSubmit} isLoading={isLoading} />
          </Route>
          <ProtectedRoute
            path={ROUTES.Movies}
            loggedIn={userInformation.loggedIn}
            component={Movies}
            cards={cards}
            cardsLabel={cardsLabel}
          />
          <ProtectedRoute
            path={ROUTES.SavedMovies}
            loggedIn={userInformation.loggedIn}
            component={SavedMovies}
            savedCards={savedCards}
            savedCardsLabel={savedCardsLabel}
          />
          {!!currentUser && (
            <ProtectedRoute
              path={ROUTES.Profile}
              loggedIn={userInformation.loggedIn}
              component={Profile}
              handleChangeProfile={handleChangeProfile}
              handleProfileLogOut={handleLogOut}
              toastLabel={toastLabel}
            />
          )}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      {toastLabel && <Toast label={toastLabel} />}
      {hasFooter && <Footer />}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}

export default App;
