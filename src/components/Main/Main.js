import { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo';
import { NavTab } from '../NavTab/NavTab';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';

import './Main.css';

export function Main() {
  return (
    <>
      <Header/>
      <Promo/>
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </>
  );
}
