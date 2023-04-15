import { octokit } from "..";

export const getRepoCommits = async (
  owner: string,
  repo: string,
  page: number
) => {
  try {
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
      lastPage: Math.ceil((await getTotalCommits(owner, repo)) / 100),
      data: data.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getTotalCommits = async (owner: string, repo: string) => {
  try {
    const data = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 1,
    });
    const tmp = data.headers.link
      .split("page=")
      .slice(-1)
      .toString()
      .split(">");
    return parseInt(tmp[0]);
  } catch (error) {
    throw error;
  }
};

export const getRepoIssues = async (
  owner: string,
  repo: string,
  page: number,
  state: string
) => {
  try {
    if (state === "undefined") {
      state = "open";
    }
    let STATE: "open" | "closed" | "all";
    if (!(state === "open" || state === "closed" || state === "all"))
      throw new Error("Invalid state");
    STATE = state;

    const data = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 100,
      page: page,
      state: state,
    });
    return {
      total: data.data.length,
      data: data.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getRepoLanguages = async (owner: string, repo: string) => {
  try {
    const res = await octokit.request("GET /repos/{owner}/{repo}/languages", {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const data = res.data;
    // let sum = 0;
    // Object.values(data).forEach((value) => {sum+=value});
    // Object.keys(data).forEach((key) => {data[key] = (data[key]/sum)*100});
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRepoPoints = async (owner: string, repo: string) => {
  try {
    const commits = await getRepoCommits(owner, repo, 1);
    const issues = await getRepoIssues(owner, repo, 1, "open");
    const languages = await getRepoLanguages(owner, repo);
    let points = 0;
    // console.log("l1", commits, issues, languages);
    points += commits.totalNoOfCommits * 0.1;
    points += issues.total * 0.1;
    Object.values(languages).forEach((value) => {
      points += value * 0.1;
    });
    // console.log("l2", points);
    return points;
  } catch (error) {
    throw error;
  }
};
