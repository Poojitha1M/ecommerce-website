// components/SearchFilter.tsx
import { useState } from 'react';
import { Product } from '../types';

interface SearchFilterProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('name');

  const categories =  ['All', ...products.map(p => p.category).filter((category, index, self) => self.indexOf(category) === index)];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, selectedCategory, sortOption);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    filterProducts(searchTerm, e.target.value, sortOption);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    filterProducts(searchTerm, selectedCategory, e.target.value);
  };

  const filterProducts = (search: string, category: string, sort: string) => {
    let filtered = products.filter((product:any) => 
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Sort products
    filtered.sort((a, b) => {
      if (sort === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sort === 'price-low') {
        return a.price - b.price;
      } else if (sort === 'price-high') {
        return b.price - a.price;
      } else if (sort === 'rating') {
        return b.rating.rate - a.rating.rate;
      }
      return 0;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;