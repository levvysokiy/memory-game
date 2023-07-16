import Image from 'next/image';
import { FC } from 'react';

const CARD_BACK_IMAGE_SRC = '/img/cards/card_back.svg';

type TCardSideProps = {
  className: string;
  imageSrc?: string;
};

const CardSide: FC<TCardSideProps> = ({ className, imageSrc }) => {
  return (
    <div className={className}>
      <Image
        src={imageSrc || CARD_BACK_IMAGE_SRC}
        alt={'Card.svg'}
        width={110}
        height={160}
      />
    </div>
  );
};

export default CardSide;
