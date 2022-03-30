import { FC, useState } from "react";
import useTypingGame, {
    CharStateType,
    PhaseType
} from "react-typing-game-hook";
import Type from './type'
import "./styles.css";
import Results from './results'
let Color = require('color');

const TypingGameDemo: FC<{ text: string }> = ({ text }) => {

    const [wordCount, setWordCount] = useState(0)
    // let text = "The quick brown fox jumps over the lazy dog";
    const countWords = (str) => {
        const spaceArray = str.split('').filter(a => a === ' ')
        setWordCount(spaceArray.length + 1)
        return wordCount

    }

    const {
        states: {
            charsState,
            length,
            currIndex,
            currChar,
            correctChar,
            errorChar,
            phase,
            startTime,
            endTime,

        },
        actions: { insertTyping, resetTyping, deleteTyping, getDuration }
    } = useTypingGame(text, {
        skipCurrentWordOnSpace: false,
        pauseOnError: false,
        countErrors: 'everytime',
    });

    const handleKey = (key: any) => {

        console.log(key)
        if (key === "Escape") {
            resetTyping();
            return;
        }
        if (key === "Backspace") {
            deleteTyping(false);
            return;
        }
        if (key === "Enter") {
            insertTyping("Space");
            return
        }
        if (key.length === 1) {
            insertTyping(key);
        }
    };

    return (

        <div className="max-h-full  ">
            <p className="my-6">Click on the text below and start typing</p>
            <div

                className="typing-test flex "
                onKeyDown={(e) => {
                    handleKey(e.key);
                    e.preventDefault();
                }}
                tabIndex={0}
            >
                <pre className='text-center mt-6'>
                    {text.split("").map((char: string, index: number) => {
                        let state = charsState[index];
                        let color =
                            state === CharStateType.Incomplete
                                ? Color('#FFFFFF').alpha(0.65)
                                : state === CharStateType.Correct
                                    ? Color('#FFFFFF')
                                    : "red";
                        return (
                            <span
                                key={char + index}
                                style={{ color }}
                                className={`${currIndex + 1 === index ? "curr-letter" : ""} text-2xl `}
                            >
                                {char}
                            </span>
                        );
                    })}
                </pre>
            </div>

            <Results phase={PhaseType[phase]} speedClass={PhaseType[phase] === 'Ended' ? 'flex' : 'hidden'} wordsTyped={Math.round(wordCount / (getDuration()) * 1000 * 60)} accClass={PhaseType[phase] !== 'NotStarted' ? 'flex' : 'hidden'} speed={Math.round((currIndex + 1) / (getDuration()) * 1000 * 60)} accuracy={Math.round((correctChar / (correctChar + errorChar)) * 100)} errors={errorChar} />

        </div>
    );
};

export default TypingGameDemo;

