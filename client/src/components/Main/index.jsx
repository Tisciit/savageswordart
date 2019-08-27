import React from "react";
import { useSelector } from "react-redux";
import Healthbar from "./HealthBar";
import styled from "styled-components";
import CreatePlayer from "../Utilities/CreatePlayer";

const Main = () => {

    const self = useSelector(state => state.game.self);
    const party = self.party || [];

    return (
        <Screen>
            <div>
                <Healthbar
                    name={self.name}
                    hpcurrent={self.Stats.HP.current}
                    hptotal={self.Stats.HP.total}
                    level={self.Stats.LVL}
                    showInfo="1" />
                {party.map((elt, index) => <Healthbar
                    key={index}
                    name={elt.name}
                    hpcurrent={elt.percentage}
                    hptotal="100"
                    showInfo="0" />
                )}
            </div>
            <CreatePlayer></CreatePlayer>
        </Screen>
    )
}

const Screen = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

`;

export default Main;