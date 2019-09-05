import React from "react";
import { MenuContainer, MenuResult } from "../UI";

import Man from "../../graphics/Man.svg";

const menustructure = [
  {
    icon: Man,
    text: "",
    child: (
      <MenuContainer
        relativeToParent
        options={[
          {
            icon: Man,
            text: "Items",
            child: <MenuResult>Im the inventory now :)</MenuResult>
          },
          {
            icon: Man,
            text: "Skills",
            child: <MenuResult>Im the Skills now!</MenuResult>
          },
          {
            icon: Man,
            text: "Gear",
            child: <MenuResult>Im the Gear now!</MenuResult>
          }
        ]}
      />
    )
  },
  {
    icon: "Party",
    text: "Party",
    child: <MenuContainer relativeToParent options={[{}]} />
  },
  {
    icon: "Messages",
    text: "Messages",
    child: <MenuContainer relativeToParent options={[{}]} />
  }
];

export const MainMenu = () => <MenuContainer shown options={menustructure} />;
