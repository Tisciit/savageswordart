import React from "react";
import styled from "styled-components";

export const Menu = props => {
  const { options } = props;

  console.log(options);

  return (
    <UL>
      {options.map((elt, index) => (
        <li key={index}>
          <span
            onClick={() => {
              elt.child.classList.toggle("visible");
            }}
          >
            {elt.text}
          </span>
          {elt.child}
        </li>
      ))}
    </UL>
  );
};

const UL = styled.ul`
  position: absolute;
  list-style-type: none;
  background: whitesmoke;
  padding: 0;
  margin: 0;
  width: 100px;

  li {
    padding: 0 0.3rem;
    height: 3rem;
    display: grid;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }

  li:nth-child(2) {
    background: gray;
  }
`;
