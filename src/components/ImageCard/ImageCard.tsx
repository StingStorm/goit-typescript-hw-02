import { GalleryItemType } from '../../App.types';
import css from './ImageCard.module.css';

type Props = {
  image: GalleryItemType;
  onOpenModal: (imgObj: GalleryItemType) => void;
};

const ImageCard = ({ image, onOpenModal }: Props) => {
  return (
    <>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description ?? 'gallery-item-image'}
        onClick={() => onOpenModal(image)}
      />
    </>
  );
};

export default ImageCard;
