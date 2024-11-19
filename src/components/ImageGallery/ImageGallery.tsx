import { GalleryItemType } from '../../App.types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

type Props = {
  gallery: GalleryItemType[];
  onOpenModal: (imgObj: GalleryItemType) => void;
};
const ImageGallery = ({ gallery, onOpenModal }: Props) => {
  return (
    <ul className={css.galleryList}>
      {gallery.map(item => {
        return (
          <li className={css.galleryItem} key={item.id}>
            <ImageCard image={item} onOpenModal={onOpenModal} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
