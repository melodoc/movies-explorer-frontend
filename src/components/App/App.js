import { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { RootPageHelper } from '../../helpers/rootPageHelper';
import { ROUTES } from '../../constants/routes';
import { TOAST_LABELS } from '../../constants/toastLabels';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { authApiClient } from '../../utils/MainApi';
import { mainApiClient } from '../../utils/MainApi';
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
import { CardHelper } from '../../helpers/cardHelper';
import { moviesApiClient } from '../../utils/MoviesApi';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [cards, setCards] = useState();
  const [savedCards, setSavedCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userInformation, setUserInformation] = useState({
    email: '',
    name: '',
    loggedIn: false
  });
  const [toastLabel, setToastLabel] = useState();
  const [cardsLabel, setCardsLabel] = useState("");
  const [savedCardsLabel, setSavedCardsLabel] = useState(TOAST_LABELS.Movies.notFound);
  const { headerType, hasHeader, hasFooter } = RootPageHelper.getPageProps(location);

  const checkValidity = async () => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.Token);
      const res = await authApiClient.checkValidity(token);
      setUserInformation({ email: res.email, name: res.name, loggedIn: true });
      setIsTokenValid(true);
      await loadSavedCards();
    } catch {
      setIsTokenValid(false);
    }
  };

  const handleRegisterSubmit = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await authApiClient.register({ name, email, password });
      const res = await authApiClient.login({ email, password });
      localStorage.setItem(LOCAL_STORAGE_KEYS.Token, res.token);
      setUserInformation({ name, email, loggedIn: true });
      setIsTokenValid(true);
      await loadSavedCards();
      history.push(ROUTES.Movies);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const res = await authApiClient.login({ email, password });
      localStorage.setItem(LOCAL_STORAGE_KEYS.Token, res.token);
      await checkValidity();
      setIsTokenValid(true);
      history.push(ROUTES.Movies);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeProfile = async ({ email, name }) => {
    try {
      const userInformation = await mainApiClient.setUserInfo({ email, name });
      setUserInformation(userInformation ?? {});
      setIsTokenValid(true);
      setToastLabel(TOAST_LABELS.Profile.change);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
    }
  };

  const loadInitialCards = async () => {
    if (!CardHelper.hasSavedFilms()) {
      setIsLoading(true);
      try {
        const movies = await moviesApiClient.getMovies();
        CardHelper.setLocalStorageMovies(movies);
        setCards(movies);
      } catch {
        setCards([]);
        setCardsLabel(TOAST_LABELS.Movies.connection);
        console.error(TOAST_LABELS.Movies.connection);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loadSavedCards = async () => {
    setIsLoading(true);
    try {
      const movies = await mainApiClient.getMovies();
      setSavedCards(movies);
    } catch {
      setSavedCards([]);
      setSavedCardsLabel(TOAST_LABELS.Movies.connection);
      console.error(TOAST_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const hasToken = !!CardHelper.getToken() || isTokenValid;

  useEffect(() => {
    hasToken && loadInitialCards();
  }, [hasToken]);

  const handleLogOut = () => {
    history.push(ROUTES.Movies);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.Token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.Movies);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.Checkbox);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SearchQuery);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SavedMovies);
    setUserInformation({ email: '', name: '', loggedIn: false });
    setToastLabel(undefined);
    setIsTokenValid(false);
  };

  useEffect(() => {
    checkValidity();
  }, []);

  return (
    <>
      {hasHeader && <Header type={headerType} isLoggedIn={isTokenValid} />}
      <CurrentUserContext.Provider value={userInformation}>
        <Switch>
          <Route path={ROUTES.About} exact>
            <Main />
          </Route>
          <ProtectedRoute
            path={ROUTES.SignUp}
            loggedIn={!isTokenValid}
            component={Register}
            onSubmit={handleRegisterSubmit}
            isLoading={isLoading}
          />
          <ProtectedRoute
            path={ROUTES.SignIn}
            loggedIn={!isTokenValid}
            component={Login}
            onSubmit={handleLoginSubmit}
            isLoading={isLoading}
          />
          <ProtectedRoute
            path={ROUTES.Movies}
            loggedIn={hasToken}
            component={Movies}
            cards={cards}
            savedCards={savedCards}
            cardsLabel={cardsLabel}
            isLoading={isLoading}
          />
          <ProtectedRoute
            path={ROUTES.SavedMovies}
            loggedIn={hasToken}
            component={SavedMovies}
            savedCards={savedCards}
            savedCardsLabel={savedCardsLabel}
            isLoading={isLoading}
            loadSavedCards={loadSavedCards}
          />
          <ProtectedRoute
            path={ROUTES.Profile}
            loggedIn={hasToken}
            component={Profile}
            handleChangeProfile={handleChangeProfile}
            handleProfileLogOut={handleLogOut}
            toastLabel={toastLabel}
          />
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
