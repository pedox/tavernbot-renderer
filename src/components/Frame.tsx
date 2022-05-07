import clsx from "clsx";
import React from "react";
import { APP_URL } from "utils/template";

export const GIDarkFrame = ({
  className = "",
  children,
  minHeight = 450,
  width = 680,
}) => {
  return (
    <div
      className={clsx("relative", className)}
      style={{
        width,
        minHeight,
        backgroundImage: `url(${APP_URL}/images/UI_GeneralFrame_Paper3_BG.png)`,
      }}
    >
      <div
        className="absolute top-0 bottom-0 left-0 right-0"
        style={{
          border: `45px solid transparent`,
          borderImage: `url(${APP_URL}/resources/ui/UI_GeneralFrame_Paper3.png) 30 repeat`,
          borderImageSlice: 62,
        }}
      />
      <div
        className="absolute top-0 bg-center bg-no-repeat left-0 w-full h-full opacity-5"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/overlay-bg.png)`,
          backgroundSize: "60%",
        }}
      />
      <div className="p-8 relative z-10">{children}</div>
    </div>
  );
};

export const GIGlobalFrame = ({
  className = "",
  children,
  minHeight = 450,
  width = 680,
  type = "dark",
  withoutFrame = false,
}) => {
  const bgName = type === "dark" ? "Paper3" : "Paper2";
  return (
    <div
      className={clsx("relative", className, { "text-white": type === "dark" })}
      style={{ width, minHeight }}
    >
      <div
        className="absolute left-10 right-10 top-10 bottom-10"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/UI_GeneralFrame_${bgName}_BG.png)`,
        }}
      />

      <div
        className={clsx("absolute", {
          "top-5 bottom-5 left-5 right-5": !withoutFrame,
          "top-0 bottom-0 left-0 right-0": withoutFrame,
        })}
        style={{
          border: `45px solid transparent`,
          borderImage: `url(${APP_URL}/resources/ui/UI_GeneralFrame_${bgName}.png) 30 repeat`,
          borderImageSlice: 62,
        }}
      />

      {!withoutFrame && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0"
          style={{
            border: `45px solid transparent`,
            borderImage: `url(${APP_URL}/resources/ui/UI_GeneralFrame_EA.png) repeat`,
            borderImageSlice: 65,
          }}
        />
      )}

      <div
        className="absolute top-10 left-10 right-10 bottom-10 bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: `url(${APP_URL}/resources/ui/overlay-bg.png)`,
          backgroundSize: "60%",
        }}
      />
      <div
        className={clsx("relative min-h-full", {
          "p-9": withoutFrame,
          "p-14": !withoutFrame,
        })}
      >
        {children}
      </div>
    </div>
  );
};
export const GIBookFrame = ({
  className = "",
  minHeight = 450,
  width = 680,
  children,
}) => {
  return (
    <div className={clsx("relative", className)} style={{ width, minHeight }}>
      <div className="absolute w-full h-full">
        <div
          className="absolute w-10 bottom-14 top-10 left-0"
          style={{
            backgroundImage: `url("${APP_URL}/resources/ui/frame/book_l.png"`,
          }}
        />
        <div
          className="absolute w-10 top-10 bottom-14 right-0"
          style={{
            backgroundPosition: "right",
            backgroundImage: `url("${APP_URL}/resources/ui/frame/book_r.png"`,
          }}
        />
        <div
          className="absolute h-10 top-0 left-10 right-10"
          style={{
            backgroundImage: `url("${APP_URL}/resources/ui/frame/book_t.png"`,
          }}
        />
        <div
          className="absolute h-40 bottom-0 left-10 right-10"
          style={{
            backgroundPosition: "bottom",
            backgroundImage: `url("${APP_URL}/resources/ui/frame/book_b.png"`,
          }}
        />

        <img
          src={`${APP_URL}/resources/ui/frame/book_tl.png`}
          className="absolute top-0 left-0"
        />
        <img
          src={`${APP_URL}/resources/ui/frame/book_tr.png`}
          className="absolute top-0 right-0"
        />
        <img
          src={`${APP_URL}/resources/ui/frame/book_bl.png`}
          className="absolute bottom-0 left-0"
        />
        <img
          src={`${APP_URL}/resources/ui/frame/book_br.png`}
          className="absolute bottom-0 right-0"
        />

        <div className="papper-frame absolute top-6 left-6 right-6 bottom-14">
          <div
            className="fill-frame absolute top-10 left-10 right-10 bottom-10"
            style={{ backgroundColor: "#F2ECE6" }}
          ></div>
          <div
            className="absolute w-10 bottom-14 top-10 left-0"
            style={{
              backgroundImage: `url("${APP_URL}/resources/ui/frame/papper_l.png"`,
            }}
          />
          <div
            className="absolute w-10 top-10 bottom-10 right-0"
            style={{
              backgroundPosition: "right",
              backgroundImage: `url("${APP_URL}/resources/ui/frame/papper_r.png"`,
            }}
          />
          <div
            className="absolute h-10 top-0 left-10 right-10"
            style={{
              backgroundImage: `url("${APP_URL}/resources/ui/frame/papper_t.png"`,
            }}
          />
          <div
            className="absolute h-10 bottom-0 left-10 right-10"
            style={{
              backgroundPosition: "bottom",
              backgroundImage: `url("${APP_URL}/resources/ui/frame/papper_b.png"`,
            }}
          />

          <img
            src={`${APP_URL}/resources/ui/frame/papper_tl.png`}
            className="absolute top-0 left-0"
          />
          <img
            src={`${APP_URL}/resources/ui/frame/papper_tr.png`}
            className="absolute top-0 right-0"
          />
          <img
            src={`${APP_URL}/resources/ui/frame/papper_bl.png`}
            className="absolute bottom-0 left-0"
          />
          <img
            src={`${APP_URL}/resources/ui/frame/papper_br.png`}
            className="absolute bottom-0 right-0"
          />
        </div>
      </div>
      <div className="relative pt-9 px-11 min-h-full pb-20">{children}</div>
    </div>
  );
};
