import React from "react";
import styled from "styled-components";

import yes from "../graphics/Yes.svg";
import yes_on from "../graphics/Yes_on.svg";
import no from "../graphics/No.svg";
import no_on from "../graphics/No_on.svg";


export const FooterOptions = {
    "None": "none",
    "YesNo": "yesno",
    "Ok": "ok"
}

//#region Styled Components and CSS Constants
const fontColor = "#4d4d4d";
const shadowAlpha = .75
const lgOutter = "#afafaf";
const lgCenter = "#d8d8d8";

const Container = styled.div`
    width: 15em;
    border-radius: .3em;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, ${shadowAlpha});
`
const Title = styled.div`
    color: ${fontColor};
    font-size: 1.5em;
    text-align: center;
    min-height: 1.5em;
    padding: .2em;
`;

const Body = styled.div`
    color: black;
    background: linear-gradient(0deg, ${lgOutter} 0%, ${lgCenter} 50%, ${lgOutter} 100%);
    min-height: 2em;
    padding: .3em;
    text-align:center;

    display:flex;
    justify-content: center;
    align-content:center;
`;

const Footer = styled.div`
    height: 2.5em;
    padding: .3em;
    display: flex;
    justify-content: space-around;
    
    button {
        width: 2.5em;
        height: 2.5em;
        border:none;
        background:none;

        background-repeat: no-repeat;
        background-position: center;
        background-size: 2.5em;
    }

    #yes {
        background-image: url(${yes});
    }

    #yes:hover {
        background-image: url(${yes_on});
    }
    
    #no {
        background-image: url(${no});
    }

    #no:hover {
        background-image: url(${no_on});
    }

`
//#endregion

const Message = (props) => {
    const { title, body, footerOption, handleYesOk, handleNo } = props;

    const getFooter = () => {
        switch (footerOption) {
            case FooterOptions.YesNo:
                return <Footer>
                    <button id="yes" onClick={handleYesOk}></button>
                    <button id="no" onClick={handleNo}></button>
                </Footer>;
            case FooterOptions.Ok:
                return <Footer>
                    <button id="ok" onClick={handleYesOk}>OK</button>
                </Footer>

            case FooterOptions.None:
            default:
                return <Footer></Footer>;
        }
    }
    
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <Body>{body}</Body>
            {getFooter()}
        </Container>
    );
}

export default Message;