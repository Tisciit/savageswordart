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
    background: darkgray;
    margin: 1rem 0;
    padding: .2rem;

    display: flex;
    flex-direction: column;
`;

export default Container;