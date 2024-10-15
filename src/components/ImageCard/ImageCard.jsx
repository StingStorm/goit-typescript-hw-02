import css from './ImageCard.module.css';

const ImageCard = ({ image }) => {
  return (
    <>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </>
  );
};

export default ImageCard;
