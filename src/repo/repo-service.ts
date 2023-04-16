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


export const getUserLang = async (username: string) => {
  try {
    const result = {}
    const res = await octokit.request('GET /users/{username}/repos', {
      username: username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    const tmp = [];
    for (let i = 0; i < res.data.length; i++) {
      tmp.push(await getRepoLanguages(username, res.data[i].name));
    }
    for (let i = 0; i < tmp.length; i++) {
      for (const [key, value] of Object.entries(tmp[i])) {
        if (result[key]) {
          result[key] += value;
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
  }

export const getRepoLanguages = async (owner: string, repo: string) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner: owner,
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    const data =  res.data;
    // let sum = 0;
    // Object.values(data).forEach((value) => {sum+=value});
    // Object.keys(data).forEach((key) => {data[key] = (data[key]/sum)*100});
    return data;
  } catch (error) {
    throw error;
  }

};

