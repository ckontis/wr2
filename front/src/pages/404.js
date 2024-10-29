import Link from "next/link";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <div>
      <div className="desc">
        <h4 className="h1title">
          Hmm... it seems there is nothing here... but you can visit some
          trendings by clicking
          <Link href="/products/trending">
            <h4 className="h1titleh">here!</h4>
          </Link>
        </h4>
      </div>
      <Image
        className="alone2"
        src={"/images/hand.jpg"}
        alt="test"
        width={500}
        height={625}
      />
    </div>
  );
}
