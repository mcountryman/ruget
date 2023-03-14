import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";

export function useMapQueryData<T, TData = unknown, TError = unknown>(
  result: UseQueryResult<TData, TError>,
  mapFn: (data: TData) => T,
) {
  return useMemo(() => {
    return {
      ...result,
      data: result.data === undefined ? undefined : mapFn(result.data),
    } as UseQueryResult<T, TError>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.data]);
}
