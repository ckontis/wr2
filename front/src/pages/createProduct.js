import Header from "@/pages/header";
import Footer from "@/pages/footer";
import ErrorPage from "@/pages/404";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useShopAllContext } from "@/context/ShopAllContext";

export default function CreateProduct() {
  const { handleReload } = useShopAllContext();
  const [role, setRole] = useState("");
  const router = useRouter();
  const fetchUser = async () => {
    const myId = Cookies.get("userId");
    const res = await fetch(`http://localhost:8080/users/${myId}`);
    if (res.ok) {
      const data = await res.json();
      setRole(data.role);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        price,
        salePrice,
        stock,
        description,
        genre,
        image,
        category,
      }),
    });

    if (res.ok) {
      alert("Product was created");
      router.push("/myAccount");
      handleReload();
    } else {
      alert("An error occured");
    }
  };

  return (
    <>
      {role === "admin" ? (
        <div>
          <Header />

          <div className="loginForm">
            <form onSubmit={handleCreateProduct} className="form">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label>Sale Price</label>
                <input
                  type="text"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Genre</label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <button type="submit">Create</button>
            </form>
          </div>

          <Footer />
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
