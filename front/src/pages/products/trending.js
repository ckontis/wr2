import Shoe from "../Shoe";
import Footer from "../footer";
import Header from "../header";
import Image from "next/image";
import { useShopAllContext } from "@/context/ShopAllContext";

export default function Trending() {
  const {
    products,
    inCart,
    inFav,
    cartProducts,
    favProducts,
    handleAddToCart,
    handleRemoveFromCart,
    handleAddToFavs,
    handleRemoveFromFavs,
  } = useShopAllContext();

  return (
    <div>
      <Header />
      <div className="frame22">
        <Image
          src={"/images/categ3.jpg"}
          alt="test"
          width={1170}
          height={300}
        />
        <h1 className="h1title">Check what`s trending now...</h1>
        <ul className="posts-container">
          {products.map((product) =>
            product.stock <= 25 ? (
              <li key={product.id} className="post">
                <Shoe
                  product={product}
                  products={products}
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
            ) : null
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
