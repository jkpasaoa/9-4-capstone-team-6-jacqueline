import { AiOutlineCloseSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiPlay } from 'react-icons/hi2'
import { HiMiniPause } from 'react-icons/hi2'

let speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;

export default function Modal({ toggleModal, img, name, commentary }) {

    let textToSpeech = () => {

        if (!synth.speaking || !synth.paused) {
            speech.text = commentary
            speech.rate = 0.80
            synth.speak(speech)
        } else {
            // synth.paused ? synth.resume() : synth.pause();
            synth.cancel()
        }
    }

    let speechPause = () => {
        window.speechSynthesis.cancel()
    }

    return (
        <div className="modal-content content-center">
            <h1 className="text-4xl font-bold dark:text-white text-sky-950">{name}</h1>
            <img src={img} alt='img' className='w-[400px] ml-[13%] rounded-lg' />
            <p className="ml-3 inline-flex text-sky-800"><Link onClick={() => textToSpeech()} className="inline-flex text-sky-800"><HiPlay className="mt-1" /> PLAY AUDIO </Link> <Link className="inline-flex text-sky-800" onClick={() => speechPause()}> <HiMiniPause className="mt-1" />PAUSE</Link></p>
            <div className='max-h-[170px] overflow-y-auto'>
                <p>{commentary}</p>
            </div>
            <button onClick={() => toggleModal()} className="close-modal">{<AiOutlineCloseSquare />}</button>
        </div>
    )
}
