// all routes with /repo prefix
import { Router, Request, Response, NextFunction } from "express";
import { octokit } from "..";
import { getRepoCommits } from "./repo-service";

const handleGetRepoCommits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRepoCommits(String(req.query.owner), String(req.query.repo), +req.query.page || 1);
    res.status(200).send({ data });
  } catch (err) {
    res.status(404).send("INVALID DETAILS");
  }
};

const repoController = () => {
  const router = Router();
  router.get("/commits", handleGetRepoCommits);
  return router;
};
export default repoController;
