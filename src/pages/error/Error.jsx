import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="w-full h-screen flex flex-col justify-center items-center gap-4"
    >
      <h1 className="text-5xl font-bold uppercase text-center">Oops!</h1>
      <p className="text-2xl text-center">
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i className="text-center">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
