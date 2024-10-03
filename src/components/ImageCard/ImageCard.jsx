import css from './ImageCard.module.css';

const ImageCard = ({ images }) => {
  return (
    <div className={CSS.imageThumb}>
      <img
        className={css.image}
        src={images.urls.small}
        alt={images.alt_description}
      />
    </div>
  );
};

export default ImageCard;
