import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
// eslint-disable-next-line react/prop-types
const DynamicParallelPage = ({ heroIds }) => {
  const queriesResult = useQueries(
    // eslint-disable-next-line react/prop-types
    heroIds?.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queriesResult });
  return <div>DynamicParallelPage</div>;
};

export default DynamicParallelPage;
