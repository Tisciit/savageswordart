import React from 'react';
import Healthbar from './HealthBar';

const Healthbars = (props) => {
    const {Bars} = props;

    
    return(
        <div>
            {Bars.map(elt => <Healthbar name={elt.name} hpcurrent={elt.hpcurrent} hptotal={elt.hptotal} level={elt.level}></Healthbar>)}
        </div>
    )
}

export default Healthbars;