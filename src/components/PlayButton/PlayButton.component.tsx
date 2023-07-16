import Link from 'next/link';
import { GAME_PAGE_URL } from '../../const';
import styles from './PlayButton.module.scss';

const PlayButton = () => {
  return (
    <Link href={GAME_PAGE_URL}>
      <button className={styles.playButton}>PLAY</button>
    </Link>
  );
};

export default PlayButton;
