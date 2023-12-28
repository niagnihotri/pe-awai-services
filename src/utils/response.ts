/* eslint-disable @typescript-eslint/no-explicit-any */

import { APIGatewayProxyResult } from "aws-lambda";

interface Headers {
  [key: string]: string | number | boolean;
}

interface HttpResponse {
  id: string;
  status: number;
  headers?: { [k: string]: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

const defaultHeaders: Headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Authorization,Content-Type," +
    "Text,X-Amz-Date,X-Amz-Security-Token,X-Amz-User-Agent,X-Api-Key,X-Auth-Id,X-Auth-Role,X-Customer-Id,X-NMG-Group",
  "Access-Control-Allow-Credentials": true,
};
const defaultResponse = { message: "submitted" };
const redirectResponse = { message: "redirected" };

const response = (
  statusCode: number,
  payload: any,
  customHeaders?: Headers
): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    ...defaultHeaders,
    ...customHeaders,
  },
  body: typeof payload === "string" ? payload : JSON.stringify(payload),
});

export default {
  ok: (payload?: any): APIGatewayProxyResult =>
    response(200, payload || defaultResponse),
  error: (statusCode: number, payload: string | any): APIGatewayProxyResult =>
    response(
      statusCode,
      typeof payload === "string" ? { message: payload } : payload
    ),
  multiStatus: (payload?: HttpResponse): APIGatewayProxyResult =>
    response(207, payload),
  redirect: (location: string, payload?: any): APIGatewayProxyResult =>
    response(301, payload || redirectResponse, { location }),
};
