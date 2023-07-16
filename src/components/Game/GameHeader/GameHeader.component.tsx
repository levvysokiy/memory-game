import { FC } from 'react';
import cn from 'classnames';
import styles from './GameHeader.module.scss';
import { TIME_TO_REMEMBER_S } from '@/const';
import { useCountdown } from '@/hooks/useCountdown';

interface GameHeaderProps {
  startGame: () => void;
  isGameStarted: boolean;
  moves: number;
  timer: string;
}

const GameHeader: FC<GameHeaderProps> = ({
  startGame,
  isGameStarted,
  timer,
  moves,
}) => {
  const countdown: number = useCountdown(TIME_TO_REMEMBER_S, startGame);

  return (
    <div className={cn(styles.header)}>
      {!isGameStarted ? (
        <>
          <span>Remember the cards!</span>
          <span>{countdown}</span>
        </>
      ) : (
        <>
          <span>Moves: {moves}</span>
          <span>{timer}</span>
        </>
      )}
    </div>
  );
};

export default GameHeader;
