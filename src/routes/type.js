import React from 'react'
import { useState } from 'react'
import Test from './test'
import Test2 from './test2.tsx'
const Type = () => {
    const language = ['English', 'TypeScript', 'CSS', 'HTML', 'JavaScript']
    // const prompts = {
    //     English: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ", "The switch statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case, as well as statements in cases that follow the matching case."]

    // }
    const home = () => {
        return (
            <>
                <h1 className=' my-10 md:mt-20 md:mb-24  text-3xl md:text-4xl' > Select your Language</h1>
                <div className="flex flex-col  md:flex-row md:justify-center  justify-center  md:flex-wrap w-full ">{language.map(n => {
                    return <button onClick={changeStage} className="border px-8 py-1 text-center m-2 bg-indigo-500  md:w-full text-white rounded  transition ease-in-out   hover:-translate-y-1 hover:scale-110 hover:bg-pink-500 hover:text-white duration-300 md:basis-1/4  ">{n}</button>
                })}</div>
            </>
        )
    }
    const changeStage = (e) => {

        const userLang = e.target.innerText.toLowerCase()

        let languageSearch = "/prompts/" + userLang;

        fetch(languageSearch, {})
            .then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    return data;
                }).then((data) => {
                    let text = data.prompt
                    console.log(text)

                    setStage(() => {
                        return (
                            <>
                                <button onClick={() => setStage(home)} className="border px-8 py-1 mt-14 text-center m-2 bg-indigo-500  md:w-1/8 text-white rounded  transition ease-in-out   hover:-translate-y-1 hover:scale-110 hover:bg-pink-500 hover:text-white duration-300">Back</button>
                                <Test2 className='min-h-screen' text={`${text}`} />

                                {/* <Test /> */}
                            </>
                        )
                    })

                })
            })


    }

    const [stage, setStage] = useState(home)

    return (

        <div className='grid  grid-rows-6 gap-4 '>
            <div id="prompt" className=" row-span-3 text-center flex flex-col justify-center items-center ">
                {stage}
            </div>
        </div >
    )
}

export default Type