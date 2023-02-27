import { router } from "../trpc";
import { authRouter } from "./auth";
import { buildsRouter } from "./buildsRouter";
import { exampleRouter } from "./example";
import { signupRouter } from "./signupRouter";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  builds: buildsRouter,
  signup: signupRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
