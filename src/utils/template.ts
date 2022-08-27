export const APP_PORT = process.env.APP_PORT || 3003;
export const APP_URL =
  process.env.SERVER_RENDER || `http://localhost:${APP_PORT}`;

const dev = false;

export const baseStyles = (baseUrl) => `
@font-face {
  font-family: "Genshin";
  src: url("${baseUrl}/resources/ui/Genshin_Impact_Font.font-woff") format("truetype");
  font-style: normal;
  font-weight: normal;
}
body {
  font-family: "Genshin";
  margin: 0;
  padding: 0;
}

.attribute {
  background-image: url("${baseUrl}/resources/ui/attributes.webp");
}

.char-content {
  position: relative;
  width: 600px;
  min-height: 550px;
  position: relative;
  overflow: hidden;
}
.char-content:before {
  width: 600px;
  content: "";
  position: absolute;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  background: url("${baseUrl}/resources/ui/attributes.webp");
  background-position-x: 0%;
  background-position-y: 0%;
  background-size: auto;
  background-size: cover;
  background-position: center;
  filter: saturate(0%);
}

.main {
  width: 850px;
  min-height: 550px;
  position: relative;
  overflow: hidden;
}
.element:before {
  content: "";
  position: absolute;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  background: url("${baseUrl}/resources/ui/attributes.webp");
  background-size: cover;
  background-position: center;
  filter: saturate(0%);
}

.element.Anemo:before {
  filter: hue-rotate(-20deg) saturate(100%);
}
.element.Geo:before {
  filter: hue-rotate(-153deg) saturate(120%);
}
.element.Electro:before {
  filter: hue-rotate(60deg) saturate(150%) brightness(85%);
}
.element.Pyro:before {
  filter: hue-rotate(168deg) saturate(150%);
}
.element.Hydro:before {
  filter: hue-rotate(32deg) saturate(160%);
}
.element.Cryo:before {
  filter: hue-rotate(0deg) saturate(100%);
}
.element.Dendro:before {
  filter: hue-rotate(-60deg) saturate(100%);
}
`;

const minify = (str) => {
  return str.replace(/(\n+|\s{2,})/gi, "");
};

const rawTemplate = ({ baseUrl, body }) => `
<html><head><link rel="stylesheet" href="${
  baseUrl + (dev ? "/tailwind.min.css" : "/css/global.css")
}" /><style>${minify(
  baseStyles(baseUrl)
)}</style></head><body class='bg-black'>${body}</body></html>
`;

export const baseTemplate = (template) => {
  const baseUrl = APP_URL;
  const result = rawTemplate({ baseUrl, body: template });
  return result;
};
