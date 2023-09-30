import { Link } from "react-router-dom";
import { ImLocation } from 'react-icons/im';
import { HiPlay } from 'react-icons/hi2'
import { useEffect, useState } from "react";
import axios from "axios";


const API = process.env.REACT_APP_API_URL;
let speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;

export default function PointOfInterestCard({ poi_id, name }) {

    const [commentary, setCommentary] = useState("")

    useEffect(() => {
        axios.get(`${API}/commentary/${poi_id}`)
            .then((res) => {
                setCommentary(res.data)
            })
    }, [poi_id])

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
            <li className="text-left"><span onClick={() => textToSpeech()} className="float-left px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[400px]"><h3 className="inline-flex text-xl font-bold"><ImLocation />{name}</h3>
                <section className="border-l-2 border-sky-950 ml-2">
                    <p className="ml-3"><Link className="inline-flex text-sky-800"><HiPlay className="mt-1" /> PLAY AUDIO</Link></p>
                    <p className="ml-3">In this paragraph there will be a short description leading to full details...</p>
                    {/* <Link>Show More</Link> */}
                </section>
            </span>
            </li>
        </div>
    )
}
