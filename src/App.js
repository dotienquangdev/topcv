import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { systemInfo } from "./actions/system";
import { getSystem } from "./services/system";
import AllRouter from "./AllRouters";

import { AuthProvider } from "./helper/AuthContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSystem = async () => {
      const result = await getSystem();
      dispatch(systemInfo(result.data));
    };
    fetchSystem();
  }, [dispatch]);

  const system = useSelector((state) => state.systemInfoReducer);

  return (
    <>
      <AuthProvider>
        <AllRouter />
      </AuthProvider>
    </>
  );
}

export default App;
