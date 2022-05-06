import chalk from "chalk";
import { initPuppet } from "./puppeter";

export const useRenderHandler = async (outputHTML, req, res) => {
  const cluster = await initPuppet();
  const tt0 = performance.now();
  console.log(chalk.yellow("context:" + req.body?.kind), "make render queue");

  const out = await cluster.execute({
    html: outputHTML,
    dimen: {
      width: req?.body?.width || 300,
      height: req?.body?.height || 80,
    },
  });
  const tt1 = performance.now();
  console.log(
    chalk.yellow("context:" + req.body?.kind),
    chalk.gray("page closed"),
    chalk.greenBright(`${(tt1 - tt0).toFixed(2)}ms`)
  );

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": out.length,
  });
  res.end(out);
};
