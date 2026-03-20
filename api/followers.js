export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    try {
        const response = await fetch(
            'https://www.picuki.com/profile/elasticoarts',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html'
                }
            }
        );
        const text = await response.text();
        const match = text.match(/(\d[\d,\.]+)\s*[Ff]ollowers/) ||
                      text.match(/followers.*?(\d[\d,\.]+)/i);
        if (match) {
            const clean = match[1].replace(/[,\.]/g, '');
            res.json({ followers: parseInt(clean) });
        } else {
            res.json({ followers: null, hint: text.substring(0, 300) });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
}
