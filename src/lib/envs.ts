// eslint-disable-next-line import/no-extraneous-dependencies
import { createEnv } from '@t3-oss/env-nextjs';

import { STRING_NOT_EMPTY } from '@/lib/zod';

export const envs = createEnv({
  client: {
    // RainbowKit
    NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID: STRING_NOT_EMPTY,
  },
  runtimeEnv: {
    // RainbowKit
    NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID:
      process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID,
  },
  emptyStringAsUndefined: true,
});
