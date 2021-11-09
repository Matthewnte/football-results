const express = require('express');
const multer = require('../middleware/multer');
const resultsController = require('../controller/results');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Results:
 *       type: object
 *       required:
 *         - id
 *         - Div
 *         - Season
 *         - Date
 *         - HomeTeam
 *         - AwayTeam
 *         - FTHG
 *         - FTAG
 *         - FTR
 *         - HTHG
 *         - HTAG
 *         - HTR
 *       properties:
 *         id:
 *            type: string
 *            description: Id extracted from csv file
 *         Div:
 *            type: string
 *            description: teams division
 *         Season:
 *            type: string
 *            description: yearly season
 *         Date:
 *            type: data
 *            description: Day of match
 *         HomeTeam:
 *            type: string
 *            description: The home team
 *         AwayTeam:
 *            type: string
 *            description: The away team
 *         FTHG:
 *            type: string
 *            description: Teams FTHG
 *         FTAG:
 *            type: string
 *            description: Teams FTAG
 *         FTR:
 *            type: string
 *            description: Teams FTR
 *         HTHG:
 *            type: string
 *            description: Teams HTHG
 *         HTAG:
 *            type: string
 *            description: Teams HTAG
 *         HTR:
 *            type: string
 *            description: HTR of the results
 */

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: The results API
 */

/**
 * @swagger
 * /v1/csv:
 *   post:
 *     Summary: Import CSV data into the results Table
 *     tags: [results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: A success message
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Results'
 *       400:
 *         description: Bad parameters
 */
router.post('/csv', multer.uploadCsv, resultsController.uploadCSV);

/**
 * @swagger
 * /v1/seasons:
 *   get:
 *     Summary: Returns a list of all available seasons
 *     tags: [results]
 *     responses:
 *       200:
 *         description: The list of all available seasons
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Results'
 *       400:
 *         description: Bad parameters
 */
router.get('/seasons', resultsController.getAllSeasonPairs);

/**
 * @swagger
 * /v1/seasons/{season}:
 *   get:
 *     Summary: Returns a list of results from one season
 *     tags: [results]
 *     parameters:
 *      - in: path
 *        name: season
 *        schema:
 *          type: string
 *        required: true
 *        description: The season value
 *     responses:
 *       200:
 *         description: The list of all available seasons
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Results'
 *       400:
 *         description: Bad parameters
 */
router.get('/seasons/:season', resultsController.getSingleSeason);

module.exports = router;
