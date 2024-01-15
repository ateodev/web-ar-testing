import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";
import { TOptions } from "https://deno.land/x/static_files@1.1.6/src/types.ts";


const app = new Application();

const o = {} as TOptions;
o.index = 'index.html';
o.setHeaders = (headers, path, stats) => {
    [
    {
      endings: ['.gz'],
      name: 'Content-Encoding',
      value: 'gzip'
    },
    {
      endings: ['.br'],
      name: 'Content-Encoding',
      value: 'br'
    },
    {
      endings: ['.data','.data.gz','.data.br'],
      name: 'Content-Type',
      value: 'application/octet-stream'
    },
    {
      endings: ['.wasm','.wasm.gz','.wasm.br'],
      name: 'Content-Type',
      value: 'application/wasm'
    },
    {
      endings: ['.js','.js.gz','.js.br'],
      name: 'Content-Type',
      value: 'application/javascript'
    },
  ].forEach(header => {
    header.endings.forEach(ending => {
      if(path.endsWith(ending)){
        headers.set(header.name, header.value)
      }
    });
  });
}

app.use(staticFiles("public", o));

console.log(`Server running http://localhost:3000`)
await app.listen({ port: 3000 });
