import { useQuery } from "react-query";
import { SelectedRepoType } from "../../type/stargazersType";
import { stargazersQuery } from "../../services/stargazersService";
import { PaginationType } from "../../type/repositoriesType";
import { useState } from "react";

type StargazersModalType = {
  onCloseModal: () => void;
  selectedRepo: SelectedRepoType;
};

export const StargazersModal = ({
  onCloseModal,
  selectedRepo,
}: StargazersModalType) => {
  const [paginationValue, setPaginationValue] = useState<PaginationType>({
    per_page: 10,
    page: 1,
  });

  const { data, isLoading } = useQuery<any>(
    ["stargazers", selectedRepo, paginationValue],
    () => stargazersQuery(selectedRepo, paginationValue),
    { enabled: Boolean(selectedRepo) }
  );

  const handlePageChange = (page: number) => {
    setPaginationValue((prevState) => ({ ...prevState, page: page }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <span
          className="absolute top-4 right-4 text-gray-400 cursor-pointer"
          onClick={onCloseModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        {isLoading ? (
          <div>Loading... Please wait a few secs</div>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100">ID</th>
                <th className="px-4 py-2 bg-gray-100">User Name</th>
                <th className="px-4 py-2 bg-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((el: any) => (
                <tr key={el.id}>
                  <td className="px-4 py-2 border-t">{el.id}</td>
                  <td className="px-4 py-2 border-t">{el.login}</td>
                  <td className="px-4 py-2 border-t">{el.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-l"
            onClick={() => handlePageChange(paginationValue.page - 1)}
            disabled={paginationValue.page === 1}
          >
            Previous
          </button>
          <div className="bg-gray-200 text-gray-700 py-1 px-2">
            {paginationValue.page}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r"
            onClick={() => handlePageChange(paginationValue.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
