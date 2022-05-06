import clsx from "clsx";
import React from "react";
import { APP_URL } from "utils/template";

export type IAvatarCostumes = {
  id: number;
  name: string;
  icon: string;
};

export type IAvatarWeapon = {
  id: number;
  name: string;
  icon: string;
  type: number;
  rarity: number;
  level: number;
  promote_level: number;
  type_name: string;
  desc: string;
  affix_level: number;
};

export type IReliquariesAffix = {
  activation_number: number;
  effect: string;
};

export type IAvatarReliquariesSets = {
  id: number;
  name: string;
  affixes?: IReliquariesAffix[];
};

export type IAvatarReliquaries = {
  id: number;
  name: string;
  icon: string;
  pos: number;
  rarity: number;
  level: number;
  pos_name?: string;
  set: IAvatarReliquariesSets;
};

export type IAvatar = {
  id: string;
  icon: string;
  image?: string;
  name: string;
  element?: string;
  fetter: number;
  level: number;
  rarity: number;
  alias?: string;
  actived_constellation_num: number;
  weapon?: IAvatarWeapon;
  costumes?: IAvatarCostumes[];
  reliquaries: IAvatarReliquaries[];
  card_image?: string;
  is_chosen?: boolean;
};
const Avatar = ({
  name,
  alias,
  icon,
  rarity,
  element,
  actived_constellation_num = null,
  level,
  fetter = null,
}: IAvatar) => {
  return (
    <div className="bg-cream-300 w-[100px] rounded-lg overflow-hidden">
      <div
        className={clsx(
          "bg-gradient-to-br rounded-br-3xl overflow-hidden relative",
          {
            "from-rarity4-100 to-rarity4-900": rarity === 4,
            "from-rarity5-100 to-rarity5-900": rarity === 5,
            "from-red-800 to-red-500": rarity > 5,
          }
        )}
      >
        <img
          src={`${APP_URL}/resources/ui/element_${
            element?.toLowerCase() || "dendro"
          }.png`}
          className="absolute left-1 top-1 w-7"
        />
        {actived_constellation_num !== null && (
          <div className="bg-black absolute top-1 right-1 text-sm px-1 rounded-md">
            C{actived_constellation_num}
          </div>
        )}

        <div className="bg-black absolute bottom-1 left-1 text-xs px-1 rounded-md">
          Lv. {level || 90}
        </div>

        {fetter !== null && (
          <div className="bg-black absolute bottom-1 right-1 text-xs px-1 rounded-md flex">
            <img
              src={APP_URL + "/resources/ui/exp.png"}
              className="w-4 mr-0.5"
            />
            {fetter}
          </div>
        )}

        <div
          className="h-[100px] bg-contain bg-center"
          style={{
            backgroundImage: `url(${APP_URL}/resources/avatars/${icon})`,
          }}
        />
      </div>
      <div className="text-gray-800 text-center truncate px-1.5">
        {alias || name}
      </div>
    </div>
  );
};

export default Avatar;
