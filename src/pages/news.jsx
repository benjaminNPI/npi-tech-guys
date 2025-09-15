import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

const newsFeed = "https://www.networkprovidersinc.com/blog/feed.xml/";



function NewsEntry({ news }) {

    return (
        <article
            aria-labelledby={`news-${news.title.trim().split(' ').join('-')}-title`}
            className="py-10 sm:py-12"
        >
            <Container>
                <div className="flex flex-col items-start">
                    <h2
                        id={`news-${news.title.trim().split(' ').join('-')}-title`}
                        className="mt-2 text-lg font-bold hover:underline text-[#662B33]"
                    >
                        <Link href={`${news.link}`} target='_blank'>{news.title}</Link>
                    </h2>
                    <p className="mt-1 text-lg leading-7 text-slate-700"
                        dangerouslySetInnerHTML={{ __html: news.description }}
                    >
                    </p>
                    <FormattedDate
                        date={new Date(news.published)}
                        className="order-first font-mono text-sm leading-7 text-slate-500"
                    />
                </div>
            </Container>
        </article>
    )
}

export default function Home({ news }) {
    return (
        <>
            <Head>
                <title>
                    NPI Tech Guys | News
                </title>
                <meta
                    name="description"
                    content="Stay up to date with our latest news articles!"
                />
            </Head>
            <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
                <Container className="">
                    <h1 className="text-2xl font-bold leading-7 text-slate-900">
                        Tech News
                    </h1>
                </Container>
                <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100 ">
                    {news.map((news) => (
                        <NewsEntry key={news.title} news={news} className="shadow-lg my-4" />
                    ))}
                </div>
            </div>
        </>
    )
}

function stripCDATA(str = '') {
    return str
        .replace(/^(\[cdata\[|\!\[CDATA\[)/i, '') // remove starting markers
        .replace(/(\]\]|]]>)$/i, '')              // remove ending markers
        .trim();
}

// define the getStaticProps function
export async function getStaticProps() {
    let feed = await parse(newsFeed);

    return {
        props: {
            news: feed.items.map(
                ({ title, description, link, published }) => ({
                    title: stripCDATA(title),
                    published,
                    description: stripCDATA(description),
                    link: link
                })
            ),
        },
        revalidate: 10,
    };
}