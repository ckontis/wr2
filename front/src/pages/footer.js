import Image from "next/image";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const { pathname } = router;

  const selectFooter = () => {
    if (pathname.startsWith("/products/") || pathname.startsWith("/Login")) {
      return "aloneFooter";
    } else {
      return "mainFooter";
    }
  };
  return (
    <div className={selectFooter()}>
      <div className="footerContent">
        <div className="footerL">
          <h2>Logo</h2>
          <h3>Address</h3>
          <p>USA, California</p>
          <h3>Contact</h3>
          <p>1800 123 4567</p>
          <p>javaria.y2b@gmail.com</p>
        </div>
        <div className="footerR">
          <div className="footerRin">
            <p>Link One</p>
            <p>Link Two</p>
            <p>Link Three</p>
            <p>Link Four</p>
            <p>Link Five</p>
          </div>
          <div className="footerRin">
            <p>Link One</p>
            <p>Link Two</p>
            <p>Link Three</p>
            <p>Link Four</p>
            <p>Link Five</p>
          </div>
          <div className="footerRin">
            <p>Link One</p>
            <p>Link Two</p>
            <p>Link Three</p>
            <p>Link Four</p>
            <p>Link Five</p>
          </div>
        </div>
      </div>

      <div className="credits">
        <Image
          src="/images/Line.png"
          alt="Image"
          style={{ color: "#ededed" }}
          width={1279}
          height={1}
        />
        <h5>© 2023 Javaria. All rights reserved.</h5>
      </div>
    </div>
  );
}
