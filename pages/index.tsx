// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductGrid from '../components/ProductGrid';
import SearchFilter from '../components/SearchFilter';
import Cart from '../components/Cart';
import { Product, CartItem } from '../types';
import * as common from '../common'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const axios = require('axios');
  const [loading, setLoading] = useState(false)

  // Load initial data and cart from localStorage
  useEffect(() => {
    // Mock product data
    getProductData()
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);


const getProductData = async () => {
  try {
    // Show loader
    setLoading(true);
    
    const response = await common.getAxiosHttpInstance().get(`https://fakestoreapi.com/products`);
    
    // Assuming response.data contains the actual products array
    const productsData = response;
    
    setProducts(productsData);
    setFilteredProducts(productsData);
    
    } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (show error message, etc.)
        // setError('Failed to fetch products. Please try again.');
    } finally {
        // Hide loader regardless of success or failure
        setLoading(false);
    }
    };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Mini E-commerce Dashboard</title>
        <meta name="description" content="A mini e-commerce dashboard with cart functionality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kutsie shopping</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchFilter 
          products={products} 
          setFilteredProducts={setFilteredProducts} 
        />
        <ProductGrid 
          products={filteredProducts} 
          addToCart={addToCart} 
          loading={loading}
        />
      </main>

      <footer className="bg-white dark:bg-gray-800 py-6 mt-12 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>© 2023 ShopEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}