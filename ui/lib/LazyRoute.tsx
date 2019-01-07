import React, { ComponentType, lazy, Suspense } from "react";

interface LazyProps {
  load: () => Promise<{ default: ComponentType }>;
  loading: ComponentType|string;
}

export const LazyRoute = ({ load, loading: Loading }: LazyProps) => {
  const Component = lazy(load);

  return (
    <Suspense fallback={Loading}>
      <Component />
    </Suspense>
  );
}


export async function lazyLoad<T> (loader: Promise<T>, prop?: keyof T) {
  const result = await loader;

  return prop ? result[prop] : result;
}
