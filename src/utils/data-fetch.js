import { useMemo } from "react";

export function useResource(promise, ...args) {
  const resource = useMemo(() => createResource(promise, args), [promise, args]);
  return resource;
}

function createResource(promise, args) {
  let status = "pending"
  let result

  const suspend = promise(...args).then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  )

  return {
    read() {
      if (status === "pending") {
        throw suspend;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};