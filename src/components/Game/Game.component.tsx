import { FC, useEffect, useMemo, useState } from 'react';
import { TIME_TO_EVALUATE_MS } from '@/const';
import Card from '@/components/Card/Card.component';
import styles from './Game.module.scss';
import type { TCard } from '@/types';
import GameHeader from './GameHeader/GameHeader.component';
import { useTimer } from '../../hooks/useTimer';

interface GameProps {
  cards: TCard[];
}

const Game: FC<GameProps> = ({ cards }) => {
  const initialStatus: boolean[] = useMemo(() => cards.map(() => false), []);

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [filppedStatus, setFlippedStatus] = useState<boolean[]>(initialStatus);
  const [guessedStatus, setGuessedStatus] = useState<boolean[]>(initialStatus);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);

  const timer: string = useTimer(isGameStarted, isGameFinished);

  useEffect(() => {
    if (openedCards.length === 2) evaluate();
  }, [openedCards]);

  useEffect(() => {
    if (guessedStatus.every(Boolean)) setIsGameFinished(true);
  }, [guessedStatus]);

  const setStatusState = (
    state: boolean[],
    stateUpdater: (status: boolean[]) => void
  ): void => {
    const [firstIndex, secondIndex] = openedCards;
    const stateCopy = [...state];
    stateCopy[firstIndex] = true;
    stateCopy[secondIndex] = true;

    stateUpdater(stateCopy);
  };

  const isCardsEquals = (): boolean => {
    const [firstIndex, secondIndex] = openedCards;

    return cards[firstIndex].key === cards[secondIndex].key;
  };

  const evaluate = (): void => {
    setDisabled(true);

    setTimeout(() => {
      if (isCardsEquals()) {
        setStatusState(guessedStatus, setGuessedStatus);
      } else {
        setStatusState(filppedStatus, setFlippedStatus);
      }

      setOpenedCards([]);
      setDisabled(false);
    }, TIME_TO_EVALUATE_MS);
  };

  const handleClick = (index: number): void => {
    if (!isGameStarted || disabled) return;

    const flippedStatusCopy = [...filppedStatus];
    flippedStatusCopy[index] = !flippedStatusCopy[index];

    const openedCardsCopy = [...openedCards];

    if (openedCardsCopy.length === 1) {
      setMoves((prev) => prev + 1);
    }

    if (openedCardsCopy.includes(index)) {
      openedCardsCopy.pop();
    } else {
      openedCardsCopy.push(index);
    }

    setOpenedCards(openedCardsCopy);
    setFlippedStatus(flippedStatusCopy);
  };

  const startGame = (): void => {
    setFlippedStatus(filppedStatus.map(() => true));
    setIsGameStarted(true);
  };

  return (
    <div className={styles.game}>
      <>
        <GameHeader
          startGame={startGame}
          isGameStarted={isGameStarted}
          timer={timer}
          moves={moves}
        />
        <div className={styles.board}>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              handleClick={handleClick}
              index={index}
              flipped={filppedStatus[index]}
              guessed={guessedStatus[index]}
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default Game;
