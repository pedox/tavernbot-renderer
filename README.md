# 🍻TavernBot Renderer Server

Tavernbot image renderer server, Templating using ReactDOM and styling using Tailwindcss

## Installation

install package modules using your favorite tools, (npm, yarn, pnpm) (I Personally using pnpm)

```
pnpm install
```

Place resources file into `public/resources` folder Resources files including some of Genshin Impact Assets that cannot be diclose on this repository.

Folder structure might be like this

```
|-public
| |-resources
| | |-artifacts
| | | |-...
| | | |-UI_RelicIcon_xxxx_x.png
| | | |-...
| | |-avatars
| | | |-...
| | | |-UI_AvatarIcon_xxx.png
| | | |-...
| | |-avatars-showcase
| | | |-...
| | | |-UI_AvatarIcon_xxx@2x.png
| | | |-...
| | |-items
| | | |-...
| | |-monsters
| | | |-...
| | | |-...
| | | |-...
| | |-ui
| | | |-...
| | | |-UI_Something_here.png
| | | |-...
| | |-weapons
| | | |-...
| | | |-UI_EquipIcon_xxx_xxx.png
| | | |-...
```

## Development

Using this default command to start development mode.

```
# Watch and rebuild script changes
pnpm watch

# Watch and restart the target script (in this case dist/index.js)
pnpm nw dist/index.js

# Watch css changes
pnpm css-watch
```

## Building

Using this command to build completed scripts

```
# Build the scripts to dist folder
pnpm build

# Compiled Tailwindcss stylsheet to public/css folder
pnpm css-build
```

## The API

_Has no documentation yet..._
