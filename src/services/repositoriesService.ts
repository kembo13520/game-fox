import axios from "axios";
import { PaginationType } from "../type/repositoriesType";

export const searchRepositories = async (
  searchQuery: string,
  pagination: PaginationType
): Promise<any> => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    {
      params: {
        q: searchQuery,
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
