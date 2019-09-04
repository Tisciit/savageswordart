import React from "react";
import { useSelector } from "react-redux";
import { MainHPBar, PartyHPBar } from "./HPBars";
import styled from "styled-components";
import { AllPlayers, CreatePlayer, DamagePlayer, Party } from "../Utilities";
import { Menu } from "../UI";

const Main = () => {
  const type = useSelector(state => state.userType.type);

  const self = useSelector(state => state.game.self);
  const party = self.partyData || [];

  const options = [
    {
      text: "This",
      child: <Menu relative={true} hidden={true} options={[{text: "ho"},{text: "hi"}]} />
    },
    {
      text: "is",
      child: <Menu className="relative hidden" options={[{text: "swoo"},{text: "swaa"}]} />
    }
  ];

  return (
    <Screen>
      <div style={{ gridRow: "1/2", gridColumn: "1/2" }}>
        <MainHPBar
          height={"4rem"}
          name={self.name}
          hpcurrent={self.Stats.HP.current}
          hptotal={self.Stats.HP.total}
          level={self.Stats.LVL}
          showInfo="1"
        />
        {party.map(elt => {
          return (
            elt.id !== self.id && (
              <PartyHPBar
                height={"4rem"}
                key={elt.id}
                name={elt.name}
                percentage={elt.percentage}
              />
            )
          );
        })}
      </div>
      {type === 1 && (
        <div style={{ gridRow: "1/2", gridColumn: "2/3" }}>
          <CreatePlayer></CreatePlayer>
          <AllPlayers></AllPlayers>
          <DamagePlayer></DamagePlayer>
          <Party></Party>
        </div>
      )}
      <div style={{ gridRow: "2/3", gridColumn: "1/2" }}>
        <Menu options={options} />
      </div>
    </Screen>
  );
};

const Screen = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export default Main;
