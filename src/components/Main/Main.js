import { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { headerType } from '../../constants/headerType';
import './Main.css';

export function Main() {
  const isBanner = false;
  const isSaved = true;

  const cards = [
    {
      src: 'https://pm1.narvii.com/7283/db4336ada8dadfd88c83ed5111304b5f0d6eafa0r1-728-1097v2_hq.jpg',
      label: '33 слова о дизайне',
      duration: '1ч 17м',
      isSaved: true
    },
    {
      src: 'https://img.freepik.com/free-photo/pink-sky-background-with-crescent-moon_53876-129048.jpg?w=2000',
      label: 'Бег это свобода',
      duration: '1ч 17м',
    },
    {
      src: 'https://klike.net/uploads/posts/2020-11/1605600161_25.jpg',
      label: 'Gimme Danger: История Игги и The Stooges',
      duration: '1ч 17м'
    }
  ];

  const mockedCards = new Array(5)
    .fill(null)
    .map(() => [...cards])
    .flat();

  const savedCards = [
    {
      src: 'https://pm1.narvii.com/7283/db4336ada8dadfd88c83ed5111304b5f0d6eafa0r1-728-1097v2_hq.jpg',
      label: '33 слова о дизайне',
      duration: '1ч 17м',
      hasDeleteBtn: true
    },
    {
      src: 'https://img.freepik.com/free-photo/pink-sky-background-with-crescent-moon_53876-129048.jpg?w=2000',
      label: 'Бег это свобода',
      duration: '1ч 17м',
      hasDeleteBtn: true
    },
    {
      src: 'https://klike.net/uploads/posts/2020-11/1605600161_25.jpg',
      label: 'Gimme Danger: История Игги и The Stooges',
      duration: '1ч 17м',
      hasDeleteBtn: true
    }
  ];

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
  ) : isSaved ? (
    <>
      <Header type={headerType.Main} isLoggedIn={true} />
      <Movies cards={savedCards} />
      <Footer />
    </>
  ) : (
    <>
      <Header type={headerType.Main} isLoggedIn={true} />
      <Movies cards={mockedCards} />
      <Footer />
    </>
  );
}
