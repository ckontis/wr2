import Footer from "./footer";
import Header from "./header";
import { useShopAllContext } from "@/context/ShopAllContext";
import Shoe from "./Shoe";
export default function Cart() {
  const {
    products,
    cartProducts,
    favProducts,
    inCart,
    inFav,
    handleAddToCart,
    handleRemoveFromCart,
    handleAddToFavs,
    handleRemoveFromFavs,
    handleCheckout,
  } = useShopAllContext();

  let totalPrice = 0;
  return (
    <div>
      <Header />
      <div className="frame22">
        <h1 className="h1title"> My Cart</h1>
        <ul className="posts-container">
          {cartProducts.map((product) => (
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
              >
                {
                  (totalPrice =
                    totalPrice +
                    (product.salePrice
                      ? product.price -
                        (product.salePrice / 100) * product.price
                      : product.price))
                }
              </Shoe>
            </li>
          ))}
        </ul>
      </div>
      {totalPrice > 0 ? (
        <div className="check">
          <h1 className="h1title"> Total Price: {totalPrice}$</h1>
          <h1 className="h1title">
            <button
              href="/Login"
              className="classicButton"
              onClick={handleCheckout}
            >
              Click here to checkout!
            </button>
          </h1>
        </div>
      ) : (
        <div className="loginForm" style={{ marginTop: "200px" }}>
          <h1 className="h1title">There are no items in your cart.</h1>{" "}
        </div>
      )}

      <Footer />
    </div>
  );
}
