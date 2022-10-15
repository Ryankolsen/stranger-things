import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function MyApp({ Component, pageProps }: any) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navbar />

          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
