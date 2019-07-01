import * as express from 'express';
// tslint:disable-next-line: import-name
import Users from './users.model';
import bodyParser from 'body-parser';
import Auth from '../Auth';

const router = express.Router();

router.post('/login', bodyParser.json(), async (req, res) => {
  try {
    const token = await Users.login(req.body.username, req.body.password);
    return res.json(token);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});

router.post('/register', bodyParser.json(), async (req, res) => {
  try {
    const user = await Users.create(req.body);
    return res.json(user);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});

router.get('/profile', Auth.verifyToken(), async (req, res) => {
  res.json(req.params.user);
});

export default router;
