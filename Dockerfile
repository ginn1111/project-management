FROM node:20-slim AS base
# set up for pnpm package manager
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /client
COPY package.json pnpm-lock.yaml ./

FROM base as deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base as builder
WORKDIR /client
COPY . .
COPY --from=deps /client/node_modules ./node_modules/
RUN pnpm run build

FROM base as runner
WORKDIR /client

COPY --from=builder /client/public ./public
COPY --from=builder /client/.next/standalone ./
COPY --from=builder /client/.next/static ./.next/static

EXPOSE 3000
CMD [ "node", "server.js" ]
