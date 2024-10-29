import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, firstName, lastName }),
    });

    if (res.ok) {
      alert("Registration Successfull");
      router.push("/login");
    } else {
      alert("Registration Failed");
    }
  };
  return (
    <div>
      <Header />
      <div className="loginForm">
        <form onSubmit={handleRegister} className="form">
          <h1 className="h1title" style={{ marginBottom: "20px" }}>
            Register
          </h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
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
