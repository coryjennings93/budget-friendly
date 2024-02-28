import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4">Oops!</h1>
      <p className="text-4xl">😮</p>
      <p className="m-4">This page does not exist.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="mt-4 text-blue-500 hover:text-blue-800">
        Click here to go back to the Home page.
      </Link>
    </div>
  );
};

export default NotFound;
