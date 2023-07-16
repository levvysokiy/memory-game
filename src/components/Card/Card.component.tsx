import { FC, useCallback, memo } from 'react';
import cn from 'classnames';
import styles from './Card.module.scss';
import { getImageSrc } from '../../utils';
import CardSide from './CardSide/CardSide.component';
import type { TCard } from '@/types';

interface CardProps {
  card: TCard;
  handleClick: (index: number) => void;
  index: number;
  flipped: boolean;
  guessed: boolean;
}

const Card: FC<CardProps> = memo(
  ({ card, index, handleClick, flipped, guessed }) => {
    const { rank, suit } = card;

    const onClick = useCallback(() => {
      handleClick(index);
    }, [index, handleClick]);

    return (
      <div
        onClick={onClick}
        className={cn(
          styles.card,
          guessed && styles.hidden,
          flipped && styles.flipped
        )}
      >
        <div className={styles.cardInner}>
          <CardSide className={styles.cardFront} imageSrc={card.imageSrc} />
          <CardSide className={styles.cardBack} />
        </div>
      </div>
    );
  }
);

export default Card;
