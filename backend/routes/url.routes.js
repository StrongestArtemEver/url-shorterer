import express from 'express';
import {
  createShortLink,
  getShortLink,
  getUrlStats,
  updateUrlStats,
} from '../controllers/url.controller.js';
import dotenv from 'dotenv';
dotenv.config();

export const urlRouter = express.Router();

/**
 * @swagger
 * /short:
 *   post:
 *     summary: Create a short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 example: "https://example.com"
 *             required:
 *               - link
 *     responses:
 *       201:
 *         description: Short URL created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   example: "http://localhost:3000/abc123"
 */

urlRouter.post('/short', async (req, res) => {
  try {
    const port = process.env.PORT;
    const shortCode = await createShortLink(req.body.link);
    let shortLink = `http://127.0.0.1:${port}/redirect/${shortCode}`;
    res.status(200).send(shortLink);
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }
    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
});

/**
 * @swagger
 * /redirect/{shortCode}:
 *   get:
 *     summary: Redirect to original URL by short code
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The short code to redirect
 */

urlRouter.get('/redirect/:shortCode', async (req, res) => {
  try {
    const link = await getShortLink(req.params.shortCode);
    await updateUrlStats(req.params.shortCode);
    res.redirect(link);
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }
    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
});

/**
 * @swagger
 * /stats:
 *   post:
 *     summary: get stats for short code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 example: "Y75Hut"
 *             required:
 *               - link
 *     responses:
 *       201:
 *         description: follows
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 follows:
 *                   type: int
 *                   example: 20
 */

urlRouter.post('/stats', async (req, res) => {
  try {
    const stats = await getUrlStats(req.body.link);
    res.status(200).send(stats);
  } catch (e) {
    if (e instanceof Error) {
      throw new e();
    }
    throw new Error(`Unknown error: ${JSON.stringify(e)}`);
  }
});
