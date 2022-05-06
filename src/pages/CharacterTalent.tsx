import clsx from "clsx";
import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import Item, { GameItem, GameItemSmall } from "components/Items";
import Rarity from "components/Rarity";
import React, { useMemo } from "react";
import { numberFormat } from "utils";
import { APP_URL } from "utils/template";

type Props = {
  character: any;
  materials: any;
  summary: any;
};

const CharacterTalent = ({ character, materials, summary }: Props) => {
  const getMaxedMaterials = materials.sort((a, b) => b.length - a.length)[0];

  const sumMora = materials.reduce((prev, item) => {
    return prev + item.reduce((prev, item) => prev + item.cost, 0);
  }, 0);

  const materialSummary = (
    <div
      className={clsx("flex flex-col ", {
        "w-[305px] mr-3 mt-2 border-r border-white border-opacity-20 pr-4":
          materials.length === 1,
        "items-center mt-4 border-t border-white border-opacity-20 pt-2":
          materials.length > 1,
      })}
    >
      <h2 className="mb-2">Meterial Summary</h2>
      <div className="flex flex-wrap -m-1">
        {summary.map((item, index) => (
          <div
            className={clsx("p-1", {
              "w-3/12": materials.length > 1,
              "w-full": materials.length === 1,
            })}
            key={index}
          >
            <div className="flex items-center bg-black bg-opacity-25 p-1 rounded-lg">
              <div className="pr-2">
                <GameItemSmall item={item} />
              </div>
              <div className="text-xs">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <GIGlobalFrame className="bg-gray-800" withoutFrame width={945}>
      <div className="flex flex-col" style={{ minHeight: 480 }}>
        <div className="flex pb-3 mb-4 border-b border-white border-opacity-20">
          <div>
            <div className="relative w-20">
              <Item
                image={
                  character.iconName
                    ? "avatars/" + character.iconName + ".png"
                    : character.potrait
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

          <div className="flex-1 pl-3">
            <h1 className="text-xl mt-4 mb-3">Talent Material Estimation</h1>
            <div className=" -mt-3 pb-4">
              <h2>{character.name}</h2>
            </div>
          </div>
        </div>
        <div className="flex">
          {materials.length > 1 ? (
            <div className="w-[305px] mr-3 mt-2 border-r border-white border-opacity-20 pr-4">
              {materials.map((item, index) => (
                <MaterialSummary key={index} index={index} item={item} />
              ))}
            </div>
          ) : (
            materialSummary
          )}
          <div className="flex-1">
            {getMaxedMaterials.map((item, index) => (
              <div
                className="flex p-2 bg-black bg-opacity-20 rounded-lg my-2"
                key={index}
              >
                <div className="flex items-center text-xs pl-2 pr-4">
                  Lv.{item.level}
                </div>
                <div className="flex flex-wrap flex-1 justify-end border-r border-white border-opacity-20 pr-1">
                  {item.items.map((item, index) => (
                    <div className="mr-2" key={index}>
                      <GameItemSmall item={item} />
                    </div>
                  ))}
                </div>
                <div className="text-xs w-24 text-right justify-end flex items-center">
                  <span>{numberFormat(item.cost)}</span>
                  <div>
                    <img
                      src={`${APP_URL}/resources/ui/Item_Mora.webp`}
                      className="w-6 ml-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {materials.length > 1 && materialSummary}

      <div className="flex-1 flex flex-col mt-4 border-t border-white border-opacity-25">
        <div className="text-center text-lg justify-center flex items-center mt-3">
          <div>Grand Total : </div>
          <div className="flex items-center ml-2">
            <img
              src={`${APP_URL}/resources/ui/Item_Mora.webp`}
              className="w-7"
            />
            <p>{numberFormat(sumMora)}</p>
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

const MaterialSummary = ({ item, index }) => {
  const { materials, cost } = useMemo(() => {
    const materials = [];
    let cost = 0;
    for (const itm of item) {
      cost += itm.cost;
      for (const mat of itm.items) {
        const exist = materials.findIndex((f) => f.id === mat.id);
        if (exist === -1) {
          materials.push({ ...mat });
        } else {
          materials[exist].amount += mat.amount;
        }
      }
    }
    return { materials: materials.sort((a, b) => b.rarity - a.rarity), cost };
  }, [item]);

  const from = item[0].level;
  const to = item[item.length - 1].level;

  return (
    <div
      className={clsx("mb-4 border-white border-opacity-25", {
        "border-t pt-2": index > 0,
      })}
    >
      <div className="text-xs mb-1 flex items-center">
        <div className="flex-1">
          {from === to ? (
            <>Lv.{from}</>
          ) : (
            <>
              Lv.{from} &mdash; Lv.{to}
            </>
          )}
        </div>
        <div className="flex items-center">
          <span>{numberFormat(cost)}</span>
          <div>
            <img
              src={`${APP_URL}/resources/ui/Item_Mora.webp`}
              className="w-6"
            />
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-30 rounded-lg p-1 mb-3">
        <div className="flex flex-wrap">
          {materials.map((item, index) => (
            <div className="m-1" key={index}>
              <GameItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterTalent;
