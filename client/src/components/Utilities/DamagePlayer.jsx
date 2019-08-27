import React, { useState } from "react";
import { useSelector } from "react-redux";
import Container from "./Container";

const DamagePlayer = () => {

    const players = useSelector(state => state.game.players);
    const [selected, setSelected] = useState(players[0].id);
    const [value, setValue] = useState(0);

    const submit = () => {
        console.log(selected, value);

        fetch("/api/hp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: selected,
              value  
            })
        });
    }

    return (
        <Container>
            <span> Player <select value={selected} onChange={(e) => {
                setSelected(e.target.value);
            }}>{players.map((elt, id) => <option key={id} value={elt.id}>{elt.name}</option>)}</select></span>
            <span> Value <input type="number" value={value} onChange={(e) => {
                setValue(e.target.value);
            }
            } /></span>
            <button onClick={submit}>Dew it</button>
        </Container>
    )
}

export default DamagePlayer;