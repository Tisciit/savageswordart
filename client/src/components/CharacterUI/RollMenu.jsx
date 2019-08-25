import React, { useState } from "react";
import styled from "styled-components";

// #region styled components

const Wrapper = styled.div`
    /*Used to define size etc.*/

    position: relative;
    width: 100px;
    height: 200px;
    overflow:hidden;
    
    ::before{
        content: " ";
        width: 100%;
        height: 2rem;
        position: absolute;
        top: 0;
        backdrop-filter: blur(1px);
        z-index: 1;
    }

    ::after {
        content: " ";
        width: 100%;
        height: 2rem;
        position: absolute;
        bottom: 0;
        backdrop-filter: blur(1px);
    }`

const Roll = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(0, ${props => props.translate * 52 * -1}px);
    transition: transform .5s ease-in-out;
    `;

const MenuPoint = styled.button`
        width: 50px;
        height: 50px;
        margin-top: .5rem;
        margin-bottom: .5rem;
        border: none;
        background-color: transparent;
        background-image: url(${props => props.img});
        background-size: contain;
        background-repeat: no-repeat;
    `;
// #endregion

const RollMenu = (props) => {
    const { options, onChange } = props;
    const [activeID, setActiveID] = useState(options[0].id);

    const handleChange = (e) => {
        setActiveID(e.target.id);
        if (onChange) {
            onChange(e.target.id);
        }
    }

    return (
        <Wrapper onKeyDown={(e) => {   
            switch (e.keyCode) {
                case 40:
                    setActiveID(activeID + 1 >= options.length ? activeID : activeID + 1);
                    
                    return;
                case 38:
                    setActiveID(activeID -1 < 0 ? activeID : activeID - 1);
                    return;
                default: return;
            }
        }}>
            <Roll
                translate={activeID - 1}>
                {options.map(option =>
                    <MenuPoint
                        key={option.id}
                        id={option.id}
                        img={activeID === option.id ? option.imgActive : option.imgInactive}
                        onClick={handleChange}
                    ></MenuPoint>
                )}
            </Roll>
        </Wrapper>
    );
}

export default RollMenu;