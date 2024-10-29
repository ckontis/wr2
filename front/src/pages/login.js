import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useShopAllContext } from "@/context/ShopAllContext";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { handleReload } = useShopAllContext();

  // Password for all existing users is set to 12345

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.ok) {
      alert("Login Successfull");
      router.push("/");
      handleReload();
    } else {
      alert("Login Failed");
    }
  };
  return (
    <div>
      <Header />
      <div className="loginForm">
        <form onSubmit={handleLogin} className="form">
          <h1 className="h1title" style={{ marginBottom: "20px" }}>
            Login
          </h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            Not a member yet? Click{" "}
            <Link
              className="h1titleh"
              style={{ fontSize: "20px" }}
              href="/register"
            >
              here
            </Link>{" "}
            to register your account
          </p>
        </form>
        <Image
          style={{ marginTop: "200px" }}
          src="/images/login.jpg"
          alt="Image"
          width={450}
          height={637}
        ></Image>
      </div>

      <Footer />
    </div>
  );
}
