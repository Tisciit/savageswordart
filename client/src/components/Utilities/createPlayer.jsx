import React, { useState } from "react";
import Container from "./Container";

const CreatePlayer = () => {

    const [name, setName] = useState("");
    const [level, setLevel] = useState(1);

    const addPlayer = (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            name,
            level
        });

        fetch("/api/createPlayer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
    }

    return (
        <Container>
            <span>Name: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /></span>
            <span>Level: <input type="number" value={level} onChange={(e) => { setLevel(e.target.value) }} /></span>
            <button type="submit" onClick={addPlayer}>Create</button>
        </Container>
    )
}

export default CreatePlayer;