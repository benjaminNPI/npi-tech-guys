import { useEffect, useState } from 'react';

export default function PlaylistVideos({ playlistId }) {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);

    async function loadVideos(pageToken) {
        try {
            pageToken ? setLoadingMore(true) : setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                playlistId,
                maxResults: '12',
            });

            if (pageToken) params.set('pageToken', pageToken);

            const res = await fetch(`/api/youtube?${params.toString()}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Failed to fetch videos');
            }

            setVideos(prev => pageToken ? [...prev, ...data.videos] : data.videos);
            setNextPageToken(data.nextPageToken);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }

    useEffect(() => {
        loadVideos();
    }, [playlistId]);

    if (loading) return <p>Loading videos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '16px',
                }}
            >
                {videos.map(video => (
                    <a
                        key={video.id}
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            style={{ width: '100%', display: 'block' }}
                        />

                        <div style={{ padding: '12px' }}>
                            <h3 style={{ fontSize: '16px', margin: '0 0 8px' }}>
                                {video.title}
                            </h3>

                            <p style={{ fontSize: '14px', margin: 0 }}>
                                {video.channelTitle}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            {nextPageToken && (
                <button
                    onClick={() => loadVideos(nextPageToken)}
                    disabled={loadingMore}
                    style={{ marginTop: '20px' }}
                >
                    {loadingMore ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    );
}