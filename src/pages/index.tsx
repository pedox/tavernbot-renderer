import DailyFarm from "components/DailyFarm";
import React from "react";
import ReactDOM from "react-dom/server";
import AbyssLeaderboard from "./AbyssLeaderboard";
import { AbyssSchedule } from "./AbyssSchedule";
import AbyssSummary from "./AbyssSummary";
import AbyssTeam from "./AbyssTeam";
import AvatarLists from "./AvatarLists";
import AvatarMultiple from "./AvatarMultiple";
import AvatarSingle from "./AvatarSingle";
import CharacterExp from "./CharacterExp";
import CharacterTalent from "./CharacterTalent";
import Expedition from "./Expedition";
import Weapon from "./Weapon";
import Wish from "./Wish";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const renderRouter = (req, res) => {
  let outputHTML = `<h1 class='text-white p-10 text-center'>No Renderer Found</h1>`;

  switch (req.body.kind) {
    case "AVATAR_LISTS":
      outputHTML = ReactDOM.renderToString(<AvatarLists {...req.body.data} />);
      break;
    case "AVATAR_SINGLE":
      outputHTML = ReactDOM.renderToString(<AvatarSingle {...req.body.data} />);
      break;
    case "AVATAR_MULTIPLE":
      outputHTML = ReactDOM.renderToString(
        <AvatarMultiple {...req.body.data} />
      );
      break;
    case "ABYSS_SUMMARY":
      outputHTML = ReactDOM.renderToString(<AbyssSummary {...req.body.data} />);
      break;
    case "ABYSS_TEAM":
      outputHTML = ReactDOM.renderToString(<AbyssTeam {...req.body.data} />);
      break;
    case "ABYSS_LEADERBOARD":
      outputHTML = ReactDOM.renderToString(
        <AbyssLeaderboard {...req.body.data} />
      );
      break;
    case "WISH":
      outputHTML = ReactDOM.renderToString(<Wish {...req.body.data} />);
      break;
    case "CHARACTER_EXP":
      outputHTML = ReactDOM.renderToString(<CharacterExp {...req.body.data} />);
      break;
    case "CHARACTER_TALENT":
      outputHTML = ReactDOM.renderToString(
        <CharacterTalent {...req.body.data} />
      );
      break;
    case "WEAPON":
      outputHTML = ReactDOM.renderToString(<Weapon {...req.body.data} />);
      break;

    case "EXPEDITION":
      outputHTML = ReactDOM.renderToString(<Expedition {...req.body.data} />);
      break;
    case "DAILY":
      outputHTML = ReactDOM.renderToString(<DailyFarm {...req.body.data} />);
      break;
    case "ABYSS_SCHEDULE":
      outputHTML = ReactDOM.renderToString(
        <AbyssSchedule {...req.body.data} />
      );
      break;
  }

  return outputHTML;
};
