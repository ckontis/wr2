import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Shoe({
  product,
  inCart,
  inFav,
  handleAddToCart,
  handleRemoveFromCart,
  handleAddToFavs,
  handleRemoveFromFavs,
}) {
  const isInCart = inCart(product.id);
  const isInFavs = inFav(product.id);

  const changeCartStatus = () => {
    if (isInCart) {
      handleRemoveFromCart(product);
    } else {
      handleAddToCart(product);
    }
  };

  const changeFavoriteStatus = () => {
    if (isInFavs) {
      handleRemoveFromFavs(product);
    } else {
      handleAddToFavs(product);
    }
  };

  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    const res = await fetch(
      `http://localhost:8080/reviews/product/${product.id}`,
      {
        method: "GET",
      }
    );

    if (res.ok) {
      const rev = await res.json();
      setReviews(rev);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  let totalReview = 0;
  reviews.map((review) => (totalReview = totalReview + review.stars));
  totalReview = totalReview / reviews.length;

  return (
    <div className="shoe">
      <div className="shoeIn">
        {product.salePrice > 0 ? (
          <h4 className="saleP">-{product.salePrice}% </h4>
        ) : (
          <h4 className="saleP2">{product.price}</h4>
        )}
        <button className="fav" onClick={changeFavoriteStatus}>
          {!isInFavs ? (
            <Image
              src="/images/heart1.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          ) : (
            <Image
              src="/images/heart2.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          )}
        </button>
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt="test"
            style={({ backgroundColor: "#E9E9EB" }, { left: "10px" })}
            width={250}
            height={200}
          ></Image>
        </Link>
        <button className="addToCart" onClick={changeCartStatus}>
          {!isInCart ? "Add to Cart" : "Remove from cart"}
        </button>
      </div>
      <h2 className="pName">{product.productName}</h2>

      <div>
        {product.salePrice ? (
          <h4 className="price" style={{ color: "#DB4444" }}>
            ${product.price - (product.salePrice / 100) * product.price}
            {
              <h4 className="price" style={{ textDecoration: "line-through" }}>
                ${product.price}
              </h4>
            }
          </h4>
        ) : (
          <h4 className="price">${product.price}</h4>
        )}
      </div>
      <div className="reviews">
        {totalReview > 0 ? (
          <div className="stars">
            {" "}
            <Image
              src={totalReview >= 1 ? "/images/starF.png" : "/images/starE.png"}
              alt="test"
              width={20}
              height={20}
            />
            <Image
              src={totalReview >= 2 ? "/images/starF.png" : "/images/starE.png"}
              alt="test"
              width={20}
              height={20}
            />
            <Image
              src={totalReview >= 3 ? "/images/starF.png" : "/images/starE.png"}
              alt="test"
              width={20}
              height={20}
            />
            <Image
              src={totalReview >= 4 ? "/images/starF.png" : "/images/starE.png"}
              alt="test"
              width={20}
              height={20}
            />
            <Image
              src={totalReview >= 5 ? "/images/starF.png" : "/images/starE.png"}
              alt="test"
              width={20}
              height={20}
            />
            <p className="ratings">({reviews.length})</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
