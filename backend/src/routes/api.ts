import express from 'express';
import httpStatus from 'http-status';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post('/', (req, res) => {
  res.sendStatus(httpStatus.METHOD_NOT_ALLOWED);
});

export default router;
