import React from "react";

type Props = {
  withInfo?: boolean;
  gameId?: string;
  nickname?: string;
  level?: number;
};

const Footer = ({
  withInfo = true,
  gameId = "",
  nickname = "",
  level = 0,
}: Props) => {
  return (
    <div className="footer">
      {withInfo && (
        <p className="text-xs mb-3 opacity-75">
          *The data displayed is for reference only. See in-game for the most
          accurate information.
        </p>
      )}
      <div className="flex">
        <div className="flex-1">
          <h1>TavernBot</h1>
          <p className="text-sm mt-0.5 opacity-60">https://s.id/tavernbot</p>
        </div>
        <div className="text-right flex flex-col justify-end">
          {nickname && (
            <p>
              {nickname} - AR{level}
            </p>
          )}
          {gameId && <p>{gameId}</p>}
        </div>
      </div>
    </div>
  );
};

export default Footer;
