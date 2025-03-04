import '@/styles/globals.css'; // Impor Tailwind global styles
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Open Library - Temukan Buku Favoritmu</title>
        <meta name="description" content="Cari dan temukan buku favoritmu dengan mudah di Open Library." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
