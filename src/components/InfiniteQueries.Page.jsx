import { useInfiniteQuery } from "react-query";
import { Fragment } from "react";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) return pages.length + 1;

      return null;
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <div>
        {data?.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => {
                return (
                  <h2 key={color.id}>
                    {color.id} - {color.label}
                  </h2>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
        <p>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</p>
      </div>
    </>
  );
};

export default InfiniteQueriesPage;
