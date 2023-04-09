import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import AppController from "~/server/Controllers/AppController";
import Result from '../utils/ResultType'
import type { Product } from '@prisma/client'
import App, { AppContext, AppProps } from "next/app";
import ProductCard from "~/components/ProductCard";

type Props = {
  products: Result<Product[]>;
};

const Home: NextPage<Props> = ({ products }) => {

  const generateProducts = () => {
    if (!products.result) return (<></>);
    return (
      <>
        {products.data.map(product => {
                return (
                  <ProductCard {...product!} key={product?.productId}></ProductCard>
                )
            })}
      </>
    )

  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="CRM Furniture" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Titillium+Web:wght@200&display=swap" rel="stylesheet"></link>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {generateProducts()}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await AppController.product.getAll();
  return { props: { products: products } };
}

export default Home;
