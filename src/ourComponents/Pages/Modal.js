import { AiOutlineCloseSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiPlay } from 'react-icons/hi2'

export default function Modal({ toggleModal, img, name, commentary }) {
    return (
        <div className="modal-content content-center">
            <h1 className="text-4xl font-bold dark:text-white text-sky-950">{name}</h1>
            <img src={img} alt='img' className='w-[400px] ml-[13%] rounded-lg' />
            <p className="ml-3"><Link className="inline-flex text-sky-800"><HiPlay className="mt-1" /> PLAY AUDIO</Link></p>
            <div className='max-h-[170px] overflow-y-auto'>
                <p>{commentary}</p>
            </div>
            <button onClick={() => toggleModal()} className="close-modal">{<AiOutlineCloseSquare />}</button>
        </div>
    )
}
