import { Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import HomePage from "./components/Home.Page";
import RQSuperHeroPage from "./components/RQSuperHero.Page";
import ParallelQueriesPage from "./components/ParallelQueries.Page";
import DynamicParallelPage from "./components/DynamicParallel.Page";
import DependentQueries from "./components/DependentQueries";
import PaginationQueriesPage from "./components/PaginationQueries.Page";
import InfiniteQueriesPage from "./components/InfiniteQueries.Page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/super-heroes">Traditional Super Heroes</Link>
          </li>
          <li>
            <Link to="/rq-super-heroes">RQ Super Heroes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="super-heroes" element={<SuperHeroesPage />}></Route>
        <Route path="rq-super-heroes" element={<RQSuperHeroesPage />}></Route>
        <Route
          path="rq-super-heroes/:heroId"
          element={<RQSuperHeroPage />}
        ></Route>
        <Route path="/rq-paginated" element={<PaginationQueriesPage />}></Route>
        <Route path="/rq-infinite" element={<InfiniteQueriesPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/rq-parallel" element={<ParallelQueriesPage />}></Route>
        <Route
          path="/rq-dynamic-parallel"
          element={<DynamicParallelPage heroIds={[1, 2]} />}
        ></Route>
        <Route
          path="/rq-dependent"
          element={<DependentQueries email="parus@example.com " />}
        ></Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
