import axios from "axios";
import { createWriteStream, existsSync, readFileSync, unlink } from "fs";
import path, { join } from "path";

const downloadImage = async ({ icon, target, baseUrl }) => {
  const imagePath = join(target, icon);
  if (existsSync(imagePath)) {
    return readFileSync(imagePath);
  }
  const writer = createWriteStream(imagePath);
  return await new Promise((resolve) => {
    axios({
      method: "get",
      url: `${baseUrl}/${icon}`,
      responseType: "stream",
    })
      .then((response) => {
        response.data.pipe(writer);
        writer.on("error", (err) => {
          console.log(`failed download ${icon} not found`);
          unlink(imagePath, (e) => console.log(e));
          resolve(err);
        });
        writer.on("close", () => {
          resolve(readFileSync(imagePath));
        });
      })
      .catch(() => {
        console.log(`failed download ${icon} not found`);
        unlink(imagePath, (e) => console.log(e));
        resolve(false);
      });
  });
};

export const downloadImageV2 = async ({ name, target, imageUrl }) => {
  const imagePath = path.resolve(join(target, name));
  if (existsSync(imagePath)) {
    console.log("Exists", name);
    return readFileSync(imagePath);
  }
  const writer = createWriteStream(imagePath);
  return await new Promise((resolve) => {
    console.log("Downloaded", name);

    axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    })
      .then((response) => {
        response.data.pipe(writer);
        writer.on("error", (err) => {
          console.log(`failed download ${name} not found`);
          unlink(imagePath, (e) => console.log(e));
          resolve(err);
        });
        writer.on("close", () => {
          resolve(readFileSync(imagePath));
        });
      })
      .catch(() => {
        console.log(`failed download ${name} not found`);
        unlink(imagePath, (e) => console.log(e));
        resolve(false);
      });
  });
};

export default downloadImage;
