import { useEffect, useState } from "react";

export const appPaths = [
  "/",
  "/dashboard",
  "/products",
  "/orders",
  "/customers",
  "/marketing",
  "/storefront",
  "/settings",
] as const;

export type AppPath = (typeof appPaths)[number];

function normalizePath(pathname: string): AppPath {
  const cleaned = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  if (appPaths.includes(cleaned as AppPath)) {
    return cleaned as AppPath;
  }

  return "/dashboard";
}

export function navigate(path: AppPath) {
  const next = normalizePath(path);

  if (window.location.pathname !== next) {
    window.history.pushState({}, "", next);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

export function useRoute() {
  const [route, setRoute] = useState<AppPath>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);

    if (!appPaths.includes(window.location.pathname as AppPath)) {
      window.history.replaceState({}, "", "/dashboard");
      setRoute("/dashboard");
    }

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return route;
}
