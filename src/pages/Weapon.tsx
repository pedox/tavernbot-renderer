import clsx from "clsx";
import AscensionItemsComponent from "components/AscensionItemsComponent";
import DailyDomains, { Domain } from "components/DailyDomains";
import ExpItemsComponent from "components/ExpItemsComponent";
import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import { getRarityClassName } from "components/Items";
import Rarity from "components/Rarity";
import React, { Fragment } from "react";
import { numberFormat } from "utils";
import { APP_URL } from "utils/template";

type Props = {
  from: number;
  to: number;
  // cdp: number;
  exps: any;
  exp_summary: any;
  exp_amount: number;
  materials: any;
  materials_amount: number;
  weapon: any;
  stats: {
    base_attack: number;
    secondary: {
      label: string;
      unit: string;
      value: number;
    };
  };
  domains: Domain[];
};

const Weapon = ({
  from,
  to,
  // cdp,
  weapon,
  exps,
  exp_summary,
  exp_amount,
  materials,
  materials_amount,
  stats,
  domains,
}: Props) => {
  return (
    <GIGlobalFrame className="bg-gray-800" withoutFrame width={919}>
      <div className="flex flex-col" style={{ minHeight: 480 }}>
        <div className="flex pb-3 mb-4 border-b border-white border-opacity-20">
          <div className="flex-1">
            <h1 className="text-lg">Weapon EXP &amp; Material Estimation</h1>
            <h1 className="text-sm">
              From Lv.{from} - Lv.{to}
            </h1>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex-1 pr-4 border-r border-white border-opacity-20">
            <div className="border-b border-white border-opacity-25 pb-1 mb-3">
              <div className="flex flex-wrap">
                <div className="relative">
                  <div
                    className={clsx(
                      "bg-opacity-50 w-20 h-20 overflow-hidden rounded-md relative",
                      getRarityClassName(weapon.rarity)
                    )}
                  >
                    <img
                      src={`${APP_URL}/resources/items/${weapon.id}.png`}
                      className="w-20"
                    />
                    {weapon.upcoming && (
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
                    rarity={weapon.rarity}
                  />
                </div>
                <div className="pl-3 flex-1">
                  <h1 className="mb-2">{weapon.name}</h1>
                  <div className="mt-1 text-xs w-full">
                    <div className="flex mb-2">
                      <div className="flex-1">Base ATK:</div>{" "}
                      <div>{stats ? stats.base_attack : "??"}</div>
                    </div>
                    {stats && stats.secondary.label !== "none" && (
                      <div className="flex">
                        <div className="flex-1">{stats.secondary.label}:</div>{" "}
                        <div>
                          {parseFloat(stats.secondary.value.toFixed(1))}
                          {stats.secondary.unit}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {weapon.passive && (
              <div className="border-b border-white border-opacity-20 mb-3 pb-4 text-xs leading-relaxed">
                <h2 className="text-sm mb-1">{weapon.passive_title}</h2>
                <p className="opacity-80">{weapon.passive}</p>
              </div>
            )}

            {exp_summary.length > 0 && (
              <>
                <div className="border-b border-white border-opacity-20 mb-3 pb-4">
                  <h2 className="mb-2">Crystal(s) Ore Used</h2>
                  <div className="flex -mx-3">
                    <ExpItemsComponent items={exp_summary} />
                  </div>
                  <div className="text-sm flex items-center mt-3">
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

                <div className="border-b border-white border-opacity-20 mb-6 pb-4">
                  <h2 className="mb-2">Crystal(s) Forging</h2>
                  <div>
                    {exp_summary
                      .sort((a, b) => b.rarity - a.rarity)
                      .map((item, index) => {
                        return (
                          <div className="flex items-center" key={index}>
                            <div
                              className={clsx(
                                "m-1 bg-black bg-opacity-30 rounded-md overflow-hidden flex"
                              )}
                            >
                              <div
                                className={clsx(
                                  "w-8 h-8 flex justify-center items-center p-1",
                                  getRarityClassName(item.rarity)
                                )}
                              >
                                <img
                                  src={`${APP_URL}/resources/items/${item.id}.png`}
                                  className="max-w-full max-h-full"
                                  alt={item.id}
                                />
                              </div>

                              <div className="text-xs bg-black bg-opacity-25 flex justify-center items-center px-2">
                                <span>{item.total}</span>
                              </div>
                            </div>

                            <div className="mx-1">=</div>

                            <div
                              className={clsx(
                                "m-1 bg-black bg-opacity-30 rounded-md overflow-hidden flex"
                              )}
                            >
                              <div
                                className={clsx(
                                  "w-8 h-8 flex justify-center items-center p-1",
                                  getRarityClassName(1)
                                )}
                              >
                                <img
                                  src={`${APP_URL}/resources/items/${item.forging.id}.png`}
                                  className="max-w-full max-h-full"
                                  alt={item.forging.id}
                                />
                              </div>

                              <div className="text-xs bg-black bg-opacity-25 flex justify-center items-center px-2">
                                <span>{item.forging.amount}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}

            {materials.length > 0 && (
              <div className="mb-6 pb-3">
                <h2 className="mb-2">Material(s) Used</h2>
                <div className="flex flex-wrap">
                  <AscensionItemsComponent
                    phase={false}
                    item={{ items: materials }}
                    summary
                    className="mb-2"
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
          <div className="pl-4 pt-2 w-[510px]">
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
                  <div className="pr-4" style={{ width: 140 }}>
                    Lv.{item.from} - Lv.{item.to}
                  </div>
                  <div
                    className="flex flex-1 justify-end"
                    style={{ width: 200 }}
                  >
                    <ExpItemsComponent items={item.items} small />
                  </div>
                  <div
                    className="flex items-center justify-end"
                    style={{ width: 100 }}
                  >
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

      <DailyDomains domains={domains} />

      <div className="flex-1 flex flex-col mt-4 border-t border-white border-opacity-25">
        {exps.length > 0 && (
          <div className="text-center text-lg justify-center flex items-center mt-3">
            <div>Grand Total : </div>
            <div className="flex items-center ml-2">
              <img
                src={`${APP_URL}/resources/ui/Item_Mora.webp`}
                className="w-7"
              />
              <p>{numberFormat(exp_amount + materials_amount)}</p>
            </div>
          </div>
        )}
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

export default Weapon;
