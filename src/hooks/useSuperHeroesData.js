import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axiosUtils";

const fetchHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  // return axios.post(`http://localhost:4000/superheroes`, hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchHeroes, {
    // enabled: false, // default true when need to fetch on a click or any event
    onSuccess,
    onError,
    // staleTime: 30000, // default === 0sec
    // cacheTime: 20000, // default === 5minutes
    // refetchOnMount: true  // default
    // refetchOnWindowFocus: true // default
    // refetchInterval: 2000, // default false need to set in milliseconds
    // refetchIntervalInBackground: true // default false
    // select: (data) => {
    //   return data.data.map((hero) => hero.name);
    // },
  });
};

// Adding or posting something to api

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // getting back the hero we add to api with and without a get request
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    //   // Optimistic updates which adds the hero as soon as the request sent and also makes a get request on allSettled
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
