// eslint-disable-next-line import/no-extraneous-dependencies
import { createEnv } from "@t3-oss/env-nextjs";
import { STRING_NOT_EMPTY } from "lib/zod";

export const envs = createEnv({
  client: {
    NEXT_PUBLIC_INDEXER_URL: STRING_NOT_EMPTY,
  },
  runtimeEnv: {
    NEXT_PUBLIC_INDEXER_URL: process.env.NEXT_PUBLIC_INDEXER_URL,
  },
  emptyStringAsUndefined: true,
});
