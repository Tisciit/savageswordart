import React from "react";
import styled from "styled-components";


//#region Styled components

const font_base = 1.4;

const col_font = "black";
const col_damage = "#b12e41"
const col_heal = "#4d94ff"
const col_bg = "#ddd6d6";

const red = "linear-gradient(120deg, rgba(122,4,23,1) 0%, rgba(226,12,45,1) 100%)"
const yellow = "linear-gradient(120deg, rgba(223,156,91,1) 0%, rgba(239,232,20,1) 100%)"
const green = "linear-gradient(120deg, rgba(80,194,108,1) 0%, rgba(60,240,105,1) 100%)"


const Wrapper = styled.div`
    position: relative;
    display: grid;
    width: 20rem;
    max-width: 80%;
    padding: .2em;
    background: linear-gradient(180deg, rgba(221,214,214,1) 0%, rgba(221,214,214,1) 65%, rgba(221,214,214,0) 65%);

    transform-origin: left bottom;
    transform: skewX(-20deg);

    ::before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        height: 60%;
        width: 20%;
        background: ${col_bg};

        transform-origin: left bottom;
        transform: skewX(20deg);
    }

    `;

const Grid = styled.div`
    transform: skewX(20deg);
    font-size: 1rem;
    color: ${col_font};
    position: relative;
    display: grid;
    grid-template-columns: 1fr 2fr 4fr 1fr 3fr .5fr;
    grid-template-rows: auto;
    grid-template-areas: 
        "status name hp hp hp ."
        ". . . . info info";
    `;

const Name = styled.div`
    padding-right: ${font_base / 2}rem;
    font-size: ${font_base}rem;
    grid-area: name;
    `;

const Bars = styled.div`
    grid-area: hp;
    position: relative;
    border: 1px solid white;
    background: black;
    box-shadow: inset 0 0 1px black;
    padding: 1px;

    ::before{
        //Thingy making the bar smaller
        content: " ";
        position: absolute;
        z-index: 3;
        right: -1px;
        bottom: -1px;
        width: 40%;
        height: 50%;
        border-top: 1px solid white;
        border-left: 1px solid white;
        box-shadow: -1px -1px 0 0 black;
        transform-origin: right bottom;
        transform: skewX(-20deg);
        background: ${col_bg};
    }

    ::after  {
        //thingy making the bar pointy
        content: " ";
        position: absolute;
        z-index: 1;
        left: 95%;
        right: -7px;
        border-top: 1px solid white;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
        top: -1px;
        height: 50%;
        transform-origin: right bottom;
        transform: skewX(-20deg);
        background: black;
    }
    `;

const HPBar = styled.div`
    position: absolute;
    z-index: 2;
    top: 1px;
    left: 5px;
    bottom: 1px;
    transition: width 1s, background-color 1s;
    transform: skewX(-20deg);

    :before {
        //Place front thingy here
        position: absolute;
        top: 0;
        left: 0px;
        content: "";
        height: 100%;
        width: 100%;
        background: inherit;
        transform-origin: left bottom;
        transform: skewX(20deg);
    }
    `;

const DamageBar = styled(HPBar)`
    background: ${col_damage};
    transition: width 2s;
    `;

const HealBar = styled(HPBar)`
    background: ${col_heal};
    transition: width .5s;
    `;

const InfoContainer = styled.div`
    z-index: 3;
    grid-area: info;
    display: grid;
    transform: translateY(-20%);
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "hpinfo hpinfo lvl";
    `;

const HPInfo = styled.div`
    /* TODO: Flex and flex-shrink ? Text wraps when too long */
    grid-area: hpinfo;
    text-align: center;
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
    background: gray;
    margin-right: .1em;
    
    `;

const LVLInfo = styled.div`
    grid-area: lvl;
    text-align:center;
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
    background: gray;
    `
//#endregion

const Healthbar = (props) => {

    const { name, hpcurrent, hptotal, level, showInfo } = props;

    const percentage = hpcurrent / hptotal * 100;
    const barColor = percentage < 30 ? red : percentage < 50 ? yellow : green;

    const withInfo = () => {
        console.log(showInfo);
        if (showInfo === "1") {
            return (
                <InfoContainer>
                    <HPInfo>{hpcurrent} / {hptotal}</HPInfo>
                    <LVLInfo>LV: {level}</LVLInfo>
                </InfoContainer>
            )
        }
    }
    return (
        <Wrapper>
            <Grid>
                <Name>{name}</Name>
                <Bars>
                    <DamageBar style={{ width: percentage + "%" }} />
                    <HealBar style={{ width: percentage + "%" }} />
                    <HPBar style={{ width: percentage + "%", background: barColor }} />
                </Bars>
                {withInfo()}
            </Grid>
        </Wrapper>
    )
}

export default Healthbar;