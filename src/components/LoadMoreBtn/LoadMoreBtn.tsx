import css from './LoadMoreBtn.module.css';

type Props = {
  onLoadMore: () => void,
};

const LoadMoreBtn = ({ onLoadMore }: Props) => {
  return (
    <>
      <button className={css.loadMoreBtn} type="button" onClick={onLoadMore}>
        Load More
      </button>
    </>
  );
};

export default LoadMoreBtn;
