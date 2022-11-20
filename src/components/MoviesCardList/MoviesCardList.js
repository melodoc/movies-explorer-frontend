import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export function MoviesCardList() {
  return (
    <div className="moviesCardList">
      компонент, который управляет отрисовкой карточек фильмов на
      страницу и их количеством
      <MoviesCard />
    </div>
  );
}
