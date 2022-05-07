import clsx from "clsx";
import React from "react";
import { numberFormat } from "utils";
import { APP_URL } from "utils/template";
import { getRarityClassName } from "./Items";

const AscensionItemsComponent = ({
  phase,
  item,
  className = "",
  summary = false,
}) => {
  return (
    <div
      className={clsx(
        "flex",
        {
          "bg-black bg-opacity-10 px-3 py-2 rounded-md items-center justify-end text-xs":
            !summary,
          "flex-wrap": summary,
        },
        className
      )}
    >
      {!summary && (
        <div className="flex-1 flex">
          {[...new Array(6)].map((_, index) => (
            <img
              key={index}
              src={APP_URL + "/resources/ui/star-asc.png"}
              className={clsx("w-4 opacity-25", {
                "opacity-100": index <= phase,
              })}
              style={{ margin: "0 0.1em" }}
            />
          ))}
        </div>
      )}
      {item.items
        .sort((a, b) => a.rarity - b.rarity)
        .map((item, index) => {
          return (
            <div
              className={clsx(
                "flex items-center bg-black bg-opacity-50 rounded-md",
                { "flex-col m-1": summary },
                { "ml-2 pr-2": !summary }
              )}
              key={index}
            >
              <div
                className={clsx(
                  "p-1 rounded-md flex justify-center items-center ",
                  { "w-8 h-8": !summary },
                  { "w-14 h-14 p-2": summary },
                  getRarityClassName(item.rarity)
                )}
              >
                <img
                  src={`${APP_URL}/resources/items/${item.id}.png`}
                  className="h-full"
                />
              </div>
              <p
                className={clsx(
                  { "ml-2": !summary },
                  { "text-xs py-1": summary }
                )}
              >
                {item.amount}
              </p>
            </div>
          );
        })}
      <div
        className={clsx("flex items-center justify-end w-[90px]", {
          hidden: summary,
        })}
      >
        <p>{numberFormat(item.amount)}</p>
        <img
          src={`${APP_URL}/resources/ui/Item_Mora.webp`}
          className="w-6 ml-1"
        />
      </div>
    </div>
  );
};
export default AscensionItemsComponent;
