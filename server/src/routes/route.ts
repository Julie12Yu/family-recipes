import { putRoute } from "./put";
import { deleteRoute } from "./delete";
import { getAllRoute } from "./getAll";
import { getRecipeRoute } from "./getRecipe";
import { loginRoute } from "./login";

import { Router, Request, Response } from "express";

const router = Router();

router.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from the server!" });
});

router.use(deleteRoute);
router.use(getAllRoute);
router.use(getRecipeRoute);
router.use(loginRoute);
router.use(putRoute);

export { router as routes };
