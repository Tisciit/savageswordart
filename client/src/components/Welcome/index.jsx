import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userTypes, setUserPlayer, setUserGM,  setUserUndefined, setUserIS } from "../../state/actions/userType";
import styled from "styled-components";
import { changerender } from "../../state/actions/render";


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

const Selection = (props) => {
    const options = useSelector((state) => state.game.players);

    const dispatch = useDispatch();

    return (
        <Screen>
            <h1>Who are you?</h1>
            {options.map((elt, id) => <button key={id} onClick={() => {
                dispatch(setUserIS(elt));
                dispatch(changerender("main"));
            }}>{elt.name}</button>)}
            {props.children}
        </Screen>
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
                            dispatch(setUserIS(null));
                            dispatch(changerender("main"));
                        }}>I am the GM</button>
                        <button onClick={() => {
                            dispatch(setUserPlayer())
                        }}>I am a Player</button>
                    </div>
                </Screen> : ""}
            {USER_TYPE.type === userTypes.Player ?
                <Selection> <button onClick={() => { dispatch(setUserUndefined()); }}>Back</button></Selection> : ""}
        </React.Fragment>
    )
}

export default Welcome;