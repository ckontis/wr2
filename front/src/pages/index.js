import Header from "./header";
import Footer from "./footer";
import Shoe from "./Shoe";
import Image from "next/image";
import Link from "next/link";
import { useShopAllContext } from "@/context/ShopAllContext";

export default function Home() {
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
      <Image
        className="shopall"
        src="/images/Component.png"
        alt="Image"
        width={1090}
        height={430}
      />

      <div className="frame">
        <div className="frame0">
          <div className="frameTT">
            <Link href="/products/newArrivals" className="newArrivals">
              NEW ARRIVALS
            </Link>
            <Link href="/products/trending" className="whatsTrending">
              WHAT`S TRENDING
            </Link>
          </div>
          <div>
            <ul className="posts-container">
              {products.map((product) => (
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
        </div>

        <div className="group3">
          <Image src="/images/Line.png" alt="Image" width={1279} height={1} />
          <Image
            className="f628"
            src="/images/Famous.png"
            alt="Image"
            width={618}
            height={831}
          />
          <Image
            className="f629 "
            src="/images/special.png"
            alt="Image"
            width={618}
            height={831}
          />
        </div>
        <div className="best">
          <h1 className="best1text">BEST SELLING</h1>

          <ul className="posts-container2">
            {products.map((product) =>
              product.stock <= 25 ? (
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
              ) : null
            )}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
