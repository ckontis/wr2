import Image from "next/image";
import Header from "@/pages/header";
import Footer from "@/pages/footer";
import ErrorPage from "@/pages/404";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useShopAllContext } from "@/context/ShopAllContext";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8080/products/${id}`);
  const product = await res.json();

  return {
    props: { product },
  };
}

export default function Product({ product }) {
  const [role, setRole] = useState("");
  const [productName, setProductName] = useState(product.productName);
  const [price, setPrice] = useState(product.price);
  const [salePrice, setSalePrice] = useState(product.salePrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);
  const router = useRouter();
  const { handleReload } = useShopAllContext();

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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        price,
        salePrice,
        stock,
        description,
      }),
    });

    if (res.ok) {
      alert("Product details were updated");
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
            <form onSubmit={handleUpdateProduct} className="form">
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
              <button type="submit">Update</button>
            </form>
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt="test"
                style={({ backgroundColor: "#E9E9EB" }, { left: "10px" })}
                width={500}
                height={400}
              />
            </Link>
          </div>

          <Footer />
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
