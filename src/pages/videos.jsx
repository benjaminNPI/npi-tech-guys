import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

const PLAYLIST_ID = 'PLnUE_BPNDMZFdwIRl8jEeO_97x6NQu4RC'

function truncateText(text = '', maxLength = 240) {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
}

function cleanDescription(text = '') {
    return text
        .replace(/https?:\/\/\S+/g, '') // remove URLs
        .replace(/\n+/g, ' ') // flatten line breaks
        .replace(/\s+/g, ' ') // normalize spaces
        .trim()
}

function VideoEntry({ video }) {
    const description = truncateText(cleanDescription(video.description), 220)

    return (
        <article
            aria-labelledby={`video-${video.id}-title`}
            className="py-10 sm:py-12"
        >
            <Container>
                <article className="flex flex-col gap-3">
                    <FormattedDate
                        date={new Date(video.publishedAt)}
                        className="text-sm font-mono text-slate-500"
                    />

                    <h2
                        id={`video-${video.id}-title`}
                        className="text-xl font-semibold text-[#662B33] hover:underline"
                    >
                        <Link
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {video.title}
                        </Link>
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {video.thumbnail && (
                            <Link
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0"
                            >
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    width={320}
                                    height={180}
                                    className="rounded-lg object-cover w-full sm:w-56 h-auto"
                                />
                            </Link>
                        )}

                        <div className="flex-1">
                            <p className="text-slate-700 text-base leading-relaxed">
                                {description || 'Watch this video on YouTube.'}
                            </p>

                            <div className="mt-4">
                                <Link
                                    href={`https://www.youtube.com/watch?v=${video.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex text-sm font-medium text-[#662B33] hover:underline"
                                >
                                    Watch on YouTube
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </Container>
        </article>
    )
}

export default function PlaylistVideosPage({ videos }) {
    return (
        <>
            <Head>
                <title>NPI Tech Guys | Videos</title>
                <meta
                    name="description"
                    content="Watch the latest videos from NPI Tech Guys."
                />
            </Head>

            <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
                <Container>
                    <h1 className="text-2xl font-bold leading-7 text-slate-900">
                        Latest Videos
                    </h1>
                </Container>

                <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
                    {videos.map((video) => (
                        <VideoEntry key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const videos = []
    let pageToken = ''

    try {
        do {
            const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
            url.searchParams.set('part', 'snippet,contentDetails')
            url.searchParams.set('playlistId', PLAYLIST_ID)
            url.searchParams.set('maxResults', '50')
            url.searchParams.set('key', process.env.YOUTUBE_API_KEY)

            if (pageToken) {
                url.searchParams.set('pageToken', pageToken)
            }

            const response = await fetch(url.toString())
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.error?.message || 'Failed to fetch YouTube videos')
            }

            const pageVideos = (data.items || [])
                .filter(
                    (item) =>
                        item?.snippet?.resourceId?.videoId &&
                        item.snippet.title !== 'Private video' &&
                        item.snippet.title !== 'Deleted video'
                )
                .map((item) => ({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail:
                        item.snippet.thumbnails?.high?.url ||
                        item.snippet.thumbnails?.medium?.url ||
                        item.snippet.thumbnails?.default?.url ||
                        null,
                    publishedAt:
                        item.contentDetails?.videoPublishedAt || item.snippet.publishedAt,
                    channelTitle: item.snippet.channelTitle,
                }))

            videos.push(...pageVideos)
            pageToken = data.nextPageToken || ''
        } while (pageToken)

        return {
            props: {
                videos,
            },
            revalidate: 3600,
        }
    } catch (error) {
        console.error('YouTube fetch error:', error)

        return {
            props: {
                videos: [],
            },
            revalidate: 300,
        }
    }
}