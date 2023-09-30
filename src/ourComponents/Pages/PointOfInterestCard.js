
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";


const API = process.env.REACT_APP_API_URL;
let speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;

export default function PointOfInterestCard({ poi }) {

    const [commentary, setCommentary] = useState("")

    useEffect(() => {
        axios.get(`${API}/commentary/${poi.id}`)
        .then((res) => {
            setCommentary(res.data)
        })
    }, [poi])

    let textToSpeech = () => {
        console.log(commentary.description)
    if (!synth.speaking && !synth.paused) {
        speech.text = commentary.description
        speech.rate = 0.80
        synth.speak(speech)
    } else {
        // synth.paused ? synth.resume() : synth.pause();
        synth.cancel()
    }
    }

    return (
        <div>
            <li className="relative inline-flex float-left p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-sky-950 to-cyan-600 group-hover:from-cyan-500 group-hover:to-sky-950 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-[400px]"><span onClick={() => textToSpeech()} className="float-left px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[400px]"><h3>{poi}</h3>
                <Link>PLAY AUDIO</Link>
                <p>In this paragraph there will be a short description leading to full details...</p>
                {/* <Link>Show More</Link> */}
            </span>
            </li>
        </div>
    )
}
