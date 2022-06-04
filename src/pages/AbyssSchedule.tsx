import clsx from "clsx";
import Footer from "components/Footer";
import dayjs from "dayjs";
import React from "react";
import { APP_URL } from "utils/template";

type Monster = {
  id: string;
  level: number;
  name: string;
};

type Chamber = {
  levelIndex: number;
  monsterLevel: number;
  firstMonsterList: Monster[];
  secondMonsterList: Monster[];
};

type Floor = {
  floor: number;
  leyline: string;
  chambers: Chamber[];
};

type Props = {
  blessingTitle: string;
  blessingDescription: string;
  scheduleId: number;
  openTime: string;
  closeTime: string;
  period: string;
  endPeriod: string;
  floors: Floor[];
};

export const AbyssSchedule = ({
  blessingDescription,
  period,
  endPeriod,
  floors,
}: Props) => {
  return (
    <div className="bg-[#2d244c] w-[900px] relative p-6 text-white">
      <div
        className="bg-top bg-contain bg-no-repeat h-[560px] absolute top-0 left-0 w-full"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/abyss-2.png)`,
        }}
      />
      <div className="min-h-[500px] relative mb-6">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              src={`${APP_URL}/resources/ui/UI_Icon_Tower_1.png`}
              className="w-12"
            />
          </div>
          <div>
            <h1 className="text-lg">Spiral Abyss Enemies Composition</h1>
            <p className="opacity-60">
              {dayjs(period).format("DD MMMM YYYY")} -{" "}
              {dayjs(endPeriod).format("DD MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="text-xs mt-2 bg-black bg-opacity-30 p-2 rounded-md border border-white border-opacity-10 -mb-1">
          {blessingDescription}
        </div>

        {floors.map((item, index) => (
          <RenderFloor {...item} key={index} />
        ))}
      </div>
      <Footer withInfo={false} />
    </div>
  );
};

const RenderFloor = ({ floor, chambers, leyline }: Floor) => {
  return (
    <div className="bg-black bg-opacity-25 mt-3 flex rounded-xl">
      <div className="w-[275px] p-1">
        <div className="flex items-center">
          <div
            className="bg-contain w-12 h-12 flex items-center justify-center text-bblue-800"
            style={{
              backgroundImage: `url(${APP_URL}/resources/ui/abyss-floor.png)`,
            }}
          >
            {floor}
          </div>
          <div className="flex-1">Floor {floor}</div>
        </div>
        <div className="text-xs mt-2 mx-3 pt-3 pb-3 border-t border-white border-opacity-20">
          {leyline}
        </div>
      </div>
      <div className="flex-1">
        {chambers.map((item, index) => (
          <RenderChamber {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

const RenderChamber = ({
  levelIndex,
  firstMonsterList,
  secondMonsterList,
}: Chamber) => {
  return (
    <div className="mb- flex">
      <div className="w-7 bg-black my-1 flex pt-7 justify-center rounded-l-md bg-opacity-30">
        <div className="text-white text-sm px-1">{levelIndex}</div>
      </div>
      <RenderMonster monsters={firstMonsterList} />
      <RenderMonster monsters={secondMonsterList} right />
    </div>
  );
};

const RenderMonster = ({
  monsters,
  right,
}: {
  monsters: Monster[];
  right?: boolean;
}) => {
  return (
    <div className="p-1 flex-1">
      <div className="bg-black bg-opacity-25 h-full rounded-lg border border-white border-opacity-10">
        <div
          className={clsx("flex flex-wrap items-start p-1", {
            "justify-end": right,
          })}
        >
          {monsters.map((item, index) => (
            <div key={index} className="p-1">
              <div className="w-14 h-14 bg-gray-500 overflow-hidden rounded relative">
                <img
                  src={`${APP_URL}/resources/enemies/${item.id}.png`}
                  className="max-w-full max-h-full"
                />
                <div className="absolute bg-black bg-opacity-75 bottom-0 left-0 w-full text-center text-sm">
                  {/* Lv{item.level} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
