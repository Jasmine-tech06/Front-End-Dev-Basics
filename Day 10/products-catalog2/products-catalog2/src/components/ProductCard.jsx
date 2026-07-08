const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="product-content">

        <span className="product-category">
          {product.category}
        </span>

        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating">

          <span>⭐ {product.rating}</span>

        </div>

        <div className="product-bottom">

          <h2 className="product-price">
            ₹{product.price}
          </h2>

          <button
className="view-btn"
onClick={(e)=>{
e.stopPropagation();
onClick();
}}
>
            View Details
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;