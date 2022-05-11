import AscensionItemsComponent from "components/AscensionItemsComponent";
import ExpItemsComponent from "components/ExpItemsComponent";
import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import Item from "components/Items";
import Rarity from "components/Rarity";
import React, { Fragment } from "react";
import { numberFormat } from "utils";
import { APP_URL } from "utils/template";

type Props = {
  from: number;
  to: number;
  character: any;
  stats: any;
  exp_summary: any;
  exp_amount: number;
  leyline: number;
  wl: number;
  exps: any[];
  materials_amount: number;
  materials: any[];
};

const CharacterExp = ({
  from,
  to,
  character,
  stats,
  exp_summary,
  exp_amount,
  leyline,
  exps = [],
  materials,
  materials_amount,
  wl,
}: Props) => {
  console.log("character.iconName", character.iconName);
  console.log("character.potrait", character.potrait);
  return (
    <GIGlobalFrame className="bg-gray-800" withoutFrame width={945}>
      <div className="flex flex-col" style={{ minHeight: 480 }}>
        <div className="flex pb-3 mb-4 border-b border-white border-opacity-20">
          <div className="flex-1">
            <h1 className="text-lg">Character EXP Book Estimation</h1>
            <h1 className="text-sm">
              From Lv.{from} - Lv.{to}
            </h1>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex-1 pr-4 border-r border-white border-opacity-20">
            <div className="border-b border-white border-opacity-25 pb-1 mb-3">
              <div className="flex">
                <div>
                  <div className="relative w-20">
                    <Item
                      image={
                        character.iconName
                          ? "avatars/" + character.iconName + ".png"
                          : "items/" + character.potrait
                      }
                      className="!w-20 !h-20"
                      rarity={character.rarity}
                    />
                    <img
                      src={`${APP_URL}/resources/ui/element_${character.element}.png`}
                      className="absolute left-1 top-1 w-6"
                    />
                    {character.upcoming && (
                      <span
                        style={{ fontSize: 9 }}
                        className="absolute bottom-1 left-1 rounded-md bg-yellow-600 px-1"
                      >
                        BETA
                      </span>
                    )}
                  </div>
                  <Rarity
                    width={16}
                    className="justify-center"
                    rarity={character.rarity}
                  />
                </div>
                <div className="pl-3 flex-1">
                  <h1 className="mb-2">{character.name}</h1>
                  <div className="mt-1 text-xs w-full">
                    <div className="flex mb-2">
                      <div className="flex-1">HP:</div>{" "}
                      <div>
                        {stats.notice && "*"}
                        {numberFormat(stats.Base_HP)}
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="flex-1">ATK:</div>{" "}
                      <div>
                        {stats.notice && "*"}
                        {numberFormat(stats.Base_ATK)}
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="flex-1">DEF:</div>{" "}
                      <div>
                        {stats.notice && "*"}
                        {numberFormat(stats.Base_DEF)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {stats.notice && (
                <p className="py-1" style={{ fontSize: 10 }}>
                  *There&apos;s may have small rounding errors
                </p>
              )}

              <div className="text-xs border-t border-white border-opacity-25 pt-2">
                {Object.entries(stats)
                  .filter(([itm]) => !/Lv|Base_|notice/.test(itm))
                  .map(([item, value]) => (
                    <div className="flex mb-2" key={item}>
                      <div className="flex-1 capitalize">
                        {item.replace(/_/g, " ")}:
                      </div>{" "}
                      <div>{value}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pb-2">
              <h2 className="mb-2">Using Experience Book(s)</h2>
              <div className="flex -mx-3">
                <ExpItemsComponent items={exp_summary} />
              </div>
              <div className="text-center text-sm flex items-center mt-3">
                <div>Total Mora : </div>
                <div className="flex items-center ml-2">
                  <img
                    src={`${APP_URL}/resources/ui/Item_Mora.webp`}
                    className="w-7"
                  />
                  <p>{numberFormat(exp_amount)}</p>
                </div>
              </div>
            </div>

            <div className="border-b border-white border-opacity-20 pb-3 mb-3">
              <h2 className="mb-2 text-xs">
                Or Take Ley Line (Blossom of Revelation)
              </h2>

              <div className="flex flex-wrap mb-2">
                <div className="flex items-center bg-black px-1 rounded-md bg-opacity-20">
                  <img
                    src={`${APP_URL}/resources/ui/UI_BlossomSmallIcon_Camp_02.png`}
                    className="h-7 p-1"
                  />
                  <div className="text-xs px-1">{leyline}</div>
                </div>
                <span className="mx-2 self-center">=</span>
                <div className="flex items-center bg-black px-1 rounded-md bg-opacity-20">
                  <img
                    src={`${APP_URL}/resources/ui/Item_Fragile_Resin.webp`}
                    className="h-7 p-1"
                  />
                  <div className="text-xs px-1">{20 * leyline}</div>
                </div>
              </div>

              <em className="text-xs">*Based on World Level {wl}</em>
            </div>

            {exps.length > 0 && (
              <div className="mb-6 pb-3">
                <h2 className="mb-2">Material(s) Used</h2>
                <div className="flex flex-wrap">
                  <AscensionItemsComponent
                    phase={false}
                    item={{ items: materials }}
                    summary
                    className="mb-0"
                  />
                </div>
                <div className="text-center flex text-sm items-center mt-3">
                  <div>Total Mora : </div>
                  <div className="flex items-center ml-2">
                    <img
                      src={`${APP_URL}/resources/ui/Item_Mora.webp`}
                      className="w-7"
                    />
                    <p>{numberFormat(materials_amount)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pl-4 pt-2 w-[600px]">
            {exps.map((item, index) => (
              <Fragment key={index}>
                {item.ascension.start && (
                  <AscensionItemsComponent
                    phase={item.ascension.phase - 1}
                    item={item.start_materials}
                    className="mb-2"
                  />
                )}

                <div className="bg-black mb-2 flex bg-opacity-25 p-3 rounded-md items-center text-xs">
                  <div className="pr-4 flex-1">
                    Lv.{item.from} - Lv.{item.to}
                  </div>
                  <div className="flex shrink-0 justify-end">
                    <ExpItemsComponent items={item.items} small />
                    <span className="mx-2 self-center">Or</span>
                    <RenderLeyLine item={item} />
                  </div>
                  <div className="flex items-center justify-end w-[90px]">
                    <p>{numberFormat(item.mora)}</p>
                    <img
                      src={`${APP_URL}/resources/ui/Item_Mora.webp`}
                      className="w-6 ml-1"
                    />
                  </div>
                </div>

                {item.ascension.end && (
                  <AscensionItemsComponent
                    phase={item.ascension.phase}
                    item={item.end_materials}
                    className="mb-2"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-end mt-4">
        <Footer withInfo={false} />
        <div className="flex-1 text-sm text-right opacity-70">
          Credits: genshin.honeyhunterworld.com
        </div>
      </div>
    </GIGlobalFrame>
  );
};

export const RenderLeyLine = ({ item }) => {
  return (
    <>
      <div className="flex items-center bg-black px-1 rounded-md bg-opacity-20">
        <img
          src={`${APP_URL}/resources/ui/UI_BlossomSmallIcon_Camp_02.png`}
          className="h-7 p-1"
        />
        <div className="text-xs px-1">{item.leyline}</div>
      </div>
      <span className="self-center mx-1">=</span>
      <div className="flex items-center bg-black px-1 rounded-md bg-opacity-20">
        <img
          src={`${APP_URL}/resources/ui/Item_Fragile_Resin.webp`}
          className="h-7 p-1"
        />
        <div className="text-xs px-1">{20 * item.leyline}</div>
      </div>
    </>
  );
};

export default CharacterExp;
