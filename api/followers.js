export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    try {
        const response = await fetch(
            'https://i.instagram.com/api/v1/users/web_profile_info/?username=elasticoarts',
            {
                headers: {
                    'User-Agent': 'Instagram 76.0.0.15.395 Android',
                    'Accept': '*/*',
                    'x-ig-app-id': '936619743392459'
                }
            }
        );
        const data = await response.json();
        const count = data?.data?.user?.edge_followed_by?.count;
        if (count !== undefined) {
            res.json({ followers: count });
        } else {
            res.json({ followers: null });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
}
