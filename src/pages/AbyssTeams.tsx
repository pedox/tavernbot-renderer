import Footer from "components/Footer";
import React from "react";
import { APP_URL } from "utils/template";

type Props = {
  name: string;
  teams: any[];
  avatars: any[];
};
const AbyssTeams = ({ name, teams, avatars }: Props) => {
  const RenderAvatar = ({ id }) => {
    const avatar = avatars.find((m) => m.id === id);

    return (
      <div className="w-[68px] overflow-hidden">
        <img
          src={APP_URL + "/resources/avatars/" + avatar?.iconName + ".png"}
        />
      </div>
    );
  };

  return (
    <div className="bg-[#153857] w-[800px] relative text-white font-genshin flex flex-col">
      <div
        className="h-full absolute top-0 bg-no-repeat bg-contain bg-top left-0 w-full"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/UI_Tower_Bg2.png)`,
        }}
      />
      <div className="relative z-10 px-6 flex-1 w-full min-h-[500px] mb-6">
        <div className="flex pt-6">
          <div>
            <img
              src={APP_URL + "/resources/ui/UI_Icon_Tower_1.png"}
              style={{ height: "48px" }}
            />
          </div>
          <div className="flex-1 pl-3">
            <h1 className="text-xl">Spiral Abyss Summary</h1>
            <p>Popular Team Comps</p>
            <h2 className="text italic text-sm pt-1">{name}</h2>
          </div>
          <div className="text-right text-sm">
            <p className="mt-1"></p>
            <p className="mt-1"></p>
          </div>
        </div>

        <div className="mt-3 mb-8">
          {teams.map((item, index) => (
            <div key={index}>
              <div>Floor {item.floor}</div>
              <div>
                {item.chambers
                  .sort((a, b) => b.chamber - a.chamber)
                  .map((item, index) => (
                    <div key={index}>
                      <div>Chamber {item.chamber}</div>
                      <div className="flex">
                        {item.battles.map((item, index) => (
                          <div className="w-6/12" key={index}>
                            {item.teams
                              .sort((a, b) => b.count - a.count)
                              .slice(0, 3)
                              .map((item, index) => (
                                <div key={index}>
                                  <div className="flex">
                                    {item.avatar.map((item, index) => (
                                      <div key={index}>
                                        <RenderAvatar id={item} />
                                      </div>
                                    ))}
                                  </div>
                                  <div>Usage {item.count}</div>
                                </div>
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <Footer withInfo={false} />
      </div>
    </div>
  );
};
export default AbyssTeams;
