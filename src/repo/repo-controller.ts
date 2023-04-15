// all routes with /repo prefix
import { Router, Request, Response, NextFunction } from "express";
import { octokit } from "..";
import {
  getRepoCommits,
  getRepoIssues,
  getRepoLanguages,
  getRepoPoints,
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

const handleGetRepoPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRepoPoints(
      String(req.query.owner),
      String(req.query.repo)
    );
    // console.log("dat", data);
    res.status(200).json({ points: data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const repoController = () => {
  const router = Router();
  router
    .get("/commits", handleGetRepoCommits)
    .get("/issues", handleGetRepoIssues)
    .get("/languages", handleGetRepoLanguages)
    .get("/points", handleGetRepoPoints);
  return router;
};
export default repoController;
