import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AddReview() {
  const [comments, setComments] = useState("");
  const [review, setReview] = useState("");

  const router = useRouter();
  const { id, photo } = router.query;

  const addReview = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/reviews/add-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, comments, review }),
      credentials: "include",
    });

    if (res.ok) {
      alert("Review Added");
      router.push("/");
    } else {
      alert("Review Failed");
    }
  };
  return (
    <div>
      <Header />
      <div className="loginForm">
        <form onSubmit={addReview} className="form">
          <h1 className="h1title" style={{ marginBottom: "20px" }}>
            Add a review
          </h1>
          <input
            type="text"
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <input
            type="text"
            placeholder="Review 1-5"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button type="submit">Add Review</button>
        </form>
        <Image
          style={{ marginTop: "200px" }}
          src={photo}
          alt="Image"
          width={525}
          height={525}
        ></Image>
      </div>

      <Footer />
    </div>
  );
}
