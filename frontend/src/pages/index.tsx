import App from "../components/App";
import { Provider, rootStore } from "../models/Root";

export default function Home() {
  return (
    <Provider value={rootStore}>
      <App />
    </Provider>
  );
}
