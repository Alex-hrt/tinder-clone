import TinderCard from "react-tinder-card";
import { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie"

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

  const [ user, setUser ] = useState(null)
  const [ cookies, setCookie, removeCookie ] = useCookies(["user"])

  const userId = cookies.UserId
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userId }
      })
      setUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }
 
  useEffect(() => {
    getUser()
  }, [])

  console.log("user", user)



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
      <>
        {user &&
          <div className="dashboard">
            <ChatContainer user={user} />
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
        }
      </>
    )
}
export default Dashboard