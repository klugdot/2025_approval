import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home";
import Layout from "./Layout";
import ApprList from "./components/pages/ApprList";
import ApprDetail from "./components/pages/ApprDetail";
import ApprAdd from "./components/pages/ApprAdd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/approvalList" element={<ApprList />} />
        <Route path="/approvalList/:num" element={<ApprDetail />} />
        <Route path="/addApproval" element={<ApprAdd />} />

        <Route path="*" element={<div>Not found 404</div>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
