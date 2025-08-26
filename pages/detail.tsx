import { useEffect, useState } from "react";

export default function Detail(props: any) {
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    // In a real app, this would fetch from an API
    // For demo purposes, I'll create a sample product
    const urlParams = new URLSearchParams(window.location.search);
        let prod : any = {}
        if(urlParams.get('id'))
            prod = (urlParams.get('id') ? atob(urlParams.get('id') || '') : null)
    const sampleProduct = JSON.parse(prod)
    setProduct(sampleProduct)
  };

  const handleAddToCart = () => {
    // if (!selectedSize || !selectedColor) {
    //   alert("Please select size and color before adding to cart");
    //   return;
    // }
    
    // In a real app, this would add to cart
    alert(`Added ${quantity} ${product.title} to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex space-x-2">
            <li className="text-gray-500">Home</li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-500">{product.category}</li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="mb-4 h-200 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* <div className="grid grid-cols-3 gap-4">
                {product.images.map((img: string, index: number) => (
                  <div 
                    key={index} 
                    className={`h-24 cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div> */}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating?.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.rating?.rate} ({product.rating.count} purchases)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Color Selection */}
              {/* <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div> */}

              {/* Size Selection */}
              {/* <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-900 block mb-1">
                    Quantity
                  </label>
                  <div className="flex border rounded-md">
                    <button 
                      className="px-3 py-2 border-r bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      className="w-12 text-center border-none"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    <button 
                      className="px-3 py-2 border-l bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-900 block mb-1">
                    &nbsp;
                  </label>
                  <button 
                    className={`w-full py-3 px-4 rounded-md font-medium bg-blue-500`}
                    disabled={false}
                    onClick={handleAddToCart}
                  >
                    {'Add to Cart'}
                  </button>
                </div>
              </div>

              {/* Product Features */}
              {/* <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div> */}

              {/* Product Meta */}
              <div className="text-sm text-gray-500">
                {/* <div className="flex mb-1">
                  <span className="w-20 font-medium">SKU:</span>
                  <span>{product.sku}</span>
                </div> */}
                <div className="flex">
                  <span className="w-20 font-medium">Category:</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}