module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const upstream = await fetch('https://tiktok-api.tokcounter.com/user/stats/7497552469388624918', {
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      throw new Error(`TokCounter returned ${upstream.status}`);
    }

    const data = await upstream.json();
    const followers = Number(data?.followerCount);

    if (!Number.isFinite(followers)) {
      throw new Error('Follower count was not included in the response');
    }

    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('CDN-Cache-Control', 'no-store');
    response.setHeader('Vercel-CDN-Cache-Control', 'no-store');
    return response.status(200).json({
      username: 'nxtcoreee3',
      followers,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return response.status(502).json({ error: 'Follower count is temporarily unavailable' });
  }
};
