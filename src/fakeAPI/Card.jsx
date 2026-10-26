
  import "./Card.css";

  function Card({ product }) {
    return (
      <article className="product-card">
        <div className="product-card__visual">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product-card__details">
          <h3>{product.title}</h3>
          <p>Min. {Math.round(product.discountPercentage)}% Off</p>
        </div>
      </article>
    );
  }

  export default Card;
