import clsx from "clsx";
import React from "react";
import { APP_URL } from "utils/template";

type Props = {
  rarity: number;
  image: string;
  className?: string;
};

export const getRarityClassName = (rarity) =>
  clsx(
    "bg-gradient-to-br",
    { "from-rarity1-100 to-rarity1-900": rarity === 1 },
    { "from-rarity2-100 to-rarity2-900": rarity === 2 },
    { "from-rarity3-100 to-rarity3-900": rarity === 3 },
    { "from-rarity4-100 to-rarity4-900": rarity === 4 },
    { "from-rarity5-100 to-rarity5-900": rarity === 5 },
    { "from-red-800 to-red-500": rarity >= 6 }
  );

const Item = ({ rarity, image, className }: Props) => {
  return (
    <div
      className={clsx(
        "w-16 h-16 rounded-lg overflow-hidden bg-opacity-40 relative",
        getRarityClassName(rarity),
        className
      )}
    >
      <img src={APP_URL + "/resources/" + image} />
    </div>
  );
};

export const GameItem = ({ item }) => {
  return (
    <div className="rounded-md overflow-hidden relative">
      <div
        className={clsx(
          "w-12 h-12 p-1 flex items-center justify-center",
          getRarityClassName(item.rarity)
        )}
      >
        <img src={`${APP_URL}/resources/items/${item?.id}.png`} />
      </div>
      <div className="text-xs text-center bg-black bg-opacity-50 absolute bottom-0 w-full">
        {item.amount}
      </div>
    </div>
  );
};

export const GameItemSmall = ({ item }) => {
  return (
    <div className="bg-black bg-opacity-25 flex overflow-hidden rounded-lg">
      <div
        className={clsx(
          "w-8 h-8 p-1 flex items-center justify-center",
          getRarityClassName(item.rarity)
        )}
      >
        <img src={`${APP_URL}/resources/items/${item?.id}.png`} />
      </div>
      <div
        className={clsx("text-xs flex items-center justify-center px-1 w-8")}
      >
        {item.amount}
      </div>
    </div>
  );
};

export default Item;
