import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/AppHeader/AppHeader';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchingGalleryPage } from './utils/gallery-api';
import { useEffect, useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    //Should I use 'useCallback' for this func outside of useEffect?
    const getGellery = async (query, pageNum) => {
      setIsLoading(true);

      try {
        const { results, total_pages: totalPages } = await fetchingGalleryPage(
          query,
          pageNum
        );

        setIsLastPage(currentPage >= totalPages);

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
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      getGellery(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleSearch = userQuery => {
    setSearchQuery(userQuery);
    setCurrentPage(1);
  };

  const incrementPageNum = () => {
    setCurrentPage(prevPageNum => {
      return prevPageNum + 1;
    });
  };

  return (
    <>
      <Header />
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {gallery.length > 0 && <ImageGallery gallery={gallery} />}
      {isLoading && <p>Loading....</p>}
      {gallery.length > 0 && !isLastPage && !isLoading && (
        <LoadMoreBtn onLoadMore={incrementPageNum} />
      )}
      {isError && <p>Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</p>}
    </>
  );
}

export default App;
