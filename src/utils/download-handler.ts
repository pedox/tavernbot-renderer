import path from "path";
import downloadImage from "./download";

export const useDownloadHandler = async (req, res, next) => {
  try {
    let baseUrl = "https://upload-os-bbs.hoyolab.com/game_record/genshin";
    let target = null;
    const img = req.path.match(/\/([a-z_0-9@]+.png)/i);
    if (req.path.match(/\/avatars\/UI_AvatarIcon_Side/)) {
      console.log("download side image");
      baseUrl += "/character_side_icon";
      target = "./public/resources/avatars";
    } else if (req.path.match(/\/avatars\/UI_AvatarIcon_/)) {
      console.log("download side image");
      baseUrl += "/character_icon";
      target = "./public/resources/avatars";
    } else if (req.path.match(/\/avatars-showcase\/UI_AvatarIcon/)) {
      console.log("download showcase image");
      baseUrl += "/character_image";
      target = "./public/resources/avatars-showcase";
    } else if (req.path.match(/\/weapons\/UI_EquipIcon_/)) {
      console.log("download weapons image");
      baseUrl += "/equip";
      target = "./public/resources/weapons";
    } else if (req.path.match(/\/artifacts\/UI_RelicIcon_/)) {
      console.log("download artifacts image");
      baseUrl += "/equip";
      target = "./public/resources/artifacts";
    }

    if (target !== null && !!img) {
      const imageBuff = await downloadImage({
        icon: img[1],
        baseUrl,
        target: path.resolve(target),
      });
      if (!imageBuff) return next();
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": (imageBuff as any).length,
        "Cache-Control": "public, max-age=86400",
      });
      res.end(imageBuff);
    }
    return next();
  } catch (e) {
    console.error(e);
    next();
  }
};
