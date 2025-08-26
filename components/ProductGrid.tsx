// components/ProductGrid.tsx
import { Product } from '../types';
import { ClipLoader } from 'react-spinners';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
  loading: boolean
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart, loading }) => {
  if (loading){
    return (
        <div className="text-center py-12">
    <div className="loader-container d-flex flex-column justify-content-center align-items-center mt-5">
      <ClipLoader color="#125b8bff" size={100} />
      <p>Loading product details...</p>
    </div></div> );
  }
  else if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300 text-xl">No products found</p>
      </div>
    );
  }

  const openDetails = (product : any) => {
    window.location.href = `/detail?id=${btoa(JSON.stringify(product))}`;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {products.map((product:any) => (
        <div key={product.id} onClick={() => openDetails(product)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
          <div className="h-50 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {product.image ?<img src={product.image}
                            alt="new" style={{height:200}}
                            />
         : <span className="text-4xl">🛒</span>}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.title}</h3>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-600 dark:text-gray-300 ml-1">{product.rating.rate}</span>
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                {product.rating.count} purchases
            </div>

            <p className='text-gray-800 dark:text-white line-clamp-3'>{product.description}</p>

            <div className="mt-auto flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">${product.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-3">
              <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;