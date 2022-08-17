import clsx from "clsx";
import React from "react";
import { APP_URL } from "utils/template";
import { getRarityClassName } from "./Items";

const ExpItemsComponent = ({ items, small = false }) => {
  return (
    <>
      {items
        .sort((b, a) => b.rarity - a.rarity)
        .map((item, cIndex) => (
          <div key={cIndex}>
            <div className="ml-2">
              {small === true ? (
                <>
                  <div className="flex items-center bg-black px-1 rounded-md bg-opacity-20">
                    <img
                      src={`${APP_URL}/resources/items/${item.image}`}
                      className="h-7"
                    />
                    <div className="text-xs px-1">{item.total}</div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={clsx(
                      "rounded-t-lg w-16 h-16 flex justify-center items-center",
                      getRarityClassName(item.rarity)
                    )}
                  >
                    <img
                      src={`${APP_URL}/resources/items/${item.image}`}
                      className="h-full"
                    />
                  </div>
                  <p
                    className="bg-gray-800 text-gray-600 rounded-b-lg text-center text-sm"
                    style={{
                      backgroundColor: `rgba(233,229,220,var(--tw-bg-opacity))`,
                    }}
                  >
                    {item.total}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default ExpItemsComponent;
