import { Switch, Route, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
import { Movies } from '../Movies/Movies';

import { HEADER_TYPES } from '../../constants/headerTypes';
import { ROUTES } from '../../constants/routes';
import { mockedCards, savedCards } from '../../mocked/mockedCards';

function App() {
  const location = useLocation();

  return (
    <>
      {/* FIXME: Перенести в утилиты */}
      <Header
        type={
          location?.pathname === ROUTES.About
            ? HEADER_TYPES.Banner
            : HEADER_TYPES.Main
        }
        isLoggedIn={
          location?.pathname === ROUTES.About ? false : true
        }
      />
      <Switch>
        <Route path={ROUTES.About} exact>
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </Route>
        <Route path={ROUTES.SignUp}>
          <div>Регистрация</div>
        </Route>
        <Route path={ROUTES.SignIn}>
          <div>Войти</div>
        </Route>
        <Route path={ROUTES.Movies}>
          <Movies cards={mockedCards} />
        </Route>
        <Route path={ROUTES.SavedMovies}>
          <Movies cards={savedCards} />
        </Route>
        <Route path={ROUTES.Profile}>
          <div>Профиль</div>
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
