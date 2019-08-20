import React, {
  useState
} from 'react';
import HealthBars from './HealthBars'
import "../App.css"
import CharacterStats from './CharacterUI/CharacterStats';
import RollMenu from './CharacterUI/RollMenu';
import imgLocation from '../graphics/Location.svg';
import imgLocationOn from '../graphics/Location_on.svg';
import imgMan from '../graphics/Man.svg';
import imgManOn from '../graphics/Man_on.svg';

const App = () => {

  const [players, setPlayers] = useState([]);

  const bars = players.map(elt => {
    return {
    "name": elt.name,
    "hptotal": elt.Stats.HP.total,
    "hpcurrent": elt.Stats.HP.current,
    "level": elt.Stats.LVL
    }
  });

  const dmgHl = () => {
    const pl = [...players];
    const random = Math.floor(Math.random() * pl.length);
    const dmg = Math.floor(Math.random() * 200);
    pl[random].dealDamage(dmg);
    setPlayers(pl);
  }

  const roll01 = [
    {
      id: 0,
      imgActive: imgLocationOn,
      imgInactive: imgLocation
    },
    {
      id: 1,
      imgActive: imgManOn,
      imgInactive: imgMan
    },
    {
      id: 2,
      imgActive: imgManOn,
      imgInactive: imgMan
    },
    {
      id: 3,
      imgActive: imgLocationOn,
      imgInactive: imgLocation
    },
  ]

  return (
    <div className="App" >
      <HealthBars Bars={bars}> </HealthBars>
      <RollMenu options={roll01} onChange={(e) => {console.log(e)}}></RollMenu>
      <button onClick={dmgHl}>Damage or Heal anyone</button>
      {players.length > 0 ? <CharacterStats player={players[0]}></CharacterStats> : "" } 
    </div>
  );
}

export default App;