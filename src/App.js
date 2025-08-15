import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { systemInfo } from "./actions/system";
import { getSystem } from "./services/system";
import Layout from "./layouts/layout/layout";
import AllRouter from "./AllRouters";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSystem = async () => {
      const result = await getSystem();
      dispatch(systemInfo(result.data));
    };
    fetchSystem();
  }, []);
  const system = useSelector((state) => state.systemInfoReducer);
  // const elements = useRoutes(routes);

  return (
    <>
      {/* <HelmetProvider>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </HelmetProvider> */}
      <AllRouter />
    </>
  );
}

export default App;
