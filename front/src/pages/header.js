import Image from "next/image";
import Link from "next/link";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const logCookie = Cookies.get("userId");
    if (logCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/users/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      Cookies.remove("userId");
      setIsLoggedIn(false);
      window.location.href = "/";
    }
  };

  return (
    <div className="header">
      <div className="header1">
        <Link href="http://localhost:3000/">
          <Image src="/images/100.png" alt="Image" width={30} height={30} />
        </Link>
        <Link href="/products/genre/women" className="button">
          Women
        </Link>
        <Link href="/products/genre/men" className="button">
          Men
        </Link>
        <Link href="/products/genre/kids" className="button">
          Kids
        </Link>
        <Link href="/products/category/classic" className="button">
          Classic
        </Link>
        <Link href="/products/category/sport" className="button">
          Sport
        </Link>
        <Link href="/products/sale" className="button">
          Sale
        </Link>
      </div>
      <div className="header2">
        {isLoggedIn ? (
          <Link href="/wishlist">
            <Image
              src="/images/Heart.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          </Link>
        ) : (
          <Link href="/login">
            <Image
              src="/images/Heart.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          </Link>
        )}
        {isLoggedIn ? (
          <Link href="/cart">
            <Image
              src="/images/Frame.png"
              alt="Image"
              width={19.39}
              height={18}
            />
          </Link>
        ) : (
          <Link href="/login">
            <Image
              src="/images/Frame.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          </Link>
        )}

        {isLoggedIn ? (
          <Link href="/myAccount">
            <Image
              src="/images/Vector.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          </Link>
        ) : (
          <Link href="/login">
            <Image
              src="/images/Vector.png"
              alt="Image"
              width={18}
              height={16.5}
            />
          </Link>
        )}
        {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : null}
      </div>
    </div>
  );
}
