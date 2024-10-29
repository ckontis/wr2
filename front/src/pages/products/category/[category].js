import { useRouter } from "next/router";
import Shoe from "@/pages/Shoe";
import { useEffect, useState } from "react";
import Header from "@/pages/header";
import Footer from "@/pages/footer";
import Image from "next/image";
import { useShopAllContext } from "@/context/ShopAllContext";
export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [shoes, setShoes] = useState([]);
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
  useEffect(() => {
    if (category) {
      const fetchShoesByCategory = async () => {
        const res = await fetch(
          `http://localhost:8080/products/category/${category}`
        );
        const data = await res.json();
        setShoes(data);
      };
      fetchShoesByCategory();
    }
  }, [category]);

  return (
    <div>
      <Header />

      <div className="frame22">
        <Image src={"/images/categ.jpg"} alt="test" width={1422} height={282} />
        <h1 className="h1title">Our top {category} shoes...</h1>
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
