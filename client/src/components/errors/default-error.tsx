import { HTTPError } from "ky";
import { NotFound } from "./not-found";

type DefaultErrorProps = {
  error: Error;
};

export function DefaultError({ error }: DefaultErrorProps) {
  if (error instanceof HTTPError && error.response.status === 404) {
    return <NotFound />;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <p>Ooops... Something went wrong.</p>
      <p>Please try again later.</p>
    </div>
  );
}
