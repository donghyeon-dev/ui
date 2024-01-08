import React, {useState, useEffect} from 'react';
import './index.css';
import axios from "axios";

function App() {
    const [characterName, setCharacterName] = useState("");
    const [characterData, setCharacterData] =
        useState({
            worldName: "",
            characterClass: "",
            characterClassLevel: "",
            characterLevel: 0,
            characterGuildName: "",
            characterImage: "",
            combatPower: "",
            characterPopularity: "",
            stats:
                [

                ],
            // ... Add other data as needed
        });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // This is where you would fetch data from the server when the component mounts
    }, []);

    const fetchCharacterData = async () => {
        if(characterName === "") {
            console.log("Character Name is empty");
            return;

        }
        setLoading(true);
        axios.get("http://localhost:8080/character/overview?characterName="+ characterName)
            .then((response) => {
                console.log("Then Response :" + response);
                const data = response.data;
                characterData.characterLevel = data.characterBasic.characterLevel;
                characterData.worldName = data.characterBasic.worldName;
                characterData.characterClass = data.characterBasic.characterClass;
                characterData.characterClassLevel = data.characterBasic.characterClassLevel;
                characterData.characterGuildName = data.characterBasic.characterGuildName;
                characterData.characterImage = data.characterBasic.characterImage;
                characterData.combatPower = data.characterBasic.combatPower;
                characterData.characterPopularity = data.characterBasic.characterPopularity;
                characterData.stats = data.characterStat.finalStat;
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error : " + error);
                setLoading(false);
            })
        ;

    }


    return (
        <div className="bg-[#55415f] min-h-screen flex justify-center items-center">
            <div className="max-w-sm">
                <div className="flex justify-center mt-4 space-x-2">
                    <input
                        type="text"
                        value={characterData.characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        placeholder="Character Name"
                        className="py-2 px-4 rounded border-2 border-[#d77355] focus:outline-none focus:border-[#b56248]"
                    />
                    <button
                        onClick={fetchCharacterData}
                        className="bg-[#d77355] text-white py-2 px-4 rounded hover:bg-[#b56248]"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Fetch Stats'}
                    </button>
                </div>
                <div className="bg-[#646964] p-5 rounded-t-lg shadow-lg">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-[#d77355] font-bold">CHARACTER INFO</p>
                            <p className="text-white text-sm">Lv. {characterData.characterLevel}</p>
                            <p className="text-white font-bold text-xl">{characterName}</p>
                            <p className="text-white text-sm">{characterData.characterClass}</p>
                            <p className="text-white text-sm">{characterData.worldName}</p>
                        </div>
                        <img src={characterData.characterImage} alt="https://placehold.co/250x250" className="square-full"/>
                    </div>
                    <div className="flex justify-around my-3">
                        <button className="bg-[#d77355] text-white py-1 px-3 rounded">DETAIL</button>
                        <button className="bg-[#647c64] text-white py-1 px-3 rounded">STAT</button>
                    </div>
                    <div className="bg-[#d6d4e0] p-2">
                        <div className="bg-white p-3 rounded">
                            <p className="text-[#646964] text-sm">전투력</p>
                            <p className="text-[#55415f] text-3xl font-bold">{characterData.combatPower}</p>
                            {characterData.stats.map((stat) => (
                                <div key={stat.label} className="flex justify-between my-2">
                                    <span className="text-[#646964]">{stat.statName}</span>
                                    <span className="text-[#55415f]">{stat.statValue}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-[#d6d4e0] p-5 rounded-b-lg shadow-lg">
                    <div className="bg-white p-3 rounded">
                        {/* Repeat for other character info sections */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;