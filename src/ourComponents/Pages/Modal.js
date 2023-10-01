import { AiOutlineCloseSquare } from 'react-icons/ai'

export default function Modal({ toggleModal, img, name, commentary }) {
    return (
        <div className="modal-content content-center">
            <h1 className="text-4xl font-bold dark:text-white text-sky-950">{name}</h1>
            <img src={img} alt='img' className='w-[400px] ml-[13%]' />
            <div className='max-h-[170px] overflow-y-auto'>
                <p>{commentary}</p>
            </div>
            <button onClick={() => toggleModal()} className="close-modal">{<AiOutlineCloseSquare />}</button>
        </div>
    )
}
