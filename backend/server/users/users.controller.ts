import * as express from 'express';
// tslint:disable-next-line: import-name
import Users from './users.model';
import bodyParser from 'body-parser';
import { sign, decode } from 'jsonwebtoken';
import Auth from '../Auth';

const router = express.Router();

router.post('/login', bodyParser.json(), async (req, res) => {
  try {
    console.log(req.body);
    const token = await Users.login(req.body.username, req.body.password);
    return res.json(token);
  } catch (e) {
    console.log(e);
    return res.sendStatus(403);
  }
});

router.post('/register', bodyParser.json(), async (req, res) => {
  res.json(await Users.create(req.body));
});

router.get('/profile', Auth.verifyToken(), async (req, res) => {
  res.json(req.params.user);
});

export default router;
