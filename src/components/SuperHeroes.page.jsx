import { useState, useEffect } from "react";
import axios from "axios";
const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:4000/superheroes");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        // console.log("this is finally");
      }
    })();
  }, []);
  if (error) return <h2>{error}</h2>;
  if (isLoading) return <h2> Loading...</h2>;

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default SuperHeroesPage;
