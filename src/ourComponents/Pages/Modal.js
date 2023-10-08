import { AiOutlineCloseSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiPlay } from 'react-icons/hi2'
import { HiMiniPause } from 'react-icons/hi2'
import { HiStop } from 'react-icons/hi2'

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
        <div className="modal-content content-center">
            <h1 className="text-4xl font-bold dark:text-white text-sky-950">{name}</h1>
            <img src={img} alt='img' className='w-[400px] ml-[13%] rounded-lg' />
            <p className="ml-3 inline-flex text-sky-800"><Link onClick={() => textToSpeech()} className="inline-flex text-sky-800"><HiPlay className="mt-1" /> PLAY </Link> &nbsp; &nbsp; &nbsp; <Link className="inline-flex text-sky-800" onClick={() => speechPause()}> <HiMiniPause className="mt-1" />PAUSE</Link> &nbsp; &nbsp; &nbsp; <Link onClick={() => speechStop()} className="inline-flex text-sky-800"><HiStop className="mt-1" /> STOP</Link>&nbsp;</p>
            <div className='max-h-[170px] overflow-y-auto'>
                <p>{commentary}</p>
            </div>
            <button onClick={() => toggleModal()} className="close-modal">{<AiOutlineCloseSquare />}</button>
        </div>
    )
}
