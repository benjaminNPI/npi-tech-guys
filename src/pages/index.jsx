import { useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'
import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

const rssFeed = "https://feeds.blubrry.com/feeds/1473047.xml";


function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  )
}

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.published}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)
  return (
    <article
      aria-labelledby={`episode-${episode.title}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.title}-title`}
            className="mt-2 text-lg font-bold text-[#662B33] hover:underline"
          >
            <Link href={`/${episode.published}`}>{episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700"
            dangerouslySetInnerHTML={{ __html: episode.description.substring(0, 350) + ' ...' }}
            >
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-black hover:text-[#662B33] active:text-red-900"
              aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${episode.title}`}
            >
              <PlayPauseIcon
                playing={player.playing}
                className="h-2.5 w-2.5 fill-current"
              />
              <span className="ml-3 " aria-hidden="true">
                Listen
              </span>
            </button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`${episode.published}`}
              className="flex items-center text-sm font-bold leading-6 text-black hover:text-[#662B33] active:text-red-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`${episode.audio.src}`}
              legacyBehavior
              aria-label={`Download this episode`}

            >
              <a target='_blank' className="flex items-center text-sm font-bold leading-6 text-black hover:text-[#662B33] active:text-red-900" download>Download</a>
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default function Home({ episodes }) {
  return (
    <>
      <Head>
        <title>
          NPI Tech Guys | Podcasts
        </title>
        <meta
          name="description"
          content="Stay up to date with our latest podcast episodes!"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Podcast Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.title} episode={episode}
            />
          ))}
        </div>
      </div>
    </>
  )
}


// define the getStaticProps function
export async function getStaticProps() {
  let feed = await parse(rssFeed);
  // console.log("test1");
  // Testing
  return {
    props: {
      episodes: feed.items.map(
        ({ title, description, enclosures, published }) => ({
          title: ` ${title}`,
          published,
          description,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        })
      ),
    },
    revalidate: 10,
  };
}