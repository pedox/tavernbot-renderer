import clsx from "clsx";
import Avatar, { IAvatar } from "components/Avatar";
import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import Title from "components/Title";
import React, { useMemo } from "react";
import { APP_URL } from "utils/template";

type Props = {
  avatars: IAvatar[];
  gameId: string;
  nickname: string;
  level: number;
};

const AvatarLists = ({ avatars, gameId, nickname, level }: Props) => {
  const elements = useMemo(() => {
    const elements = [
      { element: "Anemo", count: 0 },
      { element: "Pyro", count: 0 },
      { element: "Hydro", count: 0 },
      { element: "Cryo", count: 0 },
      { element: "Geo", count: 0 },
      { element: "Electro", count: 0 },
      { element: "Dendro", count: 0 },
      { element: "5 Star", count: 0 },
      { element: "4 Star", count: 0 },
    ];

    avatars.forEach((item) => {
      if (item.name === "Traveler") return;
      const elementIndex = elements.findIndex(
        (itm) => itm.element === item.element
      );
      if (elementIndex > -1) {
        elements[elementIndex].count += 1;
      }

      if (item.rarity >= 5) {
        elements[7].count += 1;
      }
      if (item.rarity === 4) {
        elements[8].count += 1;
      }
    });
    return elements
      .sort((a, b) => b.count - a.count)
      .sort((a, b) =>
        b.element === "4 Star" || b.element === "5 Star" ? -1 : 0
      );
  }, [avatars]);

  return (
    <div className="bg-gray-900">
      <GIGlobalFrame
        width={avatars.length <= 8 ? 508 : avatars.length > 30 ? 956 : 620}
        withoutFrame
      >
        <Title className="text-cream-900 text-xl text-center">
          Character Summary
        </Title>
        <div className="flex-1 mb-6 mt-5">
          <div className="flex flex-wrap gap-3">
            {[...avatars]
              .sort((a, b) => a.element.localeCompare(b.element))
              .sort((a, b) => b.rarity - a.rarity)
              .sort((a) => (a.name === "Traveler" ? -1 : 0))
              .map((item, index) => (
                <Avatar key={index} {...item} />
              ))}
          </div>
          <div className="flex flex-wrap -mx-1 mt-3">
            {elements.map((item, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-black bg-opacity-30 text-xs m-1 flex rounded-lg"
              >
                <div className="flex items-center">
                  {/\d Star/.test(item.element) ? (
                    <div
                      className={clsx("w-3 h-3 rounded-full", {
                        "bg-rarity5-900": item.element === "5 Star",
                        "bg-rarity4-900": item.element === "4 Star",
                      })}
                    />
                  ) : (
                    <img
                      className="w-4"
                      src={
                        APP_URL +
                        `/resources/ui/element_${item.element.toLowerCase()}.png`
                      }
                    />
                  )}
                </div>
                <div className="px-2">{item.element}</div>
                <div>{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <Footer gameId={gameId} nickname={nickname} level={level} />
      </GIGlobalFrame>
    </div>
  );
};

export default AvatarLists;
