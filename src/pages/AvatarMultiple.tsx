import clsx from "clsx";
import ArtifactLists, { ArtifactSet } from "components/ArtifactsSet";
import { IAvatar } from "components/Avatar";
import Footer from "components/Footer";
import Item from "components/Items";
import Rarity from "components/Rarity";
import React from "react";
import { APP_URL } from "utils/template";

type Props = {
  avatars: IAvatar[];
  uid: string;
  nickname: string;
  ar: number;
};

const AvatarMultiple = ({ uid, nickname, ar, avatars }: Props) => {
  return (
    <div
      className={clsx("relative min-h[550px] element font-genshin text-white", {
        "w-[calc(1400px/2)]": avatars.length === 2,
        "w-[calc(1400px/1.2)]": avatars.length === 3,
        "w-[1400px]": avatars.length >= 4,
      })}
    >
      <div className="flex flex-wrap bg-black bg-opacity-50">
        {avatars.map((item, index) => (
          <div
            key={index}
            className={clsx("relative element", item.element, {
              "w-6/12": avatars.length === 2,
              "w-4/12": avatars.length === 3,
              "w-3/12": avatars.length >= 4,
            })}
          >
            <div className="min-h-[475px] relative z-20">
              <div className="p-4 -mt-3">
                <div className="mb-4 border-b border-white border-opacity-25 pb-4">
                  <h1 className="text-xl flex flex-wrap justify-start items-start mt-2">
                    <img
                      className="w-6 mr-2"
                      src={
                        APP_URL +
                        `/resources/ui/element_${item.element.toLowerCase()}.png`
                      }
                    />
                    <span className="">{item.name}</span>
                    <span className="mt-2 text-xs bg-black rounded px-1 ml-1">
                      C{item.actived_constellation_num}
                    </span>
                  </h1>

                  <p className="text-sm mt-1 mb-1">Lv. {item.level}</p>
                  <p className="text-sm flex items-center">
                    <span>Friendship: Lv. {item.fetter}</span>
                  </p>
                </div>
                <div className="flex flex-nowrap overflow-hidden">
                  <div className="w-16 relative rounded-lg overflow-hidden">
                    <Item
                      rarity={item.weapon.rarity}
                      image={`/weapons/${item.weapon.icon}`}
                    />
                    <div className="bg-black text-xs px-1 rounded-md absolute bottom-0 right-0">
                      R{item.weapon.affix_level}
                    </div>
                  </div>
                  <div className="pl-3">
                    <h3 className="text-sm">{item.weapon.name} </h3>
                    <Rarity rarity={item.weapon.rarity} width={14} />
                    <p className="text-sm mt-1">Level: {item.weapon.level} </p>
                  </div>
                </div>
              </div>
              <div className="p-4 -mt-6">
                <h2 className="mb-2">Artifacts</h2>
                <ArtifactLists artifacts={item.reliquaries} />
                <div className="pt-3 border-t border-white border-opacity-30">
                  <ArtifactSet artifacts={item.reliquaries} />
                </div>
              </div>
            </div>
            <div
              className="absolute w-full bg-contain opacity-70 bg-bottom bg-no-repeat top-10 left-0 bottom-0"
              style={{
                backgroundImage: `url(${APP_URL}/resources/avatars-showcase/${item.image})`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="p-6">
        <Footer nickname={nickname} uid={uid} ar={ar} />
      </div>
    </div>
  );
};

export default AvatarMultiple;
