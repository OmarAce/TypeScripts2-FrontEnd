const Results = (props) => {
    
    let score = props.speed * (props.accuracy / 100) * 10

    let userSessionId = sessionStorage.getItem("userId")
    let userId = userSessionId.replace(/['"]+/g, '');

    console.log(userId)
    console.log(props.phase)
    console.log(props)
  
    async function postScore({ credentials }) {
        fetch("https://typescripts-server.herokuapp.com/highscores", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: userId, score})
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                console.log(data.message)
            })
        };

    if (props.phase === 'Ended' && userId) {
    postScore({userId, score})
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