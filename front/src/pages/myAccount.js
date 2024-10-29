import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useShopAllContext } from "@/context/ShopAllContext";

export default function MyAccount() {
  // DELETES are not working. When I tried using them ,
  // I had problems with the carts and orders that product was a part of and user had.

  const { products } = useShopAllContext();

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    const myId = Cookies.get("userId");
    const res = await fetch(`http://localhost:8080/users/${myId}`);
    if (res.ok) {
      const data = await res.json();
      setUsername(data.username);
      setEmail(data.email);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setRole(data.role);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUsers();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const myId = Cookies.get("userId");
    const res = await fetch(`http://localhost:8080/users/${myId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, firstName, lastName }),
    });

    if (res.ok) {
      alert("You account details were updated");
      fetchUser();
    }
  };

  // const handleDelete = async (product) => {
  //   const res = await fetch(`http://localhost:8080/products/${product.id}`, {
  //     method: "DELETE",
  //   });

  //   if (res.ok) {
  //     alert("Product Deleted");
  //   } else {
  //     alert("An error occured");
  //   }
  // };

  // const handleDeleteUser = async (user) => {
  //   const res = await fetch(`http://localhost:8080/users/${user.id}`, {
  //     method: "DELETE",
  //   });

  //   if (res.ok) {
  //     alert("User Deleted");
  //   } else {
  //     alert("An error occured");
  //   }
  // };

  return (
    <div>
      <Header />

      <div>
        {!(role === "admin") ? (
          <div className="loginForm">
            <form onSubmit={handleUpdate} className="form">
              <h1 className="h1title" style={{ marginBottom: "20px" }}>
                My account
              </h1>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <button type="submit">Update</button>
              <Link href="/orders" className="classicButton">
                My Orders
              </Link>
            </form>
          </div>
        ) : (
          <div className="frame" style={{ top: "200px" }}>
            {" "}
            <div className="frame0">
              <ul className="posts-container">
                {users.map((user) => (
                  <li key={user.id} className="post">
                    {
                      <div className="shoe">
                        <h2 className="pName">User: {user.username}</h2>
                        <h2 className="pName">Email: {user.email}</h2>
                        <br></br>
                        <h2 className="pName">First Name: {user.firstName}</h2>
                        <h2 className="pName">Last Name: {user.lastName}</h2>
                        <h2 className="pName">Role: {user.role}</h2>
                        {/* <button
                          className="cButton"
                          onClick={() => handleDeleteUser(user)}
                        >
                          Delete User
                        </button> */}
                      </div>
                    }
                  </li>
                ))}
              </ul>

              <Image
                src="/images/Line.png"
                alt="Image"
                width={1000}
                height={1}
              />
              <ul className="posts-container">
                {products.map((product) => (
                  <li key={product.id} className="post">
                    {
                      <div className="shoe">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.image}
                            alt="test"
                            style={
                              ({ backgroundColor: "#E9E9EB" }, { left: "10px" })
                            }
                            width={250}
                            height={200}
                          />
                        </Link>
                        <h2 className="pName">{product.productName}</h2>
                        <div>
                          {product.salePrice ? (
                            <h4 className="price" style={{ color: "#DB4444" }}>
                              $
                              {product.price -
                                (product.salePrice / 100) * product.price}
                              {
                                <h4
                                  className="price"
                                  style={{ textDecoration: "line-through" }}
                                >
                                  ${product.price}
                                </h4>
                              }
                            </h4>
                          ) : (
                            <h4 className="price">${product.price}</h4>
                          )}
                        </div>
                      </div>
                    }
                    <Link href={`/products/update/${product.id}`}>
                      <button className="cButton">Update Product</button>
                    </Link>
                    {/* <button
                      className="cButton"
                      onClick={() => handleDelete(product)}
                    >
                      Delete Product
                    </button> */}
                  </li>
                ))}
              </ul>
              <Image
                src="/images/Line.png"
                alt="Image"
                width={1000}
                height={1}
              />
              <Link href={"/createProduct"}>
                <button className="cButton">Create Products</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
