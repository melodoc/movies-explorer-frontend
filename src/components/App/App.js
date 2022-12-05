import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
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

function App() {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userInformation, setUserInformation] = useState({
    email: '',
    loggedIn: false
  });

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isHeaderShown && (
        <Header type={isAboutPage ? HEADER_TYPES.Banner : HEADER_TYPES.Main} isLoggedIn={userInformation.loggedIn} />
      )}
      <Switch>
        <Route path={ROUTES.About} exact>
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </Route>
        <Route path={ROUTES.SignUp}>
          <Register onSubmit={handleRegisterSubmit} isLoading={isLoading} />
        </Route>
        <Route path={ROUTES.SignIn}>
          <Login onSubmit={handleLoginSubmit} isLoading={isLoading} />
        </Route>
        <Route path={ROUTES.Movies}>
          <Movies />
        </Route>
        <Route path={ROUTES.SavedMovies}>
          <SavedMovies/>
        </Route>
        <Route path={ROUTES.Profile}>
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {isFooterShown && <Footer />}
    </>
  );
}

export default App;
