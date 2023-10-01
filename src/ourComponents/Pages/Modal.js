

export default function Modal({ toggleModal }) {
    return (
        <div className="modal-content">
            <h1>modal content</h1>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                id fugit, dignissimos maxime non natus placeat illo iusto!
                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                placeat tempora vitae enim incidunt porro fuga ea.</p>

            <button ocClick={() => toggleModal()} className="close-modal">CLOSE</button>
        </div>
    )
}
