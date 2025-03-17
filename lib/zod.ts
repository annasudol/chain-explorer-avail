import { z } from "zod";

export const STRING_NOT_EMPTY = z.string().min(1);
