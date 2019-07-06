import * as bodyParser from 'body-parser';
import * as express from 'express';
// tslint:disable-next-line: import-name
import AdoptionRequests from './adoptionRequests.model';
import { UserType } from 'dc2410-coursework-common';
import Auth from '../Auth';

const router = express.Router();
router.use(bodyParser.json());

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

router.get('/animal/:id', Auth.verifyToken(), async (req, res) =>
  res.json(
    await AdoptionRequests.expandAllAsync(
      AdoptionRequests.listAllForAnimal(req.params.id),
    ),
  ),
);

router.post('/', Auth.verifyToken(), async (req, res) =>
  res.json(await AdoptionRequests.create(req.body)),
);

router.post(
  '/:id/approve',
  Auth.verifyToken(UserType.Internal),
  async (req, res) =>
    AdoptionRequests.approve(req.params.id)
      .then(data => res.json(data))
      .catch((error:Error) => res.status(404).json({ error: error.message })),
);

router.post(
  '/:id/deny',
  Auth.verifyToken(UserType.Internal),
  async (req, res) =>
    AdoptionRequests.deny(req.params.id)
      .then(data => res.json(data))
      .catch((e:Error) => res.status(404).json({ error: e.message })),
);

export default router;
