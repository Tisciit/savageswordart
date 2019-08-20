import React from "react";
import styled from "styled-components";

import Entity from "../../classes/Entity";

const CharacterStats = (props) => {

    const {name} = props.player;
    const {HP, EN, STR, AGI, EVA, CARRY, LVL} = props.player.Stats;

    return(
        <div>
            <h2>{name} LV {LVL}</h2>
            <p>HP: {HP.current} / {HP.total}</p>
            <p>EN: {EN.current} / {EN.total}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
                <p>Attribute</p>
                <p>Total</p>
                <p>Base</p>
                <p>Mod</p>

                <p>STR</p>
                <p>{STR.total}</p>
                <p>{STR.base}</p>
                <p>{STR.total - STR.base}</p>
                <p>AGI</p>
                <p>{AGI.total}</p>
                <p>{AGI.base}</p>
                <p>{AGI.total - AGI.base}</p>
                <p>EVA</p>
                <p>{EVA.total}</p>
                <p>{EVA.base}</p>
                <p>{EVA.total - EVA.base}</p>
                <p>CARRY</p>
                <p>{CARRY.total}</p>
                <p>{CARRY.base}</p>
                <p>{CARRY.total - CARRY.base}</p>
            </div>
        </div>
    );
}

export default CharacterStats;