import * as bodyParser from "body-parser";
import * as express from "express";
import { authorize } from "../config";
// tslint:disable-next-line: import-name
import Animal from "./animal.model";

const router = express.Router();

router.route("/").get(authorize, async (_, response) => {
  const animals = await Animal.find();
  return response.status(200).json(animals);
});

router
  .route("/")
  .post(authorize, bodyParser.json(), async (request, response) => {
    try {
      const animal = new Animal(request.body);
      await animal.save();
      return response.status(200).json("Animal saved!");
    } catch (error) {
      return response.status(400).send(error);
    }
  });

export default router;
