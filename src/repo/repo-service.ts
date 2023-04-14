import { octokit } from "..";

export const getRepoCommits = async (
  owner: string,
  repo: string,
  page: number
) => {
    console.log(owner, repo, page)
  const data = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: owner,
    repo: repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    per_page: 100,
    page: page,
  });
  return {
    totalNoOfCommits: await getTotalCommits(owner, repo),
    pageNum: page,
    commitsOnThisPage: data.data.length,
    lastPage: Math.ceil(await getTotalCommits(owner, repo) / 100),
    data: data.data,
  };
};

export const getTotalCommits = async (owner: string, repo: string) => {
  const data = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: owner,
    repo: repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    per_page: 1,
  });
  const tmp = data.headers.link.split("page=").slice(-1).toString().split(">");
  return parseInt(tmp[0]);
};
