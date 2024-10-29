import { ShopAllProvider } from "@/context/ShopAllContext";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <ShopAllProvider>
      <Component {...pageProps} />
    </ShopAllProvider>
  );
}
