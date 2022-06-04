import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import { renderRouter } from "pages/index";
import path from "path";
import { useDownloadHandler } from "utils/download-handler";
import { useRenderHandler } from "utils/render-handler";
import { APP_PORT, baseTemplate } from "utils/template";
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  return res.json({ version: "0.0.1" });
});

const assetPath = path.resolve("./public");
console.log("serve asset path", assetPath);
app.use(express.static(assetPath));

app.get("/render", (req, res) => {
  return res.json({ msg: "pong" });
});

app.post("/render", async (req, res) => {
  const isRaw = req.query.raw === "1";
  try {
    const outputHTML = renderRouter(req, res);
    if (isRaw) {
      return res.send(baseTemplate(outputHTML));
    }
    useRenderHandler(outputHTML, req, res);
  } catch (e) {
    console.error(e);
    res.status(500).end("internal server error " + e);
  }
});

app.use(useDownloadHandler);

app.listen(APP_PORT, () => {
  console.log("App listen at http://localhost:" + APP_PORT);
});
