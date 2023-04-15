import express from "express";
import { Octokit } from "octokit";
import configs from "./configs";
import helmet from "helmet";
import cors from "cors";
import repoController from "./repo";

export const octokit = new Octokit({
  auth: configs.GITHUB_TOKEN,
});

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

  app.use("/repo", repoController());

  const port = configs.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port 3000`);
  });
})();
