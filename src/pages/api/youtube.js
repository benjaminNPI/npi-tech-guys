export default async function handler(req, res) {
    try {
        const { playlistId, pageToken } = req.query;

        if (!playlistId) {
            return res.status(400).json({ error: 'Missing playlistId' });
        }

        if (!process.env.YOUTUBE_API_KEY) {
            return res.status(500).json({ error: 'Missing YOUTUBE_API_KEY in .env.local' });
        }

        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('playlistId', playlistId);
        url.searchParams.set('maxResults', '12');
        url.searchParams.set('key', process.env.YOUTUBE_API_KEY);

        if (pageToken) {
            url.searchParams.set('pageToken', pageToken);
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data?.error?.message || 'YouTube API request failed',
                details: data,
            });
        }

        if (!Array.isArray(data.items)) {
            return res.status(500).json({
                error: 'YouTube response did not include items',
                details: data,
            });
        }

        const videos = data.items
            .filter(item => item?.snippet?.resourceId?.videoId)
            .map(item => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail:
                    item.snippet.thumbnails?.medium?.url ||
                    item.snippet.thumbnails?.default?.url ||
                    '',
                channelTitle: item.snippet.channelTitle,
            }));

        return res.status(200).json({
            videos,
            nextPageToken: data.nextPageToken || null,
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message || 'Unexpected server error',
        });
    }
}