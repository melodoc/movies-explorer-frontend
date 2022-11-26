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

import { HEADER_TYPES } from '../../constants/headerTypes';
import { ROUTES } from '../../constants/routes';
import { mockedCards, savedCards } from '../../mocked/mockedCards';

function App() {
  const location = useLocation();
  const isAboutPage = location?.pathname === ROUTES.About;
  const areBlocksShown = [
    ROUTES.About,
    ROUTES.Movies,
    ROUTES.SavedMovies
  ].includes(location?.pathname);

  return (
    <>
      {/* FIXME: Перенести в утилиты */}
      {areBlocksShown && (
        <Header
          type={isAboutPage ? HEADER_TYPES.Banner : HEADER_TYPES.Main}
          isLoggedIn={isAboutPage ? false : true}
        />
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
          <Register />
        </Route>
        <Route path={ROUTES.SignIn}>
          <Login />
        </Route>
        <Route path={ROUTES.Movies}>
          <Movies cards={mockedCards} />
        </Route>
        <Route path={ROUTES.SavedMovies}>
          <SavedMovies cards={savedCards} />
        </Route>
        <Route path={ROUTES.Profile}>
          <div>Профиль</div>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {areBlocksShown && <Footer />}
    </>
  );
}

export default App;
