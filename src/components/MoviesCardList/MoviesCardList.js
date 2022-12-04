import { useEffect, useState } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { CardHelper } from '../../utils/cardHelper';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';
import { mainApiClient } from '../../utils/MainApi';

import './MoviesCardList.css';

const MIN_CARDS_TO_SHOW = 3;

export function MoviesCardList({ cards, cardsLabel }) {
  const MAX_AMOUNT = cards?.length ?? 0;
  const [moreCardAmount, setMoreCardAmount] = useState(CardHelper.getMoreCardAmount());
  const [shownCards, setShownCards] = useState(CardHelper.getShownCards(cards, CardHelper.getMaxCardAmount()));
  const dimensions = useResizeObserver();

  const handleMoreClick = () => {
    if (shownCards?.length > MAX_AMOUNT + moreCardAmount) {
      return;
    }
    setShownCards(CardHelper.getShownCards(cards, shownCards?.length + moreCardAmount));
  };

  useEffect(() => {
    setShownCards(CardHelper.getShownCards(cards, CardHelper.getMaxCardAmount()));
  }, [cards]);

  useEffect(() => {
    setMoreCardAmount(CardHelper.getMoreCardAmount());
  }, [cards, dimensions, moreCardAmount, shownCards?.length]);

  // FIXME: Проверить после добавления авторизации 
  // Клик по иконке без заливки должен отправлять запрос к /movies
  // нашего API на сохранение фильма. Клик по иконке с заливкой — запрос на удаление.

  const handleClick = async (isSaved, card) => {
    const cardData = {
      country: card?.country,
      director: card?.director,
      duration: card?.duration,
      year: card?.year,
      description: card?.description,
      image: `${beatfilmMoviesRequestParams.baseUrl}${card?.image?.url ?? ''}`,
      trailerLink: card?.trailerLink,
      thumbnail: `${beatfilmMoviesRequestParams.baseUrl}${card?.image?.formats?.thumbnail?.url ?? ''}`,
      movieId: card?.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN
    };

    if (!isSaved) {
      await mainApiClient.addNewMovies(cardData);
      return;
    }
    await mainApiClient.deleteMovieById(card?.id);
  };

  return (
    <section className="cards">
      <div className="cards__container">
        {shownCards.length ? (
          shownCards.map((card, key) => {
            return (
              <MoviesCard
                key={key}
                src={`${beatfilmMoviesRequestParams.baseUrl}${card?.image?.url ?? ''}`}
                label={card?.nameRU}
                duration={card?.duration}
                trailerLink={card?.trailerLink}
                isSaved={card?.isSaved}
                hasDeleteBtn={card?.hasDeleteBtn}
                handleClick={handleClick}
                card={card}
              />
            );
          })
        ) : (
          <p className="cards__empty">{cardsLabel}</p>
        )}
      </div>
      {shownCards?.length >= MIN_CARDS_TO_SHOW && shownCards?.length < cards?.length && (
        <button className="cards__button" onClick={handleMoreClick}>
          Еще
        </button>
      )}
    </section>
  );
}
