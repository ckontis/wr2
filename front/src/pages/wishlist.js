import Shoe from "./Shoe";
import Footer from "./footer";
import Header from "./header";
import { useShopAllContext } from "@/context/ShopAllContext";

export default function Wishlist() {
  const {
    products,
    cartProducts,
    favProducts,
    handleAddToCart,
    handleRemoveFromCart,
    handleAddToFavs,
    inCart,
    inFav,
    handleRemoveFromFavs,
  } = useShopAllContext();

  return (
    <div>
      <Header />
      <div className="frame22">
        <h1 className="h1title"> My Favorites</h1>
        <ul className="posts-container">
          {favProducts.map((product) => (
            <li key={product.id} className="post">
              <Shoe
                product={product}
                cartProducts={cartProducts}
                favProducts={favProducts}
                inCart={inCart}
                inFav={inFav}
                handleAddToCart={handleAddToCart}
                handleAddToFavs={handleAddToFavs}
                handleRemoveFromCart={handleRemoveFromCart}
                handleRemoveFromFavs={handleRemoveFromFavs}
                key={product.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
