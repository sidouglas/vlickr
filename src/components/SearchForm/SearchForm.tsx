import { SearchInput } from '../SearchInput';
import { SearchFormProps } from './types';

export const SearchForm = ({ handleOnChange, handleSubmit, isFetching }: SearchFormProps) => (
  <div className="flex items-center">
    <form className="flex" onSubmit={handleSubmit} method="get">
      <SearchInput onChange={handleOnChange} id="search" name="search" className="px-2 py-1" />
      <button
        name="search"
        className="rounded-r-lg bg-secondary px-4 py-1"
        type="submit"
        disabled={isFetching}
      >
        Search
      </button>
    </form>
  </div>
);
