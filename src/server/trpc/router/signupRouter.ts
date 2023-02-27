import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from 'bcryptjs';

export const signupRouter = router({
  signupForm: publicProcedure
    .input(z.object({ name: z.string(), password: z.string(), newsletter: z.boolean() }))
    .mutation( async ({ input, ctx }) => {
        const users = await ctx.prisma.user.create({
          data: {
            ...input, 
          }
        })
        return users;
    }),
    signin: publicProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { name: input.name },
      });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isMatch = await bcrypt.compare(input.password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      return user;
    }),
  getUsers: publicProcedure
    .query(async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany({
        select: {
          name: true,
        },
      });
      return users.map((user) => user.name);
    }),
    getPokemonData: publicProcedure
    .input(z.object({ pokemon: z.string() }))
    .query(async ({ input }) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${input.pokemon}`;
      const response = await fetch(url);
      const data = await response.json();
      const sprites = data.sprites.front_default;
      return sprites;
    })
});