// all routes with /repo prefix
import { Router, Request, Response, NextFunction } from "express";

import {
  getRepoCommits,
  getRepoIssues,
  getRepoLanguages,
  getRepoReadme,
  getUserLang,
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
      +req.query.page || 1,
      res.locals.octokit
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
      String(req.query.state),
      res.locals.octokit
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
    const repoLang = await getRepoLanguages(
      String(req.query.owner),
      String(req.query.repo),
      res.locals.octokit
    );
    const userLang = await getUserLang(String(req.query.username), res.locals.octokit);
    res.status(200).send({ userLang, repoLang });
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
      String(req.query.repo),
      res.locals.octokit
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
  router.get("/readme", handleGetRepoReadme);
  router.get("/languages", handleGetRepoLanguages);
  return router;
};
export default repoController;
