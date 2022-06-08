import clsx from "clsx";
import React, { Fragment } from "react";
import { APP_URL } from "utils/template";

export type FarmItem = {
  id: string;
  name: string;
  imageUrl: string;
  rarity: number;
};

export type Domain = {
  name: string;
  kind: string;
  region: string;
  day: string[];
  isToday: boolean;
  farms: FarmItem[];
};

type Props = {
  domains: Domain[];
};

const DailyDomains = ({ domains }: Props) => {
  return domains && domains.length > 0 ? (
    <div className="items-center mt-4 border-t border-white border-opacity-20 pt-2">
      <h2 className="mb-2 text-center">Daily Domain</h2>
      <div className="flex flex-wrap -m-2">
        {domains.map((item, index) => (
          <div className="w-full p-2" key={index}>
            <div
              className={clsx(
                "flex items-center w-full bg-black bg-opacity-25 rounded-md p-2",
                {
                  "opacity-50": !item.isToday,
                }
              )}
            >
              <img
                src={APP_URL + "/resources/ui/domain.png"}
                className="w-6 mr-2"
              />
              <div className="flex-1">
                <h2>
                  {item.name}{" "}
                  {item.isToday ? (
                    <span className="text-xs bg-red-500 text-white rounded px-1 ml-1">
                      Farm Today
                    </span>
                  ) : (
                    item.day.map((day, index) => (
                      <span
                        key={index}
                        className="text-xs mr-1 bg-gray-500 text-white rounded px-1 ml-1"
                      >
                        {day}
                      </span>
                    ))
                  )}
                </h2>
                <span className="opacity-70 text-xs">{item.region}</span>
              </div>
              <div className="flex justify-end">
                {item.farms.map((item, index) => (
                  <div className="w-9 h-9 flex items-center ml-1" key={index}>
                    <img
                      src={APP_URL + `/resources/items/${item.id}.png`}
                      className="max-w-full max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Fragment />
  );
};

export default DailyDomains;
