import { useSearchParams } from "react-router-dom";
import "./App.css";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams("workspaceId=my-workspace");

  return (
    <div className="App">
      {searchParams}
      <button onClick={() => setSearchParams(params)}>click me</button>
    </div>
  );
}

export default App;
