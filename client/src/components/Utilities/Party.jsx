import React from "react";
import { useSelector } from "react-redux";
import Container from "./Container";

const Party = () => {

    const parties = useSelector(state => state.game.parties);
    const players = useSelector(state => state.game.players);

    console.log(parties);

    const getSelectedOptions = (select) => {
        const result = [];
        const options = select && select.options;
        let opt;

        for (let i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }

    return (
        <Container>
            {parties.map(elt => <p>{elt.id} / {elt.lead.name}</p>)}
            <p>TRENNER</p>
            <span>New Party</span>
            <select multiple>
                {players.map((elt, index) => {
                    return <option key={index} id="partyPlayerSelect" value={elt.id}>{elt.name}</option>
                })}
            </select>
            <button onClick={() => {
                const selected = getSelectedOptions(document.getElementsByTagName("select")[1]);
                const members = [];
                for (let id of selected) {
                    const id_ = parseInt(id, 10);
                    members.push(players.find(elt => elt.id === id_));
                }
                fetch("/api/createParty", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ players: members })
                });

            }}>Create new Party!</button>
        </Container>
    )
}

export default Party;