import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { FormattedDate } from '@/components/FormattedDate'

const newsFeed = "https://www.networkprovidersinc.com/blog/feed.xml/";



function NewsEntry({ news }) {

    return (
        <article
            aria-labelledby={`news-${news.title.trim().split(' ').join('-')}-title`}
            className="py-10 sm:py-12"
        >
            <Container>
                <article className="flex flex-col gap-3">
                    {/* Date */}
                    <FormattedDate
                        date={new Date(news.published)}
                        className="text-sm font-mono text-slate-500"
                    />
                    {/* Title */}
                    <h2
                        id={`news-${news.title.trim().split(' ').join('-')}-title`}
                        className="text-xl font-semibold text-[#662B33] hover:underline"
                    >
                        <Link href={news.link} target="_blank">
                            {news.title}
                        </Link>
                    </h2>

                    {/* Image + Description */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {news.media?.thumbnail?.url && (
                            <Image
                                src={news.media.thumbnail.url}
                                alt={news.title}
                                width={news.media.thumbnail.width}
                                height={news.media.thumbnail.height}
                                className="rounded-lg object-cover sm:w-48 sm:h-32"
                            />
                        )}
                        <p
                            className="text-slate-700 text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: news.description }}
                        />
                    </div>

                </article>
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
                ({ title, description, link, published, media }) => ({
                    title: stripCDATA(title),
                    published,
                    description: stripCDATA(description),
                    link: link,
                    media: media
                })
            ),
        },
        revalidate: 10,
    };
}