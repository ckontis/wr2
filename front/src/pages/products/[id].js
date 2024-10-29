import Image from "next/image";
import Header from "../header";
import Footer from "../footer";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8080/products/${id}`);
  const product = await res.json();

  return {
    props: { product },
  };
}

export default function Product({ product }) {
  return (
    <div>
      <Header />

      <div className="desc">
        <h1>{product.productName}</h1>
        <h3>
          {product.salePrice ? (
            <h4 style={{ color: "#DB4444" }}>
              ${product.price - (product.salePrice / 100) * product.price}
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
            <h4>${product.price}</h4>
          )}
        </h3>
        <p style={{ marginTop: "50px" }}>{product.description}</p>
      </div>
      <Image
        className="alone"
        src={product.image}
        alt="test"
        width={620}
        height={470}
      />

      <Footer />
    </div>
  );
}
