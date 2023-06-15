import axios from "axios";
import { PaginationType } from "../type/repositoriesType";
import { SelectedRepoType } from "../type/stargazersType";

export const stargazersQuery = async (
  repoInfo: SelectedRepoType,
  pagination: PaginationType
): Promise<any> => {
  const response = await axios.get(
    `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.name}/stargazers`,
    {
      params: {
        per_page: pagination.per_page,
        page: pagination.page,
      },
      headers: {
        Authorization: `Bearer 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`,
      },
    }
  );

  return response.data;
};
