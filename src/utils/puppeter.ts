const exePath = process.env.BROWSER_BIN || "/usr/bin/google-chrome";
import chalk from "chalk";
import { Cluster } from "puppeteer-cluster";
import puppeteer from "puppeteer-core";
import { baseTemplate } from "./template";

type IGlobalPuppet = {
  cluster: Cluster<any, any>;
};

const globalPuppet: IGlobalPuppet = { cluster: null };

const options = {
  args: [
    "--ignore-certificate-errors",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-accelerated-2d-canvas",
    "--disable-gpu",
    "--disable-web-security",
  ],
  executablePath: exePath,
  headless: true,
} as any;

export const initPuppet = async () => {
  if (globalPuppet.cluster === null) {
    console.log(chalk.bgBlue("Initialize Puppeter"));
    globalPuppet.cluster = await Cluster.launch({
      puppeteerOptions: options,
      puppeteer,
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 3,
      timeout: 10000,
      retryLimit: 1,
      // monitor: true,
    });
    await globalPuppet.cluster.task(
      async ({
        page,
        data: {
          html,
          dimen: { width = 900, height = 600 },
        },
      }) => {
        await page.setViewport({ width, height });
        await page.setContent(baseTemplate(html));
        const screen = await page.screenshot({ type: "png", fullPage: true });
        return screen;
      }
    );
    console.log(chalk.bgBlue("Puppeter has been Initialized"));
  }
  return globalPuppet.cluster;
};
