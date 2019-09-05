import React, { useState } from "react";
import styled from "styled-components";

import Man from "../../graphics/SAO_Man.svg"
import Circle from "../../graphics/RingedCircle.svg";
import CircleOn from "../../graphics/RingedCircle_on.svg";

import CharacterStats from "./CharacterStats";

//#region Styled Components
//To control size of its child elements
const WindowContainer = styled.div`
    width: 250px;
    height: 400px;
    `;
const Window = styled.div`
    background: white;
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-content: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 9fr 4fr;
    `;
const Center = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    & > * {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    `;

const Circles = styled.div`
    width: 95%;
    height: 10%;
    display: grid;
    justify-items: center;
    align-content: center;
    grid-template-columns: 20px auto 20px;

    transform: translate(-50%, -50%) rotate(${props => props.rotation});

    & button {
        width: 20px;
        height: 20px;
        border: none;
        background: none;
        background-size: 20px 20px;
    }

    `;

const Name = styled.div`
    width: 90%;
    padding: .3em;
    text-align: center;
    `;

const Info = styled.div`
    
    background: #e3e3e3;

    & h4 {
        margin: 0;
    }
    & p {
        margin: 0;
        padding: 0;
        font-size: 1rem;
    }
`
//#endregion

const RadioPair = (props) => {
    const { rotation, bg } = props.config || 0;
    const { clickHandler, index } = props;

    return (
        <Circles rotation={rotation + "deg"}>
            <button onClick={() => clickHandler(index, 0)} style={{ backgroundImage: `url(${bg[0]})` }}></button>
            <div></div>
            <button onClick={() => clickHandler(index, 1)} style={{ backgroundImage: `url(${bg[1]})` }}></button>
        </Circles>
    );
}

const RadioCircle = (props) => {

    const { imgActive, imgInactive, rotations, onChange } = props;

    const childrenDefault = () => {
        const def = [];

        for (let rotation of rotations) {
            let obj = Object.assign({}, { rotation: rotation }, { bg: [imgInactive, imgInactive] });
            def.push(obj)
        }
        return def;
    }

    const [children, setChildren] = useState(childrenDefault());

    const toggleSelection = (index, elt) => {
        const t = [...children];

        //Store current state of elt to toggle;
        let curBG = t[index].bg[elt];

        //Set all Images Back to normal circle
        for (let t_ of t) {
            t_.bg = [imgInactive, imgInactive];
        }

        //Check which state for elt is correct
        curBG = curBG === imgInactive ? imgActive : imgInactive;
        //and set it
        t[index].bg[elt] = curBG;

        if (onChange) {
            const obj = {
                index: index + (t.length * elt),
                active: curBG === imgActive
            }
            onChange(obj);
        }

        setChildren(t);
    }

    return (
        <React.Fragment>
            {children.map((elt, index) => <RadioPair
                key={elt.rotation}
                config={elt}
                index={index}
                clickHandler={toggleSelection} />)}
        </React.Fragment>
    );
}

export const Main = (props) => {

    const {name} = props.player;

    return (
        <WindowContainer>
            <Window>
                <Name>{name}</Name>
                <Center>
                    <img style={{ height: 60 + "%" }} src={Man} alt="ManWoman"></img>
                    <RadioCircle
                        imgActive={CircleOn}
                        imgInactive={Circle}
                        rotations={[120, 150, 180, 210, 240, 270]}
                        onChange={(e) => { console.log(e) }} />
                </Center>
            </Window>
        </WindowContainer>
    )
}