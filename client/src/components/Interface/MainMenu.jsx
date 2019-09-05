import React from "react";
import { MenuContainer, MenuResult } from "../UI";

//#region --- Graphic import
import icoMan from "../../graphics/Menu-1/Man.svg";
import icoMan_On from "../../graphics/Menu-1/Man_on.svg";
import icoMen from "../../graphics/Menu-1/Men.svg";
import icoMen_On from "../../graphics/Menu-1/Men_on.svg";
import icoConfig from "../../graphics/Menu-1/Config.svg";
import icoConfig_On from "../../graphics/Menu-1/Config_on.svg";

//Level 2

import icoItems from "../../graphics/Menu-2/Items.svg"
import icoItems_On from "../../graphics/Menu-2/Items_on.svg"
import icoSkills from "../../graphics/Menu-2/Skills.svg"
import icoSkills_On from "../../graphics/Menu-2/Skills_on.svg"
import icoEquipment from "../../graphics/Menu-2/Equipment.svg"
import icoEquipment_On from "../../graphics/Menu-2/Equipment_on.svg"


//#endregion

const menustructure = [
  {text: "lorem"},
  {text: "lorem"},
  {text: "lorem"},
  {text: "lorem"},
  {
    icon: icoMan,
    iconActive: icoMan_On,
    text: "",
    child: (
      <MenuContainer
        relativeToParent
        options={[
          {
            icon: icoItems,
            iconActive: icoItems_On,
            text: "Items",
            child: <MenuResult>Im the inventory now :)</MenuResult>
          },
          {
            icon: icoSkills,
            iconActive: icoSkills_On,
            text: "Skills",
            child: <MenuResult>Im the Skills now!</MenuResult>
          },
          {
            icon: icoEquipment,
            iconActive: icoEquipment_On,
            text: "Gear",
            child: <MenuResult>Im the Gear now!</MenuResult>
          }
        ]}
      />
    )
  },
  {
    icon: icoMen,
    iconActive: icoMen_On,
    text: "",
    child: <MenuContainer relativeToParent options={[{}]} />
  },
  {
    icon: icoConfig,
    iconActive: icoConfig_On,
    text: "",
    child: <MenuContainer relativeToParent options={[{}]} />
  }
];

export const MainMenu = () => <MenuContainer shown options={menustructure} />;
