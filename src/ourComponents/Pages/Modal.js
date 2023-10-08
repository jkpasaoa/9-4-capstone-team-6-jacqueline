import { AiOutlineCloseSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiPlay } from 'react-icons/hi2'
import { HiMiniPause } from 'react-icons/hi2'
import { HiStop } from 'react-icons/hi2'
import './Pages.css';

let speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;

export default function Modal({ toggleModal, img, name, commentary }) {

    let textToSpeech = () => {

        if (!synth.speaking && !synth.paused) {
            speech.text = commentary
            speech.rate = 0.85
            synth.speak(speech)
        } else if (synth.paused) {
            // synth.paused ? synth.resume() : synth.pause();
            synth.resume()

        }
    }

    let speechPause = () => {
        synth.pause()
    }

    let speechStop = () => {
        synth.cancel()
    }

    return (
        <div className="modal-content content-center object-center">
            <h1 className="text-4xl font-bold dark:text-white text-sky-950 mb-2">{name}</h1>
            <div className='flex justify-center'>
                <img src={img} alt='img' className='w-[500px] rounded-lg h-[290px] mb-2' />
            </div>
            <p className="ml-3 inline-flex text-sky-800"><Link onClick={() => textToSpeech()} className="inline-flex text-sky-800"><HiPlay className="mt-1" /> PLAY </Link> &nbsp; &nbsp; &nbsp; <Link className="inline-flex text-sky-800" onClick={() => speechPause()}> <HiMiniPause className="mt-1" />PAUSE</Link> &nbsp; &nbsp; &nbsp; <Link onClick={() => speechStop()} className="inline-flex text-sky-800"><HiStop className="mt-1" /> STOP</Link>&nbsp;</p>
            <div className='max-h-[170px] overflow-y-auto mt-[5px] mb-[10px] typewriter'>
                <p className='text-gray-500 dark:text-gray-400 h-[150px]'>{commentary}</p>
            </div>
            <button onClick={() => toggleModal()} className="close-modal">{<AiOutlineCloseSquare />}</button>
        </div>
    )
}
