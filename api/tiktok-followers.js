module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const upstream = await fetch('https://tiktok-api.tokcounter.com/user/data/nxtcoreee3', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      throw new Error(`TokCounter returned ${upstream.status}`);
    }

    const data = await upstream.json();
    const followers = Number(data?.stats?.followers);

    if (!Number.isFinite(followers)) {
      throw new Error('Follower count was not included in the response');
    }

    response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    return response.status(200).json({
      username: 'nxtcoreee3',
      followers,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return response.status(502).json({ error: 'Follower count is temporarily unavailable' });
  }
};
