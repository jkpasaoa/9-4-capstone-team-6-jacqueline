import { AiOutlineCloseSquare } from 'react-icons/ai'

export default function Modal({ toggleModal, img }) {
    return (
        <div className="modal-content">
            <h1>modal content</h1>
            <img src={img} alt='img' />
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                id fugit, dignissimos maxime non natus placeat illo iusto!
                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                placeat tempora vitae enim incidunt porro fuga ea.</p>
            <button onClick={() => toggleModal()} className="close-modal">{<AiOutlineCloseSquare />}</button>
        </div>
    )
}
