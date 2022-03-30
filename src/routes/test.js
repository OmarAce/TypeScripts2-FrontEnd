import React, { useEffect, useState, useRef } from 'react'
import randomWords from 'random-words'
import Results from './results'
//vars for number of words and time in seconds
const numberOfWords = 20
const seconds = 60
const Test = () => {

    //set state for words start with an empty array
    const [words, setWords] = useState([])

    const [counter, setCounter] = useState(seconds)

    const [currInput, setCurrInput] = useState('')

    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(-1)
    const [currChar, setCurrChar] = useState('')
    //for accuracy calculation
    const [right, setRight] = useState(0)
    const [wrong, setWrong] = useState(0)
    const [status, setStatus] = useState('idle')
    //for words per minute
    const text = useRef(null)
    // const letter = useRef()

    useEffect(() => {
        setWords(generateWords())
    }, [])
    useEffect(() => {
        if (status === "started") {
            text.current.focus()
        }
    }, [status])

    // useEffect(() => {
    //     console.log(letter.current.children[currWordIndex].children[currCharIndex].classList)
    //     // if (currChar) {

    //     //     letter.current.children[0].chlidren[0].classList.add('hidden')
    //     // }
    //     // console.log(letter.current.classList)
    // }, [currChar]);
    //useEfffect sets words to the generate words function

    //function to generate words returns a new array with size of number of words fill and map
    const generateWords = () => {
        return new Array(numberOfWords).fill(null).map(() => (randomWords()))
    }

    const start = () => {
        // document.addEventListener('keydown', (e) =>
        //     console.log(e))

        //exit case
        if (status === 'done') {
            setWords(generateWords())
            setCurrWordIndex(0)
            setRight(0)
            setWrong(0)
            setCurrCharIndex(-1)
            setCurrChar("")
        }

        if (status !== 'started') {
            setStatus('started')

            let interval = setInterval(() => {
                setCounter((prev) => {

                    if (prev === 0) {
                        clearInterval(interval)
                        setStatus('done')
                        setCurrInput('')
                        return seconds
                    } else {

                        return (prev - 1)
                    }
                })
            }, 1000)
        }

    }

    const handleKeyPress = ({ keyCode, key }) => {
        // console.log(e.key)
        // every time a letter is typed i want to check if it matches the current word character
        // const compare = words[currWordIndex].charCodeAt([currChar])
        // // if (currChar)
        // console.log(compare, currInput)

        if (keyCode === 32) {
            matchOrNah()
            setCurrInput('')
            setCurrWordIndex(currWordIndex + 1)
            setCurrCharIndex(-1)


        } else if (keyCode === 8) {
            setCurrCharIndex(currCharIndex - 1)
            setCurrChar("")
        } else {
            setCurrCharIndex(currCharIndex + 1)
            setCurrChar(key)
        }


    }

    const matchOrNah = () => {
        const compareThis = words[currWordIndex]
        const match = compareThis === currInput.trim()
        console.log({ match }, compareThis)
        if (currWordIndex === words.length - 1) {
            setStatus('done')
        }
        if (match) {
            setRight(right + 1)
        } else {
            setWrong(wrong + 1)
        }

    }
    function getCharClass(wordIndex, charIndex, char) {

        if (wordIndex === currWordIndex && charIndex === currCharIndex && currChar && status !== 'done') {


            if (char === currChar) {

                return "bg-blue-100 text-black"
            } else {
                return "bg-red-500 text-black "

            }

        } else if (wordIndex === currWordIndex && currCharIndex >= words[currWordIndex].length) {
            return "bg-red-500"
        }
        else {
            return ''
        }

    }

    return (
        <div >
            {/* input*/}
            {/* div for words display */}
            {status === 'started' && (
                <>
                    <div className="">
                        <h2 className="text-left text-2xl">{counter}</h2>
                    </div>
                    <div className="text-center" id='prompt' >
                        {words.map((word, index) => {

                            return (
                                <span key={index}>

                                    <span>
                                        {word.split('').map((char, i) => {
                                            return <span key={i} className={`${getCharClass(index, i, char)} text-black/50`} >{char}</span>
                                        })}
                                    </span>
                                    <span> </span>
                                </span>
                            )
                        })}
                    </div>
                </>)}

            <>
                <div className="">

                    <input type="text" className="border" ref={text} onKeyDown={handleKeyPress} value={currInput} onChange={(e) => setCurrInput(e.target.value)} hidden={status !== "started"} placeholder=' Click Start to begin' />
                </div>
                <div className="" hidden={status === 'done'}>

                    <button className="border-4 w-full bg-blue-200 px-3" onClick={start}>start</button>
                </div>
            </>

            {
                status === 'done' && (
                    <>
                        <div className=" md:grid grid-cols-2 ">

                            <div className="flex items-center ">
                                <p className="text-4xl">Speed: </p>
                                <p className="text-4xl"> {Math.round((currWordIndex + 1) / seconds * 100)} WPM</p>
                            </div>
                            <div className="flex items-center ">
                                <p className="text-4xl">Accuracy: </p>
                                <p className="text-4xl"> {Math.round((right / (right + wrong)) * 100)} %</p>
                            </div>
                        </div>
                    </>
                )
            }



        </div >
    )
}

export default Test