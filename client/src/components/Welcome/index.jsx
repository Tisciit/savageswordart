import React, { useState } from "react";
import styled from "styled-components";

const Screen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    button {
        margin: 1em;
        height: 8rem;
        width: 8rem;
        border-radius: 10px;
        border: none;
        background: black;
        color: white;
    }
`;

const Selection = (props) => {

    const {options} = props;

    return (
        <Screen>
            <h1>Who are you?</h1>
            {options.map(elt => <button>{elt}</button>)}
        </Screen>
    );
}

const Welcome = (props) => {

    const [type, setType] = useState("");
    const [chosenPlayer, setChosenPlayer] = useState(0);

    const options = props.options || ["Hallo","das","ist","ein","Test"]

    return (
        <React.Fragment>
            {type === "Player" && chosenPlayer === 0 ?
                <Selection options={options}>Hello</Selection> :
                <Screen className="Test">
                    <h1>Welcome to SaveageSAO, {type}</h1>
                    <div className="horiz">
                        <button onClick={() => {
                            setType("GM");
                        }}>I am the GM</button>
                        <button onClick={() => {
                            setType("Player");
                        }}>I am a Player</button>
                    </div>
                </Screen>}
        </React.Fragment>
    )
}

export default Welcome;