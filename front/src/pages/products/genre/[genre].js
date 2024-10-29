import { useRouter } from "next/router";
import Shoe from "@/pages/Shoe";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/pages/header";
import Footer from "@/pages/footer";
import Image from "next/image";
import { useShopAllContext } from "@/context/ShopAllContext";
export default function Genre() {
  const router = useRouter();
  const { genre } = router.query;
  const [shoes, setShoes] = useState([]);
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

  useEffect(() => {
    if (genre) {
      const fetchShoesByGenre = async () => {
        const res = await fetch(
          `http://localhost:8080/products/genre/${genre}`
        );
        const data = await res.json();
        setShoes(data);
      };
      fetchShoesByGenre();
    }
  }, [genre]);

  return (
    <div>
      <Header />
      <div className="frame22">
        <Image
          src={"/images/categ2.jpg"}
          alt="test"
          width={1400}
          height={466}
        />
        <h1 className="h1title">Our top shoes for {genre} ...</h1>
        <ul className="posts-container">
          {shoes.map((product) => (
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
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
