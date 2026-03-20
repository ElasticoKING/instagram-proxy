export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const response = await fetch('https://instastatistics.com/elasticoarts', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const text = await response.text();
        const match = text.match(/"followers":(\d+)/) ||
                      text.match(/(\d+)<\/span>\s*Followers/i) ||
                      text.match(/"follower_count":(\d+)/);
        if (match) {
            res.json({ followers: parseInt(match[1]) });
        } else {
            res.json({ followers: null, raw: text.substring(0, 500) });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
}
