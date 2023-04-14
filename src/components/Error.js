import "./Error.css";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  return (
    <div className="error-page">
      <h1>{error?.data?.status ?? 404}</h1>
      <p>{error?.data?.message ?? "Not Found"}</p>
    </div>
  );
}

export default Error;
