import Avatar, { IAvatar } from "components/Avatar";
import Footer from "components/Footer";
import { GIGlobalFrame } from "components/Frame";
import Title from "components/Title";
import React from "react";

type Props = {
  avatars: IAvatar[];
};

const AvatarLists = ({ avatars }: Props) => {
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
            {avatars.map((item, index) => (
              <Avatar key={index} {...item} />
            ))}
          </div>
        </div>
        <Footer uid="808830458" nickname="Wakazuhacau" />
      </GIGlobalFrame>
    </div>
  );
};

export default AvatarLists;
