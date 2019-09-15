import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userTypes, setUserPlayer, setUserUndefined, setUserGM } from "../../state/actions/userType";
import styled from "styled-components";

import { uid } from "../../webSocket";
import { changerender } from "../../state/actions/render";
import { updateSelf, updatePlayers } from "../../state/actions/game";

const Selection = (props) => {
    const options = useSelector((state) => state.game.players);
    const dispatch = useDispatch();
    return (
        <Screen>
            <h1>Who are you?</h1>
            {options.map((elt, id) => <button key={id} onClick={() => {
                fetch("/api/assignSelf", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uid,
                        id: elt.id
                    })
                })
                    .then(data => data.json())
                    .then(player => {
                        dispatch(updateSelf(player));
                        dispatch(changerender("main"));
                    });
            }}>{elt.name}</button>)}
            {props.children}
        </Screen >
    );
}

const Welcome = (props) => {

    const dispatch = useDispatch();
    const USER_TYPE = useSelector(state => state.userType);

    return (
        <React.Fragment>
            {USER_TYPE.type === userTypes.Undefined ?
                <Screen>
                    <h1>Welcome to SaveageSwordArt!</h1>
                    <div className="horiz">
                        <button onClick={() => {
                            dispatch(setUserGM());
                            fetch("/api/assignGM", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ uid })
                            }).then(data => data.json()).then(players => {
                                dispatch(updateSelf(players[0]));
                                dispatch(updatePlayers(players));
                                dispatch(changerender("main"));
                            });
                        }}>I am the GM</button>
                        <button onClick={() => {
                            dispatch(setUserPlayer())
                        }}>I am a Player</button>
                        <button onClick={() => {
                            dispatch(changerender("setup"));
                        }}>Setup Game</button>
                    </div>
                </Screen> : ""}
            {USER_TYPE.type === userTypes.Player ?
                <Selection> <button onClick={() => { dispatch(setUserUndefined()); }}>Back</button></Selection> : ""}
        </React.Fragment>
    )
}

//#region --- styled components
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

//#endregion


export default Welcome;