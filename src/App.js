import React from "react";
import "./App.scss";
import Table from "./components/Table";
import data from "./fackData.json";

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "מספר תז",
        accessor: "tz",
      },
      {
        Header: "שם העובד",
        accessor: "name",
      },
      {
        Header: "שעות חריגות",
        accessor: "extraordinary",
      },
      {
        Header: "שעות ידניות",
        accessor: "manual",
      },
      {
        Header: "שעות",
        accessor: "hours",
      },
      {
        Header: "סך הכל שעות",
        accessor: "total",
      },
      {
        Header: "אפשרויות",
        accessor: "setting",
      },
    ],
    []
  );

  const thedata = React.useMemo(() => data, []);
  return (
   
      <div className="App">
        <header className="App-header"></header>
        <Table columns={columns} data={thedata}></Table>
      </div>
   
  );
}

export default App;

