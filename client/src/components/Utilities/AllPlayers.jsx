import React from "react";
import {useSelector} from "react-redux";
import Container from "./Container";

const AllPlayers = () => {

    const players = useSelector(state => state.game.players);
    console.log(players);

    return(
        <Container>
            {players.map(elt => {
                return <div key={elt.id}>{elt.name} || {elt.Stats.LVL}</div>
            })}
        </Container>
    )
}

export default AllPlayers;