import clsx from "clsx";
import React, { Fragment } from "react";
import { APP_URL } from "utils/template";
import { IAvatarReliquaries } from "./Avatar";
import { getRarityClassName } from "./Items";
import Rarity from "./Rarity";

type Props = {
  artifacts: IAvatarReliquaries[];
};

const ArtifactLists = ({ artifacts }: Props) => {
  return (
    <div>
      {[...new Array(5)].map((_, index) => {
        const artifact = artifacts.find((itm) => itm.pos === index + 1);

        return (
          <div key={index} className="text-sm flex items-center mb-3">
            <div className="">
              <div
                className={clsx(
                  "w-14 h-14 bg-black bg-opacity-30 rounded-md relative",
                  getRarityClassName(artifact?.rarity)
                )}
              >
                {artifact && (
                  <img
                    src={APP_URL + "/resources/artifacts/" + artifact.icon}
                  />
                )}
                <div className="absolute w-full flex justify-center -mt-2">
                  <Rarity rarity={artifact ? artifact.rarity : 0} />
                </div>
              </div>
            </div>
            <div className="pl-3 w-9/12 flex flex-col">
              <h3 className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {artifact ? (
                  artifact.name
                ) : (
                  <Fragment>
                    {index === 0 && "Flower of Life"}
                    {index === 1 && "Plume of Death"}
                    {index === 2 && "Sands of Eon"}
                    {index === 3 && "Goblet of Eonothem"}
                    {index === 4 && "Circlet of Logos"}
                  </Fragment>
                )}
              </h3>
              <p className="text-xs mt-1">
                <span className="text-xs bg-black bg-opacity-50 rounded px-1">
                  {artifact ? `Lv. ${artifact.level}` : "N/A"}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ArtifactSet = ({ artifacts }: Props) => {
  const sets = [];

  artifacts.forEach((itm) => {
    const setLength = artifacts.filter(
      (fitm) => fitm.set.id === itm.set.id
    ).length;
    if (setLength >= 2) {
      if (!sets.find((sitm) => sitm.id === itm.set.id)) {
        sets.push({
          ...itm.set,
          count: setLength === 3 ? 2 : setLength > 4 ? 4 : setLength,
        });
      }
    }
  });

  return (
    <Fragment>
      {sets.map((item) => {
        return (
          <div key={item.id} className="text-xs mb-1 flex">
            <div className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              {item.count} Set {item.name}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ArtifactLists;
