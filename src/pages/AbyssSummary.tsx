import clsx from "clsx";
import { IAvatar } from "components/Avatar";
import ExclamationIcon from "components/icons/Exclamation";
import { getRarityClassName } from "components/Items";
import React, { Fragment } from "react";
import { timeFormat } from "utils/date";
import { APP_URL } from "utils/template";
import AbyssPage, { AbyssStar, IAbyss, IAbyssAvatarSum } from "./Abyss";

type Props = {
  abyss: IAbyss;
  avatars: IAvatar[];
  gameId: string;
  nickname: string;
  level: number;
  timezone: string;
  notFound?: boolean;
};

const AbyssSummary = ({ abyss, notFound }: Props) => {
  return (
    <AbyssPage {...abyss}>
      {!abyss.with_comps && (
        <div className="bg-black p-2 mt-2 rounded-md bg-opacity-40 flex items-center">
          <ExclamationIcon className="text-yellow-500 w-5" />{" "}
          <p className="text-xs ml-2">
            You're using Registration v1, using registration v2 for full
            detailed spiral abyss team comp.
          </p>
        </div>
      )}

      {notFound && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl">Spiral Abyss data found</h1>
          <p className="text-center text-sm mt-2 opacity-60">
            Please check again later
          </p>
        </div>
      )}

      <div className="flex mt-4">
        <div className="w-5/12">
          <h2 className="mb-4">Summary</h2>
          <SummaryItem>
            <div className="flex-1">Deepest Descent</div>
            <div>{abyss.max_floor}</div>
          </SummaryItem>
          <SummaryItem>
            <div className="flex-1">Battles Fought</div>
            <div>{abyss.total_battle_times}</div>
          </SummaryItem>
          <SummaryItem>
            <div className="flex-1">Abyss Star Collected</div>
            <div>{abyss.total_star}</div>
          </SummaryItem>

          <div className="text-xs mt-3">
            {abyss.defeat_rank?.value && (
              <SummaryComponent item={abyss.defeat_rank} label="Most Defeats" />
            )}
            {abyss.damage_rank?.value && (
              <SummaryComponent
                item={abyss.damage_rank}
                label="Strongest Single Strike"
              />
            )}
            {abyss.take_damage_rank?.value && (
              <SummaryComponent
                item={abyss.take_damage_rank}
                label="Most Damage Taken"
              />
            )}
            {abyss.normal_skill_rank?.value && (
              <SummaryComponent
                item={abyss.normal_skill_rank}
                label="Elemental Skills Cast"
              />
            )}
            {abyss.energy_skill_rank?.value && (
              <SummaryComponent
                item={abyss.energy_skill_rank}
                label="Elemental Bursts"
              />
            )}
          </div>
        </div>
        <div className="w-7/12 pl-6">
          <h2 className="mb-4">Most Playable Characters</h2>
          <div className="flex flex-wrap -mx-2">
            {abyss.reveal_rank.slice(0, 4).map((item) => {
              return <Avatar {...item} key={item.id} />;
            })}

            {abyss.reveal_rank.length === 0 && (
              <div className="p-3 text-xs bg-black bg-opacity-50 rounded-md w-full">
                Clear Abyssal Moon Spire for get more information
              </div>
            )}
          </div>
          <h2 className="mb-4 mt-4">Abyss Spiral Floors</h2>
          <div className="text-xs">
            {abyss.floors
              .reverse()
              .slice(0, 4)
              .map((item, index) => (
                <div
                  className="mb-2 bg-black bg-opacity-40 text-sm p-2 flex items-center rounded-md"
                  key={index}
                >
                  <div>
                    <div
                      className="h-10 w-10 bg-no-repeat bg-contain flex justify-center items-center text-gray-800 -my-2 -ml-2"
                      style={{
                        backgroundImage: `url(${APP_URL}/resources/ui/abyss-floor.png)`,
                      }}
                    >
                      {item.floor}
                    </div>
                  </div>
                  <div className="flex-1 text-center text-xs">
                    Floor {item.floor}
                  </div>
                  <div className="pl-2 flex justify-end items-center">
                    <AbyssStar
                      className={clsx("w-4 h-4 mr-2", {
                        "opacity-40": item.star < item.max_star,
                      })}
                    />{" "}
                    <span>
                      {item.star}/{item.max_star}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {abyss?.last_battle && abyss.last_battle > 0 ? (
        <div className="text-xs mt-1">
          Last battle {timeFormat(abyss.last_battle)}
        </div>
      ) : (
        <Fragment />
      )}
    </AbyssPage>
  );
};

const SummaryComponent = ({ item, label }) => {
  return (
    <div className="flex items-center mb-2 bg-black rounded-md bg-opacity-50 pt-1 pb-2 pr-4">
      <div className="w-10">
        <div className="w-10 h-10">
          <img
            src={APP_URL + "/images/avatars/" + item.avatar}
            className="-mt-2"
          />
        </div>
      </div>
      <div className="flex-1 pl-2 pt-1">{label}</div>
      <div className="pt-1 w-16 text-right">
        {new Intl.NumberFormat("id-ID").format(item.value)}
      </div>
    </div>
  );
};

const Avatar = ({ rarity, avatar, cons, value }: IAbyssAvatarSum) => {
  return (
    <div className="mx-2 relative rounded-md overflow-hidden bg-cream-500">
      <div className={clsx("w-20 bg-black rounded-br-xl overflow-hidden")}>
        <div className={clsx("bg-opacity-50", getRarityClassName(rarity))}>
          <img src={APP_URL + "/resources/avatars/" + avatar} />
        </div>
      </div>
      <span
        style={{
          marginTop: 2,
          marginRight: 2,
          opacity: cons !== null ? 1 : 0,
        }}
        className="bg-black text-xs px-1 rounded-md absolute top-0 right-0"
      >
        C{cons > -1 ? cons : "??"}
      </span>
      <div className="rounded-b-md text-sm px-1 text-gray-800 text-center">
        {value}
      </div>
    </div>
  );
};

export const SummaryItem: any = ({ children }) => {
  return (
    <div className="text-xs mb-2 flex pr-3 border-b border-white border-opacity-30 pb-2">
      {children}
    </div>
  );
};

export default AbyssSummary;
