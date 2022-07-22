import React, { useState } from 'react'

import Table from '../components/table'
import Navbar from '../components/navigation'

const HighScore = () => {

    const [highscores, setHighscores] = useState([])

    const getScores = () => {
        fetch("https://typescripts-server.herokuapp.com/api/highscores")
            .then((response) => response.json())
            .then(data => {
                let scores = data
                return scores
            }).then(scores => {
                setHighscores(scores)
            })
    }

    React.useEffect(() => getScores(), []);

    const column = [
        { heading: 'Username', value: 'User.username' },
        { heading: 'Score', value: 'score' },
    ]


    return (
        <>
            <Navbar />
            <div className="App">
                <Table data={highscores} column={column} />

            </div>
        </>
    )
}

export default HighScore