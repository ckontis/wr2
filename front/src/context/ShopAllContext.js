import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const ShopAllContext = createContext();

export const useShopAllContext = () => useContext(ShopAllContext);

export const ShopAllProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [favProducts, setFavProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const getPro = async () => {
    const res = await fetch("http://localhost:8080/products", {
      method: "GET",
    });
    if (res.ok) {
      const allPro = await res.json();
      setProducts(allPro);
    }
  };
  const getFav = async () => {
    const res = await fetch("http://localhost:8080/users/favorites", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const products2 = await res.json();
      setFavProducts(products2);
    }
  };

  const getOrders = async () => {
    const res = await fetch("http://localhost:8080/orders/account", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const orders = await res.json();
      setOrders(orders);
    }
  };

  const getCart = async () => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const products = await res.json();
      setCartProducts(products);
    }
  };
  useEffect(() => {
    getPro();
    getCart();
    getFav();
    getOrders();
  }, []);

  const handleReload = async () => {
    getPro();
    getCart();
    getFav();
    getOrders();
  };

  const handleAddToCart = async (product) => {
    const res = await fetch(`http://localhost:8080/cart/add/${product.id}`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      setCartProducts((prevCart) => [...prevCart, product.id]);
      getCart();
    }
  };

  const handleRemoveFromCart = async (product) => {
    const res = await fetch(`http://localhost:8080/cart/remove/${product.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setCartProducts((prevCart) => prevCart.filter((id) => id != product.id));
      getCart();
    }
  };

  const handleAddToFavs = async (product) => {
    const res = await fetch(
      `http://localhost:8080/users/favorites/add/${product.id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (res.ok) {
      setFavProducts((prevFavs) => [...prevFavs, product.id]);
      getFav();
    }
  };

  const handleRemoveFromFavs = async (product) => {
    const res = await fetch(
      `http://localhost:8080/users/favorites/remove/${product.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) {
      setFavProducts((prevFavs) => prevFavs.filter((id) => id != product.id));
      getFav();
    }
  };

  const inCart = (productId) =>
    cartProducts.some((item) => item.id === productId);

  const inFav = (productId) =>
    favProducts.some((item) => item.id === productId);

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:8080/cart/checkout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      alert("Your order was received! Thank you!");
      router.push("/");
      getCart();
      getOrders();
    }
  };

  return (
    <ShopAllContext.Provider
      value={{
        products,
        cartProducts,
        favProducts,
        orders,
        inCart,
        inFav,
        handleAddToCart,
        handleRemoveFromCart,
        handleAddToFavs,
        handleRemoveFromFavs,
        handleCheckout,
        handleReload,
      }}
    >
      {children}
    </ShopAllContext.Provider>
  );
};
