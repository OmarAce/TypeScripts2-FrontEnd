const Results = (props) => {

    const score = props.speed * (props.accuracy / 100) * 10
    let userId = sessionStorage.getItem("userId")

    if (props.phase === 'Ended' && userId) {
        // Axios.post("https://typescripts-server.herokuapp.com/highscores", {
        //     score: score,
        // }).then((response) => {
        //     console.log(response, 'score posted')
        //     if (response.status === 200) {
        //     }
        // })

        fetch("https://typescripts-server.herokuapp.com/highscores", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "score": score })
        })
        .then((res) => res.json())
        .then(highscoredata => {
            console.log(highscoredata)
            console.log(highscoredata.message)
        })
    }
    return (
        <>
            <div className=" flex flex-col mt-12">

                <div className={`flex items-center ${props.speedClass} `}  >
                    <p className="text-2xl"> Score: </p>
                    <p className={`text-2xl `}> {Math.round(props.speed * (props.accuracy / 100) * 10)} </p>
                </div>

                <div className={`flex items-center ${props.accClass} `}>
                    <p className="text-2xl">Accuracy: </p>
                    <p className="text-2xl"> {props.accuracy} %</p>
                </div>
                <div className={`flex items-start ${props.speedClass} `}  >
                    <p className="text-2xl"> Raw: </p>
                    <p className={`text-2xl  `}> {props.speed}/{props.errors}
                        <p className={`text-sm`}> CPM/ERR </p>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Results