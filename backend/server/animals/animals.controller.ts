import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import * as path from 'path';

import Animals from './animals.model';
import Auth from '../Auth';
import { UserType } from 'dc2410-coursework-common';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', Auth.verifyToken(), async (req, res) => {
  switch (req.params.user.type) {
    case UserType.External:
      return res.json(await Animals.listAllAvailable());
    case UserType.Internal:
      return res.json(await Animals.listAll());
  }
});

router.post('/', Auth.verifyToken(UserType.Internal), async (req, res) =>
  res.json(await Animals.create(req.body)),
);

router.get('/:id', Auth.verifyToken(), async (req, res) =>
  res.json(await Animals.get(req.params.id)),
);

const fileUploader = multer({
  dest: path.resolve('..', 'frontend', 'build', 'uploads'),
});

router.put('/:id', Auth.verifyToken(UserType.Internal), async (req, res) =>
  res.json(await Animals.update(req.params.id, req.body)),
);

router.post(
  '/:id/image',
  Auth.verifyToken(UserType.Internal),
  fileUploader.single('image'),
  async (req, res) =>
    await Animals.addImage(req.params.id, `/uploads/${req.file.filename}`),
);

export default router;
