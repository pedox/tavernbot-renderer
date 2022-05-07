import clsx from "clsx";
import ArtifactLists, { ArtifactSet } from "components/ArtifactsSet";
import { IAvatar } from "components/Avatar";
import Footer from "components/Footer";
import Item from "components/Items";
import Rarity from "components/Rarity";
import React from "react";
import { APP_URL } from "utils/template";

type Props = {
  notFound: boolean;
  avatar: IAvatar;
  gameId: string;
  nickname: string;
  level: number;
};

const AvatarSingle = ({
  notFound = false,
  gameId,
  nickname,
  level,
  avatar,
}: Props) => {
  if (notFound) {
    return (
      <div className="relative w-[750px] min-h-[550px] font-genshin text-white element flex flex-col justify-center items-center">
        <div
          className="bg-black absolute top-0 left-0 w-full h-full bg-opacity-50"
          style={{ zIndex: -1 }}
        />
        <h1 className="text-2xl">Character not found</h1>
        <p className="mt-2">
          Maybe you&apos;re typos, or character isn&apos;t in your lists.
        </p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative w-[750px] min-h[550px] element font-genshin text-white",
        avatar.element
      )}
    >
      <div className="flex items-center h-[475px]">
        <div
          className="bg-black absolute left-0 top-0 w-full h-full bg-opacity-30"
          style={{ zIndex: -1 }}
        />
        <div className="w-[325px] p-6 self-start">
          <h2 className="mb-4">Artifacts</h2>
          <ArtifactLists artifacts={avatar.reliquaries} />
          <div className="pt-3 border-t border-white border-opacity-30">
            <ArtifactSet artifacts={avatar.reliquaries} />
          </div>
        </div>
        <div className="flex-1" />
        <div className="w-4/12 self-start p-6">
          <div className="mb-4 border-b border-white border-opacity-25 pb-4">
            <h1 className="text-xl flex flex-wrap justify-start items-start mt-2">
              <img
                className="w-6 mr-2"
                src={
                  APP_URL +
                  `/resources/ui/element_${avatar.element.toLowerCase()}.png`
                }
              />
              <span className="">{avatar.name}</span>
            </h1>
            <span className="mt-2 text-xs bg-black rounded px-1">
              C{avatar.actived_constellation_num}
            </span>
            <p className="text-sm mt-1 mb-1">Lv. {avatar.level}</p>
            <p className="text-sm flex items-center">
              <span>Friendship: Lv. {avatar.fetter}</span>
            </p>
          </div>
          <div className="flex flex-nowrap overflow-hidden">
            <div className="w-16 relative rounded-lg overflow-hidden">
              <Item
                rarity={avatar.weapon.rarity}
                image={`/weapons/${avatar.weapon.icon}`}
              />
              <div className="bg-black text-xs px-1 rounded-md absolute bottom-0 right-0">
                R{avatar.weapon.affix_level}
              </div>
            </div>
            <div className="pl-3">
              <h3 className="text-sm">{avatar.weapon.name} </h3>
              <Rarity rarity={avatar.weapon.rarity} width={14} />
              <p className="text-sm mt-1">Level: {avatar.weapon.level} </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute w-full bg-contain bg-bottom bg-no-repeat top-10 left-0 bottom-0"
        style={{
          backgroundImage: `url(${APP_URL}/resources/avatars-showcase/${avatar.image})`,
        }}
      />
      <div className="p-6 pt-0">
        <Footer nickname={nickname} gameId={gameId} level={level} />
      </div>
    </div>
  );
};

export default AvatarSingle;
