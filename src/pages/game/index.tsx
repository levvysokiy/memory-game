import { FC } from 'react';
import Game from '@/components/Game/Game.component';
import { getRandomCards } from '@/utils';
import type { TCard } from '@/types';

import styles from './GamePage.module.scss';

type TGamePageProps = {
  cards: TCard[];
};

const GamePage: FC<TGamePageProps> = (props) => {
  return (
    <div className={styles.gamePage}>
      <Game cards={props.cards} />;
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      cards: getRandomCards(),
    },
  };
}

export default GamePage;
