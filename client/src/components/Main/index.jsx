import React from "react";
import { useSelector } from "react-redux";
import Healthbar from "./HealthBar";
import styled from "styled-components";
import CreatePlayer from "../Utilities/CreatePlayer";
import AllPlayers from "../Utilities/AllPlayers";
import DamagePlayer from "../Utilities/DamagePlayer";
import Party from "../Utilities/Party";

const Main = () => {

    const type = useSelector(state => state.userType.type);

    const self = useSelector(state => state.game.self);
    const party = self.partyData || [];

    return (
        <Screen>
            <div>
                <Healthbar
                    name={self.name}
                    hpcurrent={self.Stats.HP.current}
                    hptotal={self.Stats.HP.total}
                    level={self.Stats.LVL}
                    showInfo="1" />
                {party.map(elt => {

                    return elt.id !== self.id &&
                        <Healthbar
                            key={elt.id}
                            name={elt.name}
                            hpcurrent={elt.percentage}
                            hptotal="100"
                            showInfo="0" />
                }
                )}
            </div>
            {type === 1 &&
                <div>
                    <CreatePlayer></CreatePlayer>
                    <AllPlayers></AllPlayers>
                    <DamagePlayer></DamagePlayer>
                    <Party></Party>
                </div>
            }
        </Screen>
    )
}

const Screen = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

`;

export default Main;