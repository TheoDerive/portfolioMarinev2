import { Octokit } from "@octokit/rest";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";

const MyOctokit = Octokit.plugin(createOrUpdateTextFile)
export const octokit = new MyOctokit({
    auth: process.env.GITHUB_TOKEN
})