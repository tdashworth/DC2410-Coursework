import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import * as path from 'path';

import { UserType } from 'dc2410-coursework-common';
import Auth from '../Auth';
import Animals from './animals.model';

const router = express.Router();
// Converts the body to JSON for every request to this route.
router.use(bodyParser.json());

/**
 * The user must be authenticated to make this request.
 * Returns either all animals for a Internal user or only available animals for Extenal users via the model.
 */
router.get('/', Auth.verifyToken(), async (req, res) => {
  switch (req.params.user.type) {
    case UserType.External:
      return res.json(await Animals.listAllAvailable());
    case UserType.Internal:
      return res.json(await Animals.listAll());
  }
});

/**
 * The user must be authenticated to make this request and be of type Internal.
 * Creates an animal via the model using the data from the request body. Returns the created animal.
 */
router.post('/', Auth.verifyToken(UserType.Internal), async (req, res) =>
  res.json(await Animals.create(req.body)),
);

/**
 * The user must be authenticated to make this request.
 * Returns an animal via the model using the id within the URL.
 */
router.get('/:id', Auth.verifyToken(), async (req, res) =>
  res.json(await Animals.get(req.params.id)),
);

/**
 * The user must be authenticated to make this request and be of type Internal.
 * Updated an animal via the model using the id from the URL and data within the requst body.
 */
router.put('/:id', Auth.verifyToken(UserType.Internal), async (req, res) =>
  res.json(await Animals.update(req.params.id, req.body)),
);

// File uploader settings used to define the location and filename.
const fileUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.resolve('..', 'frontend', 'build', 'uploads')),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

/**
 * The user should ideally be authenticated to make this request and by type Internal.
 * Uploads the image from the request and links the with the corresponding animal using the id form the URL. The user is then redirected the the animals page. 
 */
router.post(
  '/:id/image',
  // Auth.verifyToken(UserType.Internal),
  fileUploader.single('image'),
  async (req, res) => {
    await Animals.addImage(req.params.id, `/uploads/${req.file.filename}`);
    res.redirect(`/animal/${req.params.id}`);
  },
);

export default router;
