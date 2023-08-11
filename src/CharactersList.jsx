/* eslint-disable react/prop-types */
import { useState } from 'react';

const CharacterList = ({ characters }) => {
    const [expandedCharacterId, setExpandedCharacterId] = useState(null);

    const handleCharacterClick = (characterId) => {
        expandedCharacterId === characterId ? setExpandedCharacterId(null) : setExpandedCharacterId(characterId)
    };

    return (
        <div>
            <ul style={ulStyles}>
                {characters.map(character => (
                    <li key={character.id}>
                        <button onClick={() => handleCharacterClick(character.id)}>
                            {character.name}
                        </button>
                        {expandedCharacterId === character.id && (
                            <div style={ulStyles}>
                                <img
                                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                    alt={character.name}
                                    style={imageStyles}
                                />
                                <strong>Series en las que ha participado:</strong>
                                <ul>
                                    {character.series.items.map((series, index) => (
                                        <li key={index}>{series.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ulStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10
};

const imageStyles = {
    width: '150px',
    height: '150px',
    margin: 'auto',
    borderRadius: '15px',
    textAlign: 'center'
};

export default CharacterList;
