// all routes with /repo prefix
import { Router, Request, Response, NextFunction } from "express";
import { octokit } from "..";
import {
  getRepoCommits,
  getRepoIssues,
  getRepoLanguages,
  getRepoReadme,
} from "./repo-service";

const handleGetRepoCommits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRepoCommits(
      String(req.query.owner),
      String(req.query.repo),
      +req.query.page || 1
    );
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const handleGetRepoIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRepoIssues(
      String(req.query.owner),
      String(req.query.repo),
      +req.query.page || 1,
      String(req.query.state)
    );
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const handleGetRepoLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRepoLanguages(
      String(req.query.owner),
      String(req.query.repo)
    );
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const handleGetRepoReadme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRepoReadme(
      String(req.query.owner),
      String(req.query.repo)
    )
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const repoController = () => {
  const router = Router();
  router.get("/commits", handleGetRepoCommits);
  router.get("/issues", handleGetRepoIssues);
  router.get("/languages", handleGetRepoLanguages);
  router.get("/readme", handleGetRepoReadme);
  return router;
};
export default repoController;
