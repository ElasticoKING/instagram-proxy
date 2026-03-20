export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    try {
        const response = await fetch(
            'https://www.instagram.com/web/search/topsearch/?query=elasticoarts',
            { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } }
        );
        const data = await response.json();
        const user = data?.users?.find(u => 
            u.user.username.toLowerCase() === 'elasticoarts'
        );
        if (user) {
            res.json({ followers: user.user.follower_count });
        } else {
            res.json({ followers: null });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
}
