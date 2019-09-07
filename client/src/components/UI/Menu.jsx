import React, { useState } from "react";
import styled from "styled-components";

export const MenuContainer = props => {
  const { options, relativeToParent, transparent } = props;

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Wrapper relative={relativeToParent}>
      <Container transparent={transparent}>
        {options.map((elt, index) => {
          const active = selectedIndex === index;
          return (
            <MenuItem
              key={index}
              icon={active ? elt.iconActive : elt.icon}
              text={elt.text}
              click={() => {
                setSelectedIndex(active ? -1 : index);
                /*
                Add animation here for scrolling if needed
               */
              }}
            >
              {active && elt.child}
            </MenuItem>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export const MenuItem = props => {
  const { icon, text, click, highlight } = props;

  return (
    <Item highlight={highlight}>
      <span onClick={click}>
        <img src={icon} /> {text}
      </span>
      {props.children}
    </Item>
  );
};

const Wrapper = styled.div`
  position: ${props => (props.relative ? "absolute" : "relative")};
  top: 0;
  left: ${props => (props.relative ? "115%" : "0")};
  display: inline-block;
`;

const Container = styled.ul`
  list-style-type: none;
  background: ${props => (props.transparent ? "transparent" : "gray")};
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 9em;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Item = styled.li`
  padding: 0 .3em;
  height: 3em;
  display: grid;
  align-content: center;
  align-items: center;
  cursor: pointer;

  & span {
    display: inline-flex;
    align-items: center;
    align-content: space-between;
  }

  & span img {
    height: 2em;
  }
`;

//The last option in this should be this
export const Result = styled.div`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 110%;
`;
