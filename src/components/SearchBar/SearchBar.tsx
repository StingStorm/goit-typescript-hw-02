import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { IoIosSearch } from 'react-icons/io';
import { FormEvent } from 'react';

type Props = {
  onSearch: (userQuery: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const searchBar = form.elements.namedItem('searchBar') as HTMLInputElement;

    const userQuery: string = searchBar.value.trim();

    if (userQuery === '') {
      toast.error('Please enter search term!');

      return;
    }

    onSearch(userQuery);
    form.reset();
  };
  return (
    <div className={css.searchBarContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchBar"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.searchBtn} type="submit">
          <IoIosSearch className={css.icon} size={'18px'} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
