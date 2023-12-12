import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

console.log(`Server running http://localhost:3000`)
await app.listen({ port: 3000 });