import { client } from "@/lib/utils/apollo";
import { gql } from "@apollo/client";

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
}

export default function Home({ pages }: AllPageProps) {
  console.log(pages);
  return (
    <>
      <main className="p-16">
        <h1 className="text-4xl text-center font-bold">Headless Starter</h1>
        {pages.nodes &&
          pages.nodes.map((page) => {
            console.log(page.title);
            return (
              <>
                {page.title}
                <br />
              </>
            );
          })}
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
