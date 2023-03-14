import { nanoid } from "nanoid";

/**
 * A request type that can be sent to a {@link Worker}.
 *
 * @typeparam TName The name of the request.
 * @typeparam TArgs The type of the request arguments.
 * @typeparam _TResult The type of the request result.
 */
export interface Req<TName, TArgs, _TResult> {
  id: string;
  name: TName;
  args: TArgs;
}

type Res<TResult> = ResOk<TResult> | ResErr;

interface ResOk<TResult> {
  id: string;
  status: "ok";
  result: TResult;
}

interface ResErr {
  id: string;
  status: "err";
  error: Error;
}

type ReqName<TReq> = TReq extends Req<infer TName, any, any> ? TName : never;
type ReqArgs<TReq> = TReq extends Req<any, infer TArgs, any> ? TArgs : never;
type ReqResult<TReq> = TReq extends Req<any, any, infer TResult> ? TResult : never;

/**
 * Sends a {@link Req} to the given {@link Worker} and returns a {@link Promise} that resolves the
 * result of the request.
 *
 * @param worker - The worker to send the request to.
 * @param name - The name of the request.
 * @param args - The arguments of the request.
 * @returns - A promise that resolves the result of the request.
 */
export function postReq<
  _TReq extends Req<TName, TArgs, TResult>,
  TName = ReqName<_TReq>,
  TArgs = ReqArgs<_TReq>,
  TResult = ReqResult<_TReq>,
>(worker: Worker, name: TName, args: TArgs): Promise<TResult> {
  const id = nanoid();

  return new Promise((resolve, reject) => {
    function onMessage(event: MessageEvent<Res<TResult>>) {
      if (event.data.id === id) {
        worker.removeEventListener("message", onMessage);

        const response = event.data;
        if (response.status === "ok") {
          return resolve(response.result);
        } else {
          return reject(response.error);
        }
      }
    }

    worker.addEventListener("message", onMessage);
    worker.postMessage({ id, name, args });
  });
}

/**
 * Creates a request handler for a given {@link Req} type.
 * @param handler - The handler function.
 * @returns - A request handler function.
 */
export function createReqHandler<
  TReq extends Req<TName, TArgs, TResult>,
  TName = ReqName<TReq>,
  TArgs = ReqArgs<TReq>,
  TResult = ReqResult<TReq>,
>(handler: (args: TArgs) => Promise<TResult>) {
  return function onRequest(req: TReq) {
    handler(req.args)
      .then(result => postMessage({ id: req.id, status: "ok", result }))
      .catch(error => postMessage({ id: req.id, status: "err", error }));
  };
}
