import React from "react";
import { useSelector } from "react-redux";
import Healthbar from "./HealthBar";
import { userTypes } from "../../state/actions/userType";
import styled from "styled-components";

const Main = () => {

    const isGM = useSelector(state => state.userType.type) === userTypes.GM;

    const ownName = isGM ? "" : useSelector(state => state.userType.is.name);
    const players = useSelector(state => state.game.players);
    const self = players.find(elt => elt.name === ownName);
    const party = players.filter(elt => elt.name !== ownName);

    const renderSelf = () => {
        if (!isGM) {
            return (
                <Healthbar
                    name={self.name}
                    hpcurrent={self.Stats.HP.current}
                    hptotal={self.Stats.HP.total}
                    level={self.Stats.LVL}
                    showInfo="1"></Healthbar>
            );
        }
    }

    return (
        <Screen>
            <div>
                {renderSelf()}
                {party.map(elt => <Healthbar
                    name={elt.name}
                    hpcurrent={elt.Stats.HP.current}
                    hptotal={elt.Stats.HP.total}
                    level={elt.Stats.LVL}
                    showInfo={isGM ? "1" : "0"} />
                )}
            </div>
        </Screen>
    )
}

const Screen = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

`;

export default Main;