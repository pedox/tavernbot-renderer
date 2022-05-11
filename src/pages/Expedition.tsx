import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import React from "react";
import { APP_URL } from "utils/template";

export type IExpedition = {
  avatar_side_icon: string;
  status: "Ongoing" | "Finished";
  remained_time: string;
};

type Props = {
  expeditions: IExpedition[];
};

const Expedition = ({ expeditions }: Props) => {
  const RenderAvatar = ({ index }) => {
    const item = expeditions[index];

    if (!item) {
      return (
        <div className="w-14 h-14 bg-black bg-opacity-25 rounded-full overflow-hidden" />
      );
    }

    const avatarMatch = item.avatar_side_icon.match(/\/([\w\d_-]+\.png)$/);
    const avatar = avatarMatch[1].replace("_Side", "");

    const remaining = parseInt(item.remained_time);

    return (
      <div className="relative">
        <div className="w-14 h-14 bg-black bg-opacity-25 rounded-full overflow-hidden">
          <img src={APP_URL + "/images/avatars/" + avatar} />
        </div>
        <div className="absolute w-5 right-0 bottom-0 bg-black rounded-full">
          {remaining === 0 ? (
            <img src={APP_URL + "/resources/ui/UI_Img_Completed.png"} />
          ) : (
            <img src={APP_URL + "/resources/ui/UI_IconSmall_Time.png"} />
          )}
        </div>
      </div>
    );
  };

  return (
    <GIGlobalFrame width={500} withoutFrame minHeight={320}>
      <div className="h-[280px] flex flex-col justify-center">
        <div className="flex items-center justify-center mb-2 -mt-8">
          <img
            src={APP_URL + "/resources/ui/UI_NPCTopIcon_Adventurers.png"}
            className="w-10"
          />
          <h1 className="text-lg text-center ml-2">Expedition Progress</h1>
        </div>
        <div className="flex justify-center">
          {[...new Array(5)].map((_, index) => (
            <div key={index} className="p-1">
              <RenderAvatar index={index} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </GIGlobalFrame>
  );
};

export default Expedition;
