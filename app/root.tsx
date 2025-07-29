import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LinksFunction,
  useLoaderData,
  LoaderFunction,
} from "react-router";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import "./app.css";
import { HeroUIProvider } from "@heroui/react";
import PopUpProvider from "./containers/PopUp/PopUpProvider";
import { useEffect } from "react";
import { ServerContextProvider } from "./containers/serverContext";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = ({ context }) => {
  return context;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
            {children}
            <ScrollRestoration />
            <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const context = useLoaderData<any>();
  useEffect(() => {
    const setViewPort = () => {
      document.body.style.setProperty('--vh', `${window.innerHeight / 100}px`);
      document.body.style.setProperty('--vw', `${window.innerWidth / 100}px`);
    }
    window.addEventListener('resize', setViewPort);
    setViewPort();
    return () => window.removeEventListener('resize', setViewPort);
  }, []);
  return (
    <I18nextProvider i18n={i18next}>
      <ServerContextProvider context={context}>
        <PopUpProvider>
          <HeroUIProvider>
            <Outlet />
          </HeroUIProvider>
        </PopUpProvider>
      </ServerContextProvider>
    </I18nextProvider>
  );
}

export const ErrorBoundary = ({ error }) => {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
