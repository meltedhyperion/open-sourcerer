import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import { Octokit } from "octokit";
import configs from "./configs";
import helmet from "helmet";
import cors from "cors";
import repoController from "./repo";

// export const octokit = new Octokit({
//   auth: configs.GITHUB_TOKEN,
// });

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send("Unauthorized");
      return;
    }
    const ghToken = req.headers.authorization.split(" ")[1];
    if (!ghToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const octokit = new Octokit({
      auth: ghToken,
    });
    const { data } = await octokit.request("GET /user");
    if (!data) {
      res.status(401).send("Unauthorized");
      return;
    }
    res.locals.user = data;
    res.locals.octokit = octokit;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
    return;
  }
};

(async () => {
  const app = express();

  app
    .use(helmet())
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/repo", authenticate, repoController());

  const port = configs.PORT;
  app.listen(port, () => {
    console.log("Server is running on port 3000");
  });
})();
