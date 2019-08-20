import React from "react";
import styled from "styled-components";


const QuestContainer = styled.ol`

    `;

const Item = styled.li`
    
    `;

const 

const Quest = (props) => {
    const { quest } = props;

    return(
        <QuestContainer>
            {quest.map( elt => {
                return <Item status={elt.status}>{elt.p}</Item>
            })}
        </QuestContainer>
    )
}

export default Quest;