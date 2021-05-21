import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>PROVOTE</title>
        <meta name="description" content={`ANDREW"S FINAL YEAR PROJECT`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="jumbotron text-center">
        <h3>Some Random UI would probably reside here</h3>
      </div>
    </>
  );
}
