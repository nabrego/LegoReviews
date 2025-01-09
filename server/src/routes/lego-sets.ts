import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const rebrickableAPIKey: string = process.env.REBRICKABLE_API_KEY || "";

router.get("/sets", async (req: Request, res: Response) => {
    try {        
        const response = await axios.get('http://rebrickable.com/api/v3/lego/sets/?page_size=12',
        {
            params: {
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

export default router;