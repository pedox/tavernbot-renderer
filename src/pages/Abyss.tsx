import { IAvatar } from "components/Avatar";
import Footer from "components/Footer";
import React from "react";
import { dateFormat } from "utils/date";
import { APP_URL } from "utils/template";

export const elementsColor = {
  pyro: "#d6642a",
  cryo: "#9ce3e4",
  hydro: "#09e4fe",
  anemo: "#74d5b0",
  geo: "#f1d15c",
  electro: "#dcb6ff",
  dendro: "#b1e929",
};

export type IAbyssAvatarSum = {
  id: string;
  value: number;
  name: string;
  avatar: string;
  level: number;
  rarity: number;
  cons: number;
};

export type IAbyssTeamPlace = {
  floor: number;
  chamber: number;
};

export type IAbyssTeam = {
  at: IAbyssTeamPlace;
  phase: number;
  teams: IAbyssAvatarSum[];
};

export type IAbyssBattle = {
  id?: number;
  level?: number;
  rarity?: number;
  empty?: boolean;
  avatar?: IAvatar;
};
export type IAbyssChamber = {
  chamber: number;
  star: number;
  max_star: number;
  battles: IAbyssBattle[][];
};

export type IAbyssFloor = {
  floor: number;
  star: number;
  max_star: number;
  chambers: IAbyssChamber[];
};

export type IAbyss = {
  userId: string;
  gameId: string;
  nickname: string;
  level: number;
  schedule_id: number;
  start_time: number;
  end_time: number;
  total_battle_times: number;
  total_win_times: number;
  max_floor: string;
  max_floor_int: number;
  most_damage: number;
  total_star: number;
  with_comps: boolean;
  last_battle?: number;
  damage_rank: IAbyssAvatarSum;
  defeat_rank: IAbyssAvatarSum;
  take_damage_rank: IAbyssAvatarSum;
  normal_skill_rank: IAbyssAvatarSum;
  energy_skill_rank: IAbyssAvatarSum;
  reveal_rank: IAbyssAvatarSum[];
  teams: IAbyssTeam[];
  floors: any;
  guilds: string[];
  region: string;
};

const AbyssPage: React.FC<IAbyss> = ({
  start_time,
  end_time,
  nickname,
  gameId,
  level,
  children,
}) => {
  return (
    <div className="w-[800px] min-h-[400px] bg-[#3d3066] bg-contain relative text-white font-genshin">
      <div
        className="h-full absolute top-0 bg-no-repeat bg-contain bg-top left-0 w-full"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/abyss.png)`,
        }}
      />
      <div className="bg-black absolute top-0 bottom-0 w-full bg-opacity-30" />

      <div className="p-6">
        <div className="min-h-[450px] relative flex flex-col mb-4">
          <div>
            <div className="text-lg">Spiral Abyss Challenge Summary</div>
            <div className="text-sm opacity-70 mt-1.5">
              {dateFormat(start_time)} - {dateFormat(end_time)}
            </div>
          </div>
          {children}
        </div>
        <div className="relative">
          <Footer nickname={nickname} gameId={gameId} level={level} />
        </div>
      </div>
    </div>
  );
};

export const AbyssStar = ({ className }) => {
  return (
    <img className={className} src={APP_URL + "/resources/ui/abyss-star.png"} />
  );
};

export default AbyssPage;
