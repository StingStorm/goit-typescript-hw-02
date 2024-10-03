import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/AppHeader/AppHeader';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchingGalleryPage } from './utils/gallery-api';
import { useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const [gallery, setGallery] = useState([]);

  const handleSearch = async searchQuery => {
    const response = await fetchingGalleryPage(searchQuery);

    setGallery(response);
  };
  return (
    <>
      <Header />
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      <ImageGallery gallery={gallery} />
    </>
  );
}

export default App;
