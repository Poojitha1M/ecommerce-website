// components/Cart.tsx
import { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
      >
        <span>🛒</span>
        <span>{totalItems}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your Cart</h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">Your cart is empty</p>
            ) : (
              <>
                <div className="max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">{item.product.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">${item.product.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full"
                        >
                          -
                        </button>
                        
                        <span className="text-gray-800 dark:text-white">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full"
                        >
                          +
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-800 dark:text-white">Total:</span>
                    <span className="font-bold text-gray-800 dark:text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;