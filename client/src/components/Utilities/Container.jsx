import React from "react";
import styled from "styled-components";

const Container = (props) => {

    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    background: lightsalmon;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Container;