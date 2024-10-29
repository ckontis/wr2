import Shoe from "../Shoe";
import Footer from "../footer";
import Header from "../header";
import Image from "next/image";
import { useShopAllContext } from "@/context/ShopAllContext";

export default function Sale() {
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
        <Image src={"/images/sale.jpg"} alt="test" width={973} height={462} />
        <h1 className="h1title">Top sales at the moment!</h1>
        <ul className="posts-container">
          {products.map((product) =>
            product.salePrice > 0 ? (
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
