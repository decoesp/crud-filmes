import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  onFilterClick: () => void;
  onAddMovie: () => void;
  searchValue: string;
}

export function SearchBar({ onSearch, onFilterClick, onAddMovie, searchValue }: SearchBarProps) {
  const [query, setQuery] = useState(searchValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <section className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 py-4 px-4 2xl:container">
      <div className="relative w-full sm:w-[488px] h-[44px]">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full px-4 text-sm sm:text-base text-white bg-[#1A191B] border border-[#49474E] rounded-[4px] placeholder:text-gray-500 focus:outline-none focus:border-[#8E4EC6] transition-colors"
          placeholder="Procure um filme"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="h-5 w-5 sm:h-6 sm:w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#8E4EC6] transition-colors"
        >
          <Search className="w-full h-full" />
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4">
        <button
          onClick={onFilterClick}
          className="flex-1 sm:flex-none sm:w-[85px] h-[44px] min-h-[44px] rounded-[2px] flex items-center justify-center gap-3 text-white transition-colors hover:opacity-90"
          style={{ 
            background: '#B744F714',
            backdropFilter: 'blur(4px)',
            padding: '12px 20px'
          }}
        >
          <span className="text-sm font-medium">Filtros</span>
        </button>

        <button
          onClick={onAddMovie}
          className="flex-1 sm:flex-none sm:w-[151px] h-[44px] min-h-[44px] rounded-[2px] text-sm font-medium text-white transition-colors hover:opacity-90 whitespace-nowrap"
          style={{ 
            background: '#8E4EC6',
            padding: '12px 20px'
          }}
        >
          Adicionar Filme
        </button>
      </div>
    </section>
  );
}
