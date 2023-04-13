import express from 'express';
import { protect } from '../middleware/authMiddleware.js';


const defaultRouter = express.Router();

defaultRouter.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Up and running</h1>");
    res.end();
});

router.post("/doSomething", async (req, res) => {
    try {
        // maybe do some database interaction or third-party API call here!
        res.status(200).send({ data: "success" });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "bad request" });
    }
});

export default defaultRouter;