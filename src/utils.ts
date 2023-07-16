import type { TCard } from '@/types';
import { Ranks, Suits } from '@/types';
import { CARD_PAIRS_NUMBER } from '@/const';
import { v4 as uuid } from 'uuid';

export const key = (suit: Suits, rank: Ranks): string => {
  return `${suit}_${rank}`;
};

export const generateDeck = (): TCard[] => {
  const cards: TCard[] = [];
  for (const rank of Object.values(Ranks)) {
    for (const suit of Object.values(Suits)) {
      cards.push({
        id: '',
        key: key(suit, rank),
        imageSrc: getImageSrc(suit, rank),
        rank,
        suit,
      });
    }
  }

  return cards;
};

export const shuffle = (cards: TCard[]): TCard[] => {
  return cards.sort(() => Math.random() - 0.5);
};

export const getRandomCards = (): TCard[] => {
  const deck: TCard[] = generateDeck();
  const cardSet: TCard[] = shuffle(deck).slice(0, CARD_PAIRS_NUMBER);
  const clonedCardSet: TCard[] = cardSet.map((card) => Object.assign({}, card));
  const doubledCardSet: TCard[] = cardSet.concat(clonedCardSet);

  doubledCardSet.forEach((card) => {
    card.id = uuid();
  });

  return shuffle(doubledCardSet);
};

export const getImageSrc = (suit: Suits, rank: Ranks): string => {
  return `/img/cards/${rank}_of_${suit}.svg`;
};
