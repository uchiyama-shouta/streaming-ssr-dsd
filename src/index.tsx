import { Hono } from "hono";
import { stream } from "hono/streaming";
import { renderToReadableStream } from "hono/jsx/streaming";

const app = new Hono();

const Html = () => {
  return (
    <html lang="ja">
      <body>
        <template shadowrootmode="open">
          <slot name="component1">
            <p>Loading...</p>
          </slot>
        </template>
      </body>
    </html>
  );
};

const Component1 = async () => {
  await sleep(2000);
  return (
    <div slot="component1">
      <p>
        <b>Hello World!!</b>
      </p>
    </div>
  );
};

app.get("/", (c) => {
  return stream(c, async (stream) => {
    await stream.pipe(renderToReadableStream(<Html />));
    await stream.pipe(renderToReadableStream(<Component1 />));
  });
});

async function sleep(seconds: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, seconds)
  );
}

export default app;
