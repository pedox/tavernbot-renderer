import clsx from "clsx";
import React from "react";
import { APP_URL } from "utils/template";
import Footer from "./Footer";
import { GIGlobalFrame } from "./Frame";
import { getRarityClassName } from "./Items";

type Material = {
  items: Item[];
  farms: Farm[];
};

type Item = {
  id?: string;
  name?: string;
  slug?: string;
  upcoming?: boolean;
  rarity?: number;
};

type Farm = {
  id: string;
  name: string;
  imageUrl: string;
  rarity: number;
};

type Domain = {
  name: string;
  kind: string;
  region: string;
  materials: Material[];
};

type Props = {
  day: string;
  domains: Domain[];
};

const hidden = [
  "w_1406",
  "w_2406",
  "w_2407",
  "w_3204",
  "w_3404",
  "w_4403",
  "w_4405",
  "w_4406",
  "w_5405",
];

const compatName = (name: string) => {
  return name.replace(/^Philosophies of /g, "");
};

const MaterialComponent = ({ farms, items }: Material) => {
  return (
    <div className="flex-1 p-1">
      <div className="flex items-center flex-1 mb-2 border-b border-white border-opacity-25 pb-1">
        <div className="flex">
          {farms.map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "text-sm w-8 h-8 flex items-center justify-center",
                  {
                    "-ml-6": index > 0,
                  }
                )}
                style={{
                  opacity: (index + 1) / 3,
                  zIndex: index + 1,
                }}
              >
                <img
                  src={`${APP_URL}/resources/items/${item.id}.png`}
                  className="max-w-full max-h-full"
                />
              </div>
            );
          })}
        </div>
        <div className="text-xs flex-1 pl-2">{compatName(farms[2].name)}</div>
      </div>

      <div className="w-full">
        <div className="flex flex-wrap flex-1 w-full -m-0.5">
          {items
            // .filter((m) => m.upcoming == false)
            .filter((m) => hidden.indexOf(m.id) === -1)
            .filter((m) => !/^traveler_/.test(m.slug))
            .sort((a, b) => b.rarity - a.rarity)
            .map((item, index) => {
              return (
                <div className="p-0.5" key={index}>
                  <div
                    className={clsx(
                      "text-sm w-[50px] h-[50px] flex items-center justify-center rounded-md overflow-hidden",
                      getRarityClassName(item.rarity)
                    )}
                  >
                    <img
                      src={
                        item.id
                          ? `${APP_URL}/resources/items/${item.id}.png`
                          : `${APP_URL}/resources/items/${item.slug}_face.png`
                      }
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const DomainComponent = ({ name, region, materials }: Domain) => {
  return (
    <div className="mb-2 bg-black bg-opacity-20 p-2 rounded-md">
      <div className="mb-1 flex items-center p-0.5">
        <img src={APP_URL + "/resources/ui/domain.png"} className="w-5 mr-1" />
        <h2 className="flex-1">{name}</h2>
        <span className="opacity-70 text-xs">{region}</span>
      </div>
      <div>
        <div className="flex bg-black bg-opacity-20 rounded-md p-1">
          {materials.map((item, index) => {
            return <MaterialComponent key={index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

const DailyFarm = ({ day, domains }: Props) => {
  return (
    <GIGlobalFrame width={970}>
      <div className="min-h-[500px] mb-6">
        <div className="mb-4 flex items-center">
          <div className="mr-2">
            <img
              src={`${APP_URL}/resources/ui/UI_NPCTopIcon_Adventurers.png`}
              className="w-14"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl">Daily Material</h1>
            <p>{day}</p>
          </div>
        </div>
        {domains.map((item, index) => (
          <DomainComponent key={index} {...item} />
        ))}
      </div>

      <Footer withInfo={false} />
    </GIGlobalFrame>
  );
};

export default DailyFarm;
