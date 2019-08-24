import React from "react";
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
        height: 10rem;
        width: 10rem;
        border-radius: 10px;
        border: none;
        background: black;
        color: white;
    }
`;

const Selection = () => {
    
}

const Welcome = () => {

    return (
        <Screen className="Test">
            <h1>Welcome to SaveageSAO</h1>
            <div className="horiz">
                <button onClick={() => {
                    //setState GM
                }}>I am the GM</button>
                <button onClick={() => {
                    //setState Player ?
                }}>I am a Player</button>
            </div>
        </Screen>
    )
}

export default Welcome;