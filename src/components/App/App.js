import { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { NotFound } from '../NotFound/NotFound';
import { Profile } from '../Profile/Profile';
import { HEADER_TYPES } from '../../constants/headerTypes';
import { ROUTES } from '../../constants/routes';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { authApiClient } from '../../utils/MainApi';
import { mainApiClient } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Toast } from '../Toast/Toast';

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

  /* FIXME: Перенести в утилиты */
  const isAboutPage = location?.pathname === ROUTES.About;
  const isHeaderShown = [ROUTES.About, ROUTES.Movies, ROUTES.SavedMovies, ROUTES.Profile].includes(location?.pathname);
  const isFooterShown = [ROUTES.About, ROUTES.Movies, ROUTES.SavedMovies].includes(location?.pathname);

  const handleRegisterSubmit = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await authApiClient.register({ name, email, password });
      history.push(ROUTES.SignIn);
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection)
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
      setToastLabel(ERROR_LABELS.Form.connection)
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

  useEffect(() => {
    loadInitData();
  }, [userInformation.loggedIn]);


  useEffect(() => {
    setIsTokenValid(!!localStorage.getItem(LOCAL_STORAGE_KEYS.Token));
  }, [isTokenValid]);

  return (
    <>
      {isHeaderShown && (
        <Header type={isAboutPage ? HEADER_TYPES.Banner : HEADER_TYPES.Main} isLoggedIn={userInformation.loggedIn} />
      )}
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
          <ProtectedRoute path={ROUTES.Movies} loggedIn={userInformation.loggedIn} component={Movies} />
          <ProtectedRoute path={ROUTES.SavedMovies} loggedIn={userInformation.loggedIn} component={SavedMovies} />
          {!!currentUser && (
            <ProtectedRoute
              path={ROUTES.Profile}
              loggedIn={userInformation.loggedIn}
              component={Profile}
              handleChangeProfile={handleChangeProfile}
              toastLabel={toastLabel}
            />
          )}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      {toastLabel && <Toast label={toastLabel} />}
      {isFooterShown && <Footer />}
    </>
  );
}

export default App;
