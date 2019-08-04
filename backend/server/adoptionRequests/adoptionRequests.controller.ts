import * as bodyParser from 'body-parser';
import { UserType } from 'dc2410-coursework-common';
import * as express from 'express';
import Auth from '../Auth';
import AdoptionRequests from './adoptionRequests.model';

const router = express.Router();
// Converts the body to JSON for every request to this route.
router.use(bodyParser.json());

/**
 * The user must be authenticated to make this request.
 * Returns either all requests for a Internal user or only the user's requests for Extenal users via the model.
 */
router.get('/', Auth.verifyToken(), async (req, res) => {
  switch (req.params.user.type) {
    case UserType.External:
      return res.json(
        await AdoptionRequests.expandAllAsync(
          AdoptionRequests.listAllMine(req.params.user.id),
        ),
      );
    case UserType.Internal:
      return res.json(
        await AdoptionRequests.expandAllAsync(AdoptionRequests.listAll()),
      );
  }
});

/**
 * The user must be authenticated to make this request and be of type Internal.
 * Returns all requests via the model for the given aniaml id in the URL.
 */
router.get(
  '/animal/:id',
  Auth.verifyToken(UserType.Internal),
  async (req, res) =>
    res.json(
      await AdoptionRequests.expandAllAsync(
        AdoptionRequests.listAllForAnimal(req.params.id),
      ),
    ),
);

/**
 * The user must be authenticated to make this request.
 * Creates a request via the model based upon the body data. The result (a copy after being saved) is returned.
 */
router.post('/', Auth.verifyToken(), async (req, res) =>
  res.json(await AdoptionRequests.create(req.body)),
);

/**
 * The user must be authenticated to make this request and be of type Internal.
 * Approves a request via the model based upon the id within the URL. The updated request is returned.
 */
router.post(
  '/:id/approve',
  Auth.verifyToken(UserType.Internal),
  async (req, res) =>
    AdoptionRequests.approve(req.params.id)
      .then((data) => res.json(data))
      .catch((error: Error) => res.status(404).json({ error: error.message })),
);

/**
 * The user must be authenticated to make this request and be of type Internal.
 * Denys a request based upon the id within the URL. The updated request is returned.
 */
router.post(
  '/:id/deny',
  Auth.verifyToken(UserType.Internal),
  async (req, res) =>
    AdoptionRequests.deny(req.params.id)
      .then((data) => res.json(data))
      .catch((e: Error) => res.status(404).json({ error: e.message })),
);

export default router;
