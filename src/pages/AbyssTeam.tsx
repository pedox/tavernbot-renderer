import clsx from "clsx";
import { IAvatar } from "components/Avatar";
import { getRarityClassName } from "components/Items";
import React, { Fragment } from "react";
import { timeFormat } from "utils/date";
import { APP_URL } from "utils/template";
import AbyssPage, {
  AbyssStar,
  elementsColor,
  IAbyss,
  IAbyssBattle,
  IAbyssFloor,
} from "./Abyss";
import { SummaryItem } from "./AbyssSummary";

type Props = {
  abyss: IAbyss;
  floors: number[];
  avatars: IAvatar[];
  timezone: string;
  tzCode: string;
  serverTzCode: string;
  server: string;
  gameId: string;
  nickname: string;
  level: number;
};

const AbyssTeam = ({
  abyss,
  avatars,
  floors = [],
  timezone,
  tzCode,
  server,
  serverTzCode,
  gameId,
  nickname,
  level,
}: Props) => {
  let finalFloors = (abyss ? [...abyss.floors] : []).filter((item) =>
    floors.length > 0 ? floors.indexOf(item.floor) > -1 : true
  );

  if (finalFloors.length === 0 && floors.length > 0) {
    finalFloors = abyss ? [...abyss.floors] : [];
  }

  finalFloors
    .reverse()
    .map((item) => {
      item.chambers = item.chambers.map((item) => {
        item.battles = item.battles.map((item) => {
          item = item.map((item) => {
            const avatar = avatars.find((itm) => itm.id === item.id);
            return { ...item, avatar };
          });
          return item;
        });
        return item;
      });
      return item;
    })
    .slice(0, 4);

  return (
    <AbyssPage
      {...abyss}
      server={server}
      serverTzCode={serverTzCode}
      gameId={gameId}
      nickname={nickname}
      level={level}
    >
      <div className="mt-1">
        <div className="absolute top-0 right-0 w-[250px]">
          <SummaryItem>
            <div className="flex-1">Battles Fought</div>
            <div>{abyss.total_battle_times}</div>
          </SummaryItem>
          <SummaryItem>
            <div className="flex-1">Abyss Star Collected</div>
            <div>{abyss.total_star}</div>
          </SummaryItem>
        </div>

        {finalFloors.map((item, index) => (
          <RenderFloor {...item} key={index} />
        ))}

        {abyss?.last_battle && abyss.last_battle > 0 ? (
          <div className="text-xs mt-1">
            Last battle {timeFormat(abyss.last_battle, tzCode)} {timezone}
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    </AbyssPage>
  );
};

const RenderFloor = ({ star, floor, max_star, chambers }: IAbyssFloor) => {
  return (
    <div className="px-4 pt-4 -mx-1 relative">
      <div className="flex items-center mb-4">
        <div
          className="h-14 w-14 bg-no-repeat bg-contain flex justify-center items-center text-gray-800 text-xl"
          style={{
            backgroundImage: `url(${APP_URL}/resources/ui/abyss-floor.png)`,
          }}
        >
          {floor}
        </div>
        <span className="flex-1 text-center bg-black bg-opacity-40 py-1 ml-3 rounded-full">
          Floor {floor}
        </span>
        <div className="flex items-center">
          <AbyssStar
            className={clsx("ml-4 w-4 h-4", {
              "opacity-50": star !== max_star,
            })}
          />
          <span className="ml-2">
            {star} / {max_star}
          </span>
        </div>
      </div>

      <div>
        {chambers.map((item, index) => (
          <div
            className="flex mb-4 items-center relative"
            key={`level-${index}`}
          >
            <div className="absolute left-0 -ml-4 -mt-3 flex justify-end text-right">
              <span className="text-sm bg-cream-100 text-black px-1 rounded-sm">
                {index + 1}
              </span>
            </div>

            {item.battles.map((battle, index) => {
              const battles = [...battle];

              if (battles.length < 4) {
                for (let i = 4 - battles.length; i > 0; i--) {
                  if (index === 1) {
                    battles.unshift({ empty: true });
                  } else {
                    battles.push({ empty: true });
                  }
                }
              }

              return (
                <div
                  className={clsx("flex flex-1", {
                    "order-3 justify-end": index === 1,
                    "justify-start": index !== 1,
                  })}
                  key={`batt-${index}`}
                >
                  {battles.map((item, index) => {
                    return (
                      <RenderAvatar item={item} battles={battles} key={index} />
                    );
                  })}
                </div>
              );
            })}
            <div
              className={clsx("flex items-ceter justify-center h-full w-2/12")}
            >
              {[...new Array(3)].map((_, star) => (
                <AbyssStar
                  key={`star-${star}`}
                  className={clsx("w-6 h-6", {
                    "opacity-25": star >= item.star,
                  })}
                />
              ))}
            </div>
            {item.battles.length === 1 && <div className="flex-1" />}
          </div>
        ))}
      </div>
    </div>
  );
};

type IRenderAvatar = {
  item: IAbyssBattle;
  battles: IAbyssBattle[];
};

const RenderAvatar = ({ item, battles }: IRenderAvatar) => {
  if (item.empty) {
    return (
      <div className="mx-1 relative rounded-md overflow-hidden border-transparent w-[68px] bg-black bg-opacity-20 border border-white border-opacity-10" />
    );
  }

  const resonance =
    battles.filter((itm) => {
      return itm.avatar?.element === item.avatar?.element;
    }).length > 1;

  return (
    <div
      className="mx-1 relative rounded-md overflow-hidden border-transparent"
      style={{
        backgroundColor: "#f0f1f5",
        boxShadow: resonance
          ? `0px -4px 0px 0px ${
              elementsColor[item.avatar?.element?.toLowerCase() || -1]
            }`
          : "",
      }}
    >
      <div className="w-[68px] bg-black rounded-br-xl overflow-hidden">
        <div
          className={clsx(
            "bg-opacity-50 relative",
            getRarityClassName(item.rarity)
          )}
        >
          <img src={APP_URL + "/resources/avatars/" + item?.avatar?.icon} />
          <img
            src={
              APP_URL +
              "/resources/ui/element_" +
              item?.avatar?.element.toLowerCase() +
              ".png"
            }
            style={{ margin: "0.1em" }}
            className="w-6 absolute top-0 left-0"
          />
        </div>
      </div>
      <span
        style={{
          marginTop: 2,
          marginRight: 2,
        }}
        className="bg-black px-1 text-xs rounded-md absolute top-0 right-0"
      >
        C{item.avatar?.actived_constellation_num}
      </span>
      <div className="rounded-b-md px-1 text-sm text-gray-800 text-center">
        Lv. {item.level}
      </div>
    </div>
  );
};

export default AbyssTeam;
