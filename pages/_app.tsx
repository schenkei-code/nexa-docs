import type { AppProps } from "next/app";
import "../styles/brand.css";

export default function NexaDocsApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
