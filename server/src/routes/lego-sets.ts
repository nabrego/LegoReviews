import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const rebrickableAPIKey: string = process.env.REBRICKABLE_API_KEY || "";

router.get("/sets", async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const response = await axios.get('http://rebrickable.com/api/v3/lego/sets/',
        {
            params: {
                page,
                page_size: 12
            },
            headers: {
                'Authorization': `key ${rebrickableAPIKey}`
            }
        });
        res.json(response.data.results);
    } catch (err) {
        console.error('Error fetching Lego sets!', err);
        res.status(500).json({ message: 'Error fetching Lego sets!'});
    }
});

router.get("/sets/search/:term", async (req: Request, res: Response) => {
    try {
        const searchTerm = req.params.term;
        const page = parseInt(req.query.page as string) || 1;
        const response = await axios.get('http://rebrickable.com/api/v3/lego/sets/', {
            params: {
                search: searchTerm,
                page,
                page_size: 12,
            },
            headers: {
                'Authorization': `key ${rebrickableAPIKey}`
            }
        });
        res.json({
            results: response.data.results,
            count: response.data.count
        });
    } catch (err) {
        console.error('Error searching Lego sets!', err);
        res.status(500).json({ message: 'Error searching Lego sets!' });
    }
});

export default router;