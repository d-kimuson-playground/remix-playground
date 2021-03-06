/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare/globals" />
/// <reference types="@cloudflare/workers-types" />

declare let process: {
  env: { NODE_ENV: "development" | "production" }
}
