import './viewImage.css'

function ViewImage(props) {
    return <div className='image_container'>
        <img src={props.question.imageUrl} alt='uploaded img' />
        <button
            className='delete_image'
            title='Delete Image'
            onClick={() => props.deleteImageHandler(props.question.id)}
        >×</button>
    </div>
}

export default ViewImage;