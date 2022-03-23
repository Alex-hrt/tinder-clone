import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";

const db = [
    {
      name: "Richard Hendricks",
      url: "https://preview.redd.it/d4n8b1mh5z611.png?auto=webp&s=fff0173805bb5203c1c2f56a507a4edccfd13b2a"
    },
    {
      name: "Erlich Bachman",
      url: "https://preview.redd.it/d4n8b1mh5z611.png?auto=webp&s=fff0173805bb5203c1c2f56a507a4edccfd13b2a"
    },
    {
      name: "Monica Hall",
      url: "https://preview.redd.it/d4n8b1mh5z611.png?auto=webp&s=fff0173805bb5203c1c2f56a507a4edccfd13b2a"
    },
    {
      name: "Jared Dunn",
      url: "https://preview.redd.it/d4n8b1mh5z611.png?auto=webp&s=fff0173805bb5203c1c2f56a507a4edccfd13b2a"
    },
    {
      name: "Dinesh Chugtai",
      url: "https://preview.redd.it/d4n8b1mh5z611.png?auto=webp&s=fff0173805bb5203c1c2f56a507a4edccfd13b2a"
    }
  ]

const Dashboard = () => {
    const characters = db
    const [lastDirection, setLastDirection] = useState()
  
    const swiped = (direction, nameToDelete) => {
      console.log("removing: " + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + " left the screen!")
    }

    return (
        <div className="dashboard">
            <ChatContainer />
            <div className="swipe-container">
                <div className="card-container">
                    {characters.map((character) =>
                        <TinderCard
                            className="swipe"
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
                        >
                            <div style={{ backgroundImage: "url(" + character.url + ")" }}
                                className="card"
                            >
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>


                </div>
            </div>
        </div>
    )
}
export default Dashboard