import { useShopAllContext } from "@/context/ShopAllContext";
import Footer from "./footer";
import Header from "./header";
import Image from "next/image";
import Link from "next/link";
export default function Orders() {
  const { orders } = useShopAllContext();
  return (
    <div>
      <Header />

      <div>
        <div className="frame45">
          <h1 className="h1title" style={{ margin: "20px" }}>
            My Orders
          </h1>

          <ul>
            {orders.map((order) => (
              <li key={order.id} className="order1" style={{ margin: "70px" }}>
                <h1 className="h2title" style={{ color: "red" }}>
                  Order ID: {order.id}
                </h1>
                <h1 className="h2title">
                  Total price of the order: {order.totalPrice}$
                </h1>
                <h1 className="h2title">Order Items: </h1>
                <ul className="posts-container">
                  {order.products.map((product) => (
                    <li key={product.id} className="post">
                      {
                        <div className="shoe">
                          <Link href={`/products/${product.id}`}>
                            <Image
                              src={product.image}
                              alt="test"
                              style={
                                ({ backgroundColor: "#E9E9EB" },
                                { left: "10px" })
                              }
                              width={250}
                              height={200}
                            />
                          </Link>
                          <h2 className="pName">{product.productName}</h2>
                          <div>
                            {product.salePrice ? (
                              <h4
                                className="price"
                                style={{ color: "#DB4444" }}
                              >
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
                          <Link
                            href={{
                              pathname: "/addReview",
                              query: { id: product.id, photo: product.image },
                            }}
                          >
                            <button className="cButton">
                              Add Review for the product
                            </button>
                          </Link>
                        </div>
                      }
                    </li>
                  ))}
                  <Image
                    src="/images/Line.png"
                    alt="Image"
                    width={1000}
                    height={1}
                  />
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
