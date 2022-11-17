import { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { Movies } from '../Movies/Movies';
import { headerType } from '../../constants/headerType';
import './Main.css';

export function Main() {
  const isBanner = true;

  return isBanner ? (
    <>
    {/* FIXME:  Задавать header в зависимости от роута*/}
      <Header type={headerType.Banner} />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  ) : (
    <>
      <Header type={headerType.Main} isLoggedIn={true} />
      <SearchForm />
      <Movies />
      <Footer />
    </>
  );
}
