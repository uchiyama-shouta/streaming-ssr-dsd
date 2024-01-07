import { Hono } from "hono";
import { stream } from "hono/streaming";

const app = new Hono();

app.get("/", (c) => {
  return stream(c, async (stream) => {
    await stream.write(`
      <html lang="ja">
        <body>
          <template shadowrootmode="open">
            <slot name="component1">
              <p>Loading...</p>
            </slot>
          </template>
    `);

    await sleep(2000);

    await stream.write(`
          <div slot="component1">
            <p>
              <b>Hello World!!</b>
            </p>
          </div>
        </body>
      </html>
    `);
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
