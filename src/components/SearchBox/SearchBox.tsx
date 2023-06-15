import { useQuery } from "react-query";
import { searchRepositories } from "../../services/repositoriesService";
import { useState } from "react";
import { PaginationType } from "../../type/repositoriesType";
import { StargazersModal } from "../modal/StargazersModal";
import { SelectedRepoType } from "../../type/stargazersType";
import { useDebounce } from "use-debounce";

export const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchKey, 300);
  const [paginationValue, setPaginationValue] = useState<PaginationType>({
    per_page: 10,
    page: 1,
  });
  const [selectedRepo, setSelectedRepo] = useState<SelectedRepoType>({
    owner: "",
    name: "",
  });
  const [visible, setVisible] = useState<boolean>(false);

  const { data, isLoading } = useQuery<any>(
    ["repositories", debouncedSearchQuery, paginationValue],
    () => searchRepositories(debouncedSearchQuery, paginationValue),
    { enabled: Boolean(debouncedSearchQuery) }
  );

  const onCloseModal = () => {
    setVisible(false);
  };

  const handlePageChange = (page: number) => {
    setPaginationValue((prevState) => ({ ...prevState, page: page }));
  };

  return (
    <>
      <form>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => {
              setSearchKey(e.target.value);
              setPaginationValue((prevState) => ({ ...prevState, page: 1 }));
            }}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {isLoading ? (
        <div>Page is loading...</div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-100">ID</th>
                      <th className="px-4 py-2 bg-gray-100">Repository Name</th>
                      <th className="px-4 py-2 bg-gray-100">User Name</th>
                      <th className="px-4 py-2 bg-gray-100">Stars</th>
                      <th className="px-4 py-2 bg-gray-100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.items?.map((el: any) => (
                      <tr key={el.id}>
                        <td className="px-4 py-2 border-t">{el.id}</td>
                        <td className="px-4 py-2 border-t">{el.name}</td>
                        <td className="px-4 py-2 border-t">{el.owner.login}</td>
                        <td className="px-4 py-2 border-t">
                          {el.stargazers_count}
                        </td>
                        <td className="px-4 py-2 border-t ">
                          <button
                            className="hover:bg-sky-700 bg-blue-500 rounded"
                            onClick={() => {
                              setSelectedRepo({
                                owner: el.owner.login,
                                name: el.name,
                              });
                              setVisible(true);
                            }}
                          >
                            See who stared this repo
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          onClick={() => handlePageChange(paginationValue.page - 1)}
          disabled={paginationValue.page === 1}
        >
          Previous
        </button>
        <div className="bg-gray-200 text-gray-700 py-2 px-4">
          {paginationValue.page}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={() => handlePageChange(paginationValue.page + 1)}
        >
          Next
        </button>
      </div>
      {visible && (
        <StargazersModal
          onCloseModal={onCloseModal}
          selectedRepo={selectedRepo}
        />
      )}
    </>
  );
};
