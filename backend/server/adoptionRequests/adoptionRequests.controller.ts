import * as bodyParser from 'body-parser';
import * as express from 'express';
// tslint:disable-next-line: import-name
import AdoptionRequests from './adoptionRequests.model';
import { UserType } from 'dc2410-coursework-common';
import Auth from '../Auth';

const router = express.Router();
router.use(bodyParser.json());

router.get(
  '/',
  Auth.verifyToken(),
  async (req, res) => {
    switch (req.params.user.type) {
      case UserType.External:
        return res.json(await AdoptionRequests.listAllMine(req.params.user.id));
      case UserType.Internal:
        return res.json(await AdoptionRequests.listAll());
    }
  });

router.get(
  '/animal/:id',
  Auth.verifyToken(),
  async (req, res) => res.json(await AdoptionRequests.listAllForAnimal(req.params.id)),
);

router.post(
  '/',
  Auth.verifyToken(),
  async (req, res) => res.json(await AdoptionRequests.create(req.body)),
);

router.post(
  '/:id/approve',
  Auth.verifyToken(UserType.Internal),
  async (req, res) => res.json(await AdoptionRequests.approve(req.params.id)),
);

router.post(
  '/:id/deny',
  Auth.verifyToken(UserType.Internal),
  async (req, res) => res.json(await AdoptionRequests.deny(req.params.id)),
);

export default router;
