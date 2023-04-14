import express from "express";
import { Octokit } from "octokit";
import configs from "./configs";

(async () => {
  const app = express();

  const octokit = new Octokit({
    auth: configs.GITHUB_TOKEN,
  });

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  // get repository commits
  app.get("/repo/commits/:owner/:repo", async (req, res) => {
    try {
      // console.log(req.params);
      const test = await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: req.params.owner,
        repo: req.params.repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      res.status(200).send({ data: test.data });
    } catch (err) {
      res.status(404).send("INVALID DETAILS");
    }
  });

  const port = configs.PORT;
  app.listen(port, () => {
    console.log("Server is running on port 3000");
  });
})();
