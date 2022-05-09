import clsx from "clsx";
import Footer from "components/Footer";
import ExclamationIcon from "components/icons/Exclamation";
import { getRarityClassName } from "components/Items";
import Title from "components/Title";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { numberFormat } from "utils";
import { dateFormat, timeFormat } from "utils/date";
import { APP_URL } from "utils/template";
import { AbyssStar, IAbyss } from "./Abyss";

type ILeaderboardAvatar = {
  id: string;
  count: number;
  name: string;
  iconName: string;
  rarity: number;
};

type IMostStar = { star: number; count: number };

type Props = {
  name: string;
  leaderboard: IAbyss[];
  participated: number;
  userSize: number;
  filter?: string[];
  avatars?: ILeaderboardAvatar[];
  most_stars?: IMostStar[];
  server: string;
  me?: string;
  noData?: boolean;
  timezone: string;
  tzCode: string;
  serverTzCode: string;
  period: {
    schedule_id: number;
    start_time: string;
    end_time: string;
    region: string;
  };
};

const AbyssLeaderboard = (props: Props) => {
  const {
    name,
    leaderboard,
    participated,
    userSize,
    avatars,
    most_stars,
    period: { start_time, end_time },
    server,
    noData,
    tzCode,
    timezone,
    serverTzCode,
  } = props;
  let { filter } = props;

  if (!filter) filter = [];
  if (!avatars) filter = [];
  if (!most_stars) filter = [];

  const usingFilter = filter.length > 0;

  return (
    <div className="bg-[#153857] w-[915px] relative text-white font-genshin flex flex-col">
      <div
        className="h-full absolute top-0 bg-no-repeat bg-contain bg-top left-0 w-full"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/UI_Tower_Bg2.png)`,
        }}
      />
      <div className="relative z-10 px-6 flex-1 w-full min-h-[400px]">
        <div className="flex pt-6">
          <div>
            <img
              src={APP_URL + "/resources/ui/UI_Icon_Tower_1.png"}
              style={{ height: "48px" }}
            />
          </div>
          <div className="flex-1 pl-3">
            <h1 className="text-xl">Spiral Abyss Leaderboard</h1>
            <h2 className="text italic text-sm pt-1">{name}</h2>
            <RenderFilter filter={filter} />
            {usingFilter && (
              <div className="text-xs mt-2 mb-4">
                Only Register v2 can participate to filtered leaderboard
              </div>
            )}
          </div>
          <div className="text-right text-sm">
            <p className="mt-1">
              ({server}) {dateFormat(start_time, serverTzCode)} -{" "}
              {dateFormat(end_time, serverTzCode)}
            </p>
            <p className="mt-1">
              {timeFormat(dayjs().unix(), tzCode)} {timezone}
            </p>
          </div>
        </div>

        {noData ? (
          <div className="text-center">
            <h1 className="text-3xl mt-40">No data found</h1>
          </div>
        ) : (
          <RenderLeaderboard {...props} />
        )}
      </div>

      <div className="text-center pr-3 px-6 relative">
        {leaderboard.length > 0 ? (
          <div className="text-sm">
            <p className="mb-1">
              {participated} people has participated in this leaderboard
            </p>
            {/* {filter.length === 0 && (
              <p>
                {userSize - participated} of {userSize} people has no battle
                record.
              </p>
            )} */}
          </div>
        ) : (
          <Fragment />
        )}
      </div>

      <div className="p-6 relative flex items-end">
        <Footer withInfo={false} />
        <p className="italic opacity-90 flex-1 text-right text-sm">
          Every journey has it&apos;s final day. Don&apos;t rush! - Zhongli
        </p>
      </div>
    </div>
  );
};

interface IRenderList extends IAbyss {
  notIn10?: boolean;
  me?: string;
  rank: number;
  user?: { username: string };
}

const RenderList = (prop: IRenderList) => {
  const {
    notIn10,
    userId,
    nickname,
    me,
    rank,
    level,
    user,
    with_comps,
    most_damage,
    total_battle_times,
    total_win_times,
    max_floor,
    total_star,
  } = prop;
  return (
    <Fragment>
      {notIn10 && (
        <div className="border-b border-white border-opacity-20 flex-1 mt-3 mb-4" />
      )}

      <div
        className={clsx(
          `mb-1 py-2 bg-black bg-opacity-50 flex rounded-lg
                      border border-white border-opacity-10 relative`
        )}
        style={{
          boxShadow: userId === me ? "0px 0px 13px 2px #2697ce" : null,
          borderColor: userId === me ? "#9adeff" : null,
        }}
      >
        <div
          style={{ width: "7%" }}
          className="px-2 border-r border-gray-50 border-opacity-30 flex items-center justify-center"
        >
          <p className="text-center">{rank}</p>
        </div>
        <div
          style={{ width: "34%" }}
          className="flex px-2 border-r border-gray-50 border-opacity-30"
        >
          <RenderAvatar item={prop} />
          <div className="text-sm flex flex-col justify-center self-start ml-2 mt-1">
            <p>
              {nickname} - AR{level}
            </p>
            <div style={{ fontSize: 11 }}>
              ({user.username}){" "}
              {with_comps !== true && (
                <span className="inline-block">
                  <ExclamationIcon className="w-3 h-3 mt-1 text-yellow-400" />
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ width: "15%" }} className="text-right mt-3 px-2">
          {numberFormat(most_damage)}
        </div>

        <div style={{ width: "10%" }} className="text-center mt-3 px-2">
          {total_battle_times}
        </div>
        <div style={{ width: "10%" }} className="text-center mt-3 px-2">
          {total_win_times}
        </div>
        <div style={{ width: "10%" }} className="text-right mt-3 px-2">
          {max_floor}
        </div>
        <div style={{ width: "17%" }} className="px-2">
          <div className="flex justify-end mt-3 pr-2">
            <span className="mr-2">{total_star}</span>
            <AbyssStar className="w-5" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

type IRenderMostStars = {
  mostStars: IMostStar[];
};
const RenderMostStar = ({ mostStars }: IRenderMostStars) => {
  return (
    <div className="mt-4">
      <Title className="text-center text-xl mx-4">Most Star collected</Title>

      <div className="w-full my-3">
        <div
          className="flex flex-wrap justify-center text-center"
          style={{ margin: "-0.15em" }}
        >
          {mostStars.map((item, index) => (
            <div
              key={index}
              style={{ width: "11.11111111111111%", padding: "0.15em" }}
            >
              <div className="border border-white border-opacity-25 rounded-md p-2 bg-black bg-opacity-30">
                <p className="flex justify-center text-sm">
                  {item.star} <AbyssStar className="w-4 ml-1" />
                </p>
                <p className="text-xs mt-1">{item.count} People</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type IRenderMostUsedCharacter = {
  avatars: ILeaderboardAvatar[];
};
const RenderMostUsedCharacter = ({ avatars }: IRenderMostUsedCharacter) => {
  return (
    <div>
      <Title className="text-center text-xl mx-4">Most Used Characters</Title>
      <div className="flex flex-wrap justify-center my-3">
        {avatars
          .sort((a, b) => b.count - a.count)
          .map((item, index, arr) => {
            const sum = arr.reduce((prev, itm) => prev + itm.count, 0);
            const percentage = (item.count / sum) * 100;

            return (
              <div key={index} className="w-1/12 mb-2 flex justify-center">
                <div className="rounded-lg overflow-hidden relative bg-cream-100 w-16">
                  <div
                    className={clsx(
                      "w-16 h-16 flex justify-center items-center relative overflow-hidden rounded-br-xl",
                      getRarityClassName(item.rarity || 5)
                    )}
                  >
                    <img
                      src={
                        APP_URL +
                        "/resources/avatars/" +
                        (item.iconName || "UI_AvatarIcon_PlayerBoy") +
                        ".png"
                      }
                    />
                  </div>
                  <div
                    className="text-bblue-800 text-xs text-center overflow-hidden w-15 whitespace-nowrap overflow-ellipsis"
                    style={{ padding: ".1em" }}
                  >
                    {percentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const RenderAvatar = ({ item }: { item: IAbyss }) => {
  return (
    <div>
      <div className="rounded-md overflow-hidden relative">
        <div
          className={clsx(
            "w-12 h-12 flex justify-center items-center relative overflow-hidden",
            "rounded-md",
            getRarityClassName(item.damage_rank.rarity)
          )}
        >
          {item.with_comps === true ? (
            <div
              className="text-white bg-black absolute top-0 right-0 text-xs rounded-md"
              style={{
                margin: "0.1em",
                padding: "0.1em",
                fontSize: 9,
              }}
            >
              C{item.damage_rank.cons}
            </div>
          ) : (
            <Fragment />
          )}
          <img
            src={
              APP_URL +
              "/images/avatars/" +
              item.damage_rank?.avatar?.replace("_Side", "")
            }
          />
        </div>
        {item.damage_rank && item.damage_rank.level !== null ? (
          <div
            className="bg-black bg-opacity-60 text-white text-center w-full absolute bottom-0"
            style={{ fontSize: 10 }}
          >
            Lv.{item.damage_rank.level}
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};

const RenderFilter = ({ filter }: { filter: string[] }) => {
  return (
    <div className="mt-1 flex flex-wrap -mx-1">
      {filter.map((name, index) => (
        <div
          key={index}
          className={`text-sm m-1 bg-black
            bg-opacity-25 px-1 rounded-md border
            border-white border-opacity-20`}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

const RenderLeaderboard = ({ leaderboard, avatars, most_stars, me }: Props) => {
  return (
    <Fragment>
      <Title className="text-center text-xl mx-4">Leaderboard</Title>

      <div className="leaderboard mt-3 min-h-[200px]">
        <div className="head flex text-xs py-2 mb-2 bg-black bg-opacity-40">
          <div className="px-2 w-[7%]">Rank</div>
          <div className="px-2 w-[34%]">Profile</div>
          <div className="text-right px-2 w-[15%]">Single Strike</div>
          <div className="text-center px-2 w-[10%]">Battles</div>
          <div className="text-center px-2 w-[10%]">Wins</div>
          <div className="text-right px-2 w-[10%]">Floor</div>
          <div className="text-right px-2 w-[17%]">*Star Collected</div>
        </div>
        {leaderboard.map((item, index) => (
          <RenderList {...item} key={item.userId} rank={item?.rank} me={me} />
        ))}
      </div>
      <div className="flex justify-between text-xs mt-3">
        <div className="text-left">
          <ExclamationIcon className="w-3 h-3 inline-block text-yellow-400" />{" "}
          User with this symbol marked as user with registration v1.
        </div>
        <div className="text-right">*Star collected based on floor 9 to 12</div>
      </div>
      <RenderMostStar mostStars={most_stars} />
      <RenderMostUsedCharacter avatars={avatars} />
    </Fragment>
  );
};

export default AbyssLeaderboard;
