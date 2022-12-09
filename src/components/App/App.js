import { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { RootPageHelper } from '../../helpers/rootPageHelper';
import { ROUTES } from '../../constants/routes';
import { ERROR_LABELS } from '../../constants/errorLabels';
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

function App() {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userInformation, setUserInformation] = useState({
    email: '',
    name: '',
    loggedIn: false
  });
  const [toastLabel, setToastLabel] = useState();

  const { headerType, hasHeader, hasFooter } = RootPageHelper.getPageProps(location);

  const checkValidity = async () => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.Token);
      const res = await authApiClient.checkValidity(token);
      setUserInformation({ email: res.email, name: res.name, loggedIn: true });
      setIsTokenValid(true);
    } catch {
      console.error(ERROR_LABELS.Form.connection);
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
      history.push(ROUTES.Movies);
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
      await checkValidity();
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
      setUserInformation(userInformation ?? {});
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.Token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.Movies);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.Checkbox);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SearchQuery);
    setUserInformation({ email: '', name: '', loggedIn: false });
    setToastLabel(undefined);
    history.push(ROUTES.Movies);
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
          <ProtectedRoute path={ROUTES.Movies} loggedIn={isTokenValid} component={Movies} />
          <ProtectedRoute path={ROUTES.SavedMovies} loggedIn={isTokenValid} component={SavedMovies} />
          <ProtectedRoute
            path={ROUTES.Profile}
            loggedIn={isTokenValid}
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
