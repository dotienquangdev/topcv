import Header from "../Header/header";
import { Helmet } from "react-helmet-async";

import Advertisement from "./advertisement/advertisement";
import BestJob from "./bestJobs/bestjob";
import Companies from "./companies/companie";
import Jobs from "./jobcpns/job";

function Main({ title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Jobs />
      <BestJob />
      <Advertisement />
      <Companies />
    </>
  );
}

export default Main;
