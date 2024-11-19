import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/AppHeader/AppHeader';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchingGalleryPage } from './services/gallery-api';
import { useEffect, useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { ThreeCircles } from 'react-loader-spinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { isAxiosError } from 'axios';
import { GalleryItemType } from './App.types';

function App() {
  const [gallery, setGallery] = useState<GalleryItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<GalleryItemType | null>(
    null
  );

  useEffect(() => {
    const getGellery = async (query: string, pageNum: number) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { results, total_pages: totalPages } =
          await fetchingGalleryPage<GalleryItemType>(query, pageNum);

        if (currentPage === totalPages) {
          toast("Unfortunately you've reached the end of the gallery", {
            icon: '🅿️',
          });

          setIsLastPage(true);
        }

        if (currentPage > 1) {
          setGallery(prevPage => {
            return [...prevPage, ...results];
          });
        } else {
          setGallery(results);
        }

        if (totalPages === 0) {
          throw new Error('No hits for this search query');
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.message);
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      getGellery(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleSearch = (userQuery: string) => {
    setGallery([]);
    setSearchQuery(userQuery);
    setCurrentPage(1);
  };

  const incrementPageNum = () => {
    setCurrentPage(prevPageNum => {
      return prevPageNum + 1;
    });
  };

  const onOpenModal = (imgObj: GalleryItemType) => {
    setIsOpenModal(true);
    setModalContent(imgObj);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
    setModalContent(null);
  };

  return (
    <>
      <Header />
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} onOpenModal={onOpenModal} />
      )}
      {isLoading ? (
        <ThreeCircles
          innerCircleColor="#ec4646"
          middleCircleColor="#4169e1"
          outerCircleColor="#08265f"
          wrapperStyle={{
            justifyContent: 'center',
          }}
        />
      ) : (
        <>
          {gallery.length > 0 && !isLastPage && (
            <LoadMoreBtn onLoadMore={incrementPageNum} />
          )}
          {isError && <ErrorMessage />}
        </>
      )}
      <ImageModal
        isOpenModal={isOpenModal}
        onClose={onCloseModal}
        modalContent={modalContent}
      />
    </>
  );
}

export default App;
