import { Hero } from "@/components/Hero/Hero";
import { client } from "@/lib/utils/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";

interface AllPageProps {
  pages: PagesProps;
}

interface PagesProps {
  nodes: PageNodes;
}

interface PageNodes {
  map(
    arg0: (page: PageProps) => import("react").JSX.Element
  ): import("react").ReactNode;
  title: string;
}

interface PageProps {
  title: string;
  uri: string;
  slug: string;
}

export default function Home({ pages }: AllPageProps) {
  //console.log(pages);
  return (
    <>
      <Head>
        <title>Barebones Headless</title>
        <meta name="description" content="This is a barebones Headless" />
      </Head>
      <Hero />
      <main className="p-16">
        {pages.nodes && (
          <ul>
            {pages.nodes.map((page) => {
              return (
                <li key={page.title}>
                  <Link href={`/${page.slug}`}>{page.title}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const TEST_QUERY = gql`
    query NewQuery {
      pages {
        nodes {
          title
          uri
          slug
        }
      }
    }
  `;

  const response = await client.query({
    query: TEST_QUERY,
  });

  const pages = response?.data.pages;
  return {
    props: {
      pages: pages,
    },
  };
}
