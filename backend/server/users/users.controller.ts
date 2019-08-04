import bodyParser from 'body-parser';
import * as express from 'express';
import Auth from '../Auth';
import Users from './users.model';

const router = express.Router();
// Converts the body to JSON for every request to this route.
router.use(bodyParser.json());

/**
 * No authentication required.
 * Validates the given credentials via the model and return a jwt for the user to store.
 */
router.post('/login', async (req, res) => {
  try {
    const token = await Users.login(req.body.username, req.body.password);
    return res.json(token);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});

/**
 * No authentication required.
 * Creates a new user with the given data in the request body.
 */
router.post('/register', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    return res.json(user);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});

/**
 * The user must be authenticated to make this request.
 * Returns the authenticated users model via the model.
 */
router.get('/profile', Auth.verifyToken(), async (req, res) => {
  res.json(req.params.user);
});

export default router;
