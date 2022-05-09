import clsx from "clsx";
import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import StarIcon from "components/StarIcon";
import React from "react";
import { timeFormat } from "utils/date";
import { APP_URL } from "utils/template";

type Props = {
  lastUpdate: number;
  tzCode: string;
  wishes: any;
  timezone: string;
};

const Wish = ({ lastUpdate, wishes, timezone, tzCode }: Props) => {
  return (
    <GIGlobalFrame type="dark" width={800} className="bg-gray-800" withoutFrame>
      <div className="pb-4 min-h-[400px]">
        <div className="flex items-center mb-4">
          <img
            src={APP_URL + "/resources/ui/UI_BtnIcon_Gacha.png"}
            className="w-11 mr-3"
          />
          <div className="flex-1">
            <h1 className="text-2xl flex-1">Wish Counter</h1>
            <div className="text-sm pt-1 opacity-75">
              Last Update: {timeFormat(lastUpdate, tzCode)} {timezone}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -m-2">
          <RenderGroupWish
            data={wishes["301"]}
            images="s_323901.png"
            tzCode={tzCode}
          />
          <RenderGroupWish
            data={wishes["302"]}
            images="s_423101.png"
            tzCode={tzCode}
          />
          <RenderGroupWish
            data={wishes["200"]}
            images="s_213201.png"
            tzCode={tzCode}
          />
        </div>
      </div>
      <p className="text-xs italic leading-relaxed mb-2">
        *Data gather based on recently until past 6 month wish history, some old
        wishes may not included.
      </p>
      <Footer withInfo={false} />
    </GIGlobalFrame>
  );
};

const getColorTreshold = (value) => {
  const green = 137;
  const max = 90;
  const hue = Math.abs((value / max) * green - green);
  return `hsl(${hue}, 85%, 45%)`;
};

const RenderGroupWish = ({ data, images, tzCode }) => {
  return (
    <div className="w-full p-2">
      <div className="p-4 rounded-lg relative overflow-hidden">
        <div className="opacity-25 bg-gradient-to-r from-black to-transparent absolute left-0 top-0 w-full h-full" />
        <div className="relative z-10 -mb-1">
          <div className="flex items-center">
            <img
              src={APP_URL + "/resources/ui/" + images}
              className="w-8 opacity-60 mr-3"
            />
            <h2 className="text-lg font-bold flex-1">
              {data.name}
              {data.id === "301" || data.id === "302" ? (
                data.is_rate_on ? (
                  <span className="ml-2 bg-green-700 text-white px-1.5 rounded-lg text-xs">
                    RATE ON
                  </span>
                ) : (
                  <span className="ml-2 bg-orange-700 text-white px-1.5 rounded-lg text-xs">
                    RATE OFF
                  </span>
                )
              ) : (
                ""
              )}
            </h2>
            <h3 className="text-sm">
              Last Wish:{" "}
              {data?.last_wish ? timeFormat(data.last_wish, tzCode) : "-"}
            </h3>
          </div>
          <div className="flex flex-wrap">
            <div className="flex mt-4 w-full py-3">
              <div className="flex-1 border-r border-white border-opacity-40 pr-6">
                <span className="text-3xl text-yellow-500 flex-1">
                  {data.five_pity_value}
                </span>
                <div className="flex items-end">
                  <p className="text-sm mt-1 flex-1">
                    5 Star Pity{" "}
                    <span
                      className="ml-1 w-2 h-2 inline-block rounded-full"
                      style={{
                        backgroundColor: getColorTreshold(data.five_pity_value),
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="flex-1 border-r border-white border-opacity-40 px-6">
                <span className="text-3xl text-purple-600">
                  {data.four_pity_value}
                </span>
                <p className="text-sm mt-1">4 Star Pity</p>
              </div>
              <div className="flex-1 pl-6">
                <span className="text-3xl">{data.total} ~</span>
                <p className="text-sm mt-1">Lifetime Pull</p>
              </div>
            </div>
            <div className="w-full -mx-2 mt-3">
              <div className="flex flex-wrap">
                {data.five_stars_pity.reverse().map((item, index) => (
                  <div
                    key={index}
                    className="m-1 border border-yellow-500 bg-yellow-700 bg-opacity-40 rounded-lg text-xs flex overflow-hidden"
                  >
                    <p className="flex-1 py-1 px-2">{item.name}</p>{" "}
                    <span
                      className="bg-black bg-opacity-40 p-1"
                      style={{ color: getColorTreshold(item.pity) }}
                    >
                      {item.pity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap">
                {data.four_stars_pity
                  .reverse()
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "m-1 border bg-opacity-40 rounded-lg text-xs flex overflow-hidden",
                        {
                          "border-purple-400 bg-purple-900": item.rarity === 4,
                          "border-yellow-500 bg-yellow-700": item.rarity === 5,
                        }
                      )}
                    >
                      <p className="flex-1 py-1 px-2">
                        {item.rarity === 4 ? (
                          item.name
                        ) : (
                          <div className="flex items-center -ml-2">
                            <span className="mr-1">5</span>
                            <span className="mr-1">
                              <StarIcon width={14} />
                            </span>
                          </div>
                        )}
                      </p>{" "}
                      {item.rarity === 4 && (
                        <span className="bg-black bg-opacity-40 p-1">
                          {item.pity}
                        </span>
                      )}
                    </div>
                  ))}
                {data.four_stars_pity.length > 3 && (
                  <div className="m-1 border border-purple-400 bg-purple-900 bg-opacity-40 rounded-lg p-1 text-xs px-2">
                    ...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wish;
