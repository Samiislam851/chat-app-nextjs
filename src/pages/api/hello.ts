import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
    // Your API logic here
    res.json({message : 'Hello'}); // Example response
}

export default handler;