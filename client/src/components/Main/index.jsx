import React from "react";
import { useSelector } from "react-redux";
import Healthbar from "./HealthBar";
import { userTypes } from "../../state/actions/userType";
import styled from "styled-components";
import CreatePlayer from "../Utilities/createPlayer";

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

    const renderGM = () => {
        if (isGM) {
            return (
                <React.Fragment>
                    <CreatePlayer />
                </React.Fragment>
            )
        }
    }

    return (
        <Screen>
            <div>
                {renderSelf()}
                {party.map((elt, index) => <Healthbar
                    key={index}
                    name={elt.name}
                    hpcurrent={elt.Stats.HP.current}
                    hptotal={elt.Stats.HP.total}
                    level={elt.Stats.LVL}
                    showInfo={isGM ? "1" : "0"} />
                )}
            </div>
            <div>
                {renderGM()}
            </div>
        </Screen>
    )
}

const Screen = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

`;

export default Main;