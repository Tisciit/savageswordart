import React from "react";
import styled from "styled-components";

const Definitions = props => {
  const { percentage } = props;

  return (
    <defs>
      {props.children}

      <rect id="fillBar" x="100" y="8" height="30" width={percentage * 5} />

      <linearGradient id="background">
        <stop offset="30%" stopColor="rgba(134,134,134,100)" />
        <stop offset="70%" stopColor="rgba(193,193,193,30)" />
      </linearGradient>

      <linearGradient id="hpGreen">
        <stop offset="5%" stopColor="#21914c" />
        <stop offset="95%" stopColor="#3fd968" />
      </linearGradient>

      <linearGradient id="hpYellow">
        <stop offset="5%" stopColor="#d5eb5b" />
        <stop offset="95%" stopColor="#d1f024" />
      </linearGradient>

      <linearGradient id="hpRed">
        <stop offset="5%" stopColor="#db233c" />
        <stop offset="95%" stopColor="#de6a7a" />
      </linearGradient>

      <linearGradient id="hpHeal">
        <stop offset="30%" stopColor="#4989ed" />
        <stop offset="80%" stopColor="#5b6eb0" />
      </linearGradient>

      <linearGradient id="hpDamage">
        <stop offset="30%" stopColor="#810005" />
        <stop offset="80%" stopColor="#fb2f2f" />
      </linearGradient>
    </defs>
  );
};

const Graphic = styled.svg`
  .bar_red {
    transition: width 1.5s ease-in-out;
  }
  .bar_blu {
    transition: width 0.5s ease-in-out;
  }
  .bar_cur {
    transition: width 1s ease-in-out;
  }
`;

export const MainHPBar = props => {
  
  const { name, showInfo, height } = props.player;
  const { current, total } = props.player.Stats.HP;
  const level  = props.player.Stats.LVL;

  //Put to more speaking variables
  const hpcurrent = current;
  const hptotal = total;

  const percentage = (hpcurrent / hptotal) * 100;

  return (
    <Graphic
      version="1.1"
      baseProfile="full"
      viewBox="0 0 510 45"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "Import" definitions for this SVG and pass percentage so Bars are rendered in correct length */}
      <Definitions percentage={percentage}>
        <path id="mask" d="M 100 8 h 400 l -7 14 h -170 l -5 10 h -218 Z" />

        <clipPath id="fillLevel">
          <use href="#mask" />
        </clipPath>
      </Definitions>

      <path d="M 22 0 h 487 l -20 40 h -467 Z" fill="url(#background)" />

      {/* Status Thing */}
      <path
        d="M 0 0 h 20 v 40 h -20 v -8 h 8 q 5 0, 5 -5 v -14 q 0 -5, -5 -5 h -8 Z"
        fill="gray"
      />

      {/* Name */}
      <text x="25" y="28" fontSize="1.2rem">
        {name}
      </text>

      {/* HP Bars for Damage, Heal, Current */}
      <g clipPath="url(#fillLevel)">
        <g transform="skewX(-26.5650511771)">
          <rect
            className="bar_red"
            x="100"
            y="8"
            height="30"
            width={percentage * 4}
            fill="url(#hpDamage)"
          />
          <rect
            className="bar_blu"
            x="100"
            y="8"
            height="30"
            width={percentage * 4}
            fill="url(#hpHeal)"
          />
          <rect
            className="bar_cur"
            x="100"
            y="8"
            height="30"
            width={percentage * 4}
            fill={
              percentage < 20
                ? "url(#hpRed)"
                : percentage < 60
                  ? "url(#hpYellow)"
                  : "url(#hpGreen)"
            }
          />
        </g>
      </g>

      {/* Borders for the HP Bar */}
      <use
        href="#mask"
        strokeWidth="4"
        stroke="black"
        fill="transparent"
        clipPath="url(#fillLevel)"
      />
      <use
        href="#mask"
        strokeWidth="2"
        stroke="white"
        fill="transparent"
        clipPath="url(#fillLevel)"
      />

      {/* Info Bubbles */}
      <g display={showInfo ? "inherit" : "none"}>
        <g>
          <path
            d="M 330 30 v 10 q 0 5 5 5 h90 q 5 0 5 -5 v-10 q 0 -5 -5 -5 h-90 q -5 0 -5 5 Z"
            fill="gray"
          />
          <text x="380" y="42" textAnchor="middle">
            {hpcurrent} / {hptotal}
          </text>
        </g>

        <g>
          <path
            d="M 435 30 v 10 q 0 5 5 5 h 40 q 5 0 5 -5 v -10 q 0 -5 -5 -5 h -40 q -5 0 -5 5 Z"
            fill="gray"
          />
          <text x="460" y="42" textAnchor="middle">
            LV: {level}
          </text>
        </g>
      </g>
    </Graphic>
  );
};

export const PartyHPBar = props => {
  const { name, percentage, height } = props;

  return (
    <Graphic
      version="1.1"
      baseProfile="full"
      viewBox="0 0 310 45"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Import Definitions */}
      <Definitions percentage={percentage}>
        <path id="partyMask" d="M 100 8 h 200 l -12 24 h -188 Z" />

        <clipPath id="partyFillLevel">
          <use href="#partyMask" />
        </clipPath>
      </Definitions>
      <path d="M 22 0 h 288 l -20 40 h -268 Z" fill="url(#background)" />

      {/* Status Thing */}
      <path
        d="M 0 0 h 20 v 40 h -20 v -8 h 8 q 5 0, 5 -5 v -14 q 0 -5, -5 -5 h -8 Z"
        fill="gray"
      />

      {/* Name */}
      <text x="25" y="28" fontSize="1.1rem">
        {name}
      </text>

      {/* HP Bars for Damage, Heal, Current */}
      <g clipPath="url(#partyFillLevel)">
        <g transform="skewX(-26.5650511771)">
          <rect
            className="bar_red"
            x="100"
            y="8"
            height="30"
            width={percentage * 2}
            fill="url(#hpDamage)"
          />
          <rect
            className="bar_blu"
            x="100"
            y="8"
            height="30"
            width={percentage * 2}
            fill="url(#hpHeal)"
          />
          <rect
            className="bar_cur"
            x="100"
            y="8"
            height="30"
            width={percentage * 2}
            fill={
              percentage < 20
                ? "url(#hpRed)"
                : percentage < 60
                  ? "url(#hpYellow)"
                  : "url(#hpGreen)"
            }
          />
        </g>
      </g>

      {/* Borders for the HP Bar */}
      <use
        href="#partyMask"
        strokeWidth="4"
        stroke="black"
        fill="transparent"
        clipPath="url(#partyFillLevel)"
      />
      <use
        href="#partyMask"
        strokeWidth="2"
        stroke="white"
        fill="transparent"
        clipPath="url(#partyFillLevel)"
      />
    </Graphic>
  );
};
