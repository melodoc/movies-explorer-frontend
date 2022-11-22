import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export function MoviesCardList({ cards }) {
  return (
    <section className="cards">
      <div className="cards__container">
        {cards.map((card, key) => {
          return (
            <MoviesCard
              key={key}
              src={card?.src}
              label={card?.label}
              duration={card?.duration}
              isSaved={card?.isSaved}
              hasDeleteBtn={card?.hasDeleteBtn}
            />
          );
        })}
      </div>
      <button>Еще</button>
    </section>
  );
}
