import './viewImage.css'

function ViewImage(props) {
    return <div className='imageCont'>
        <img src={props.question.image_url} alt='uploaded img' />
        <button
            className='delImage'
            title='Delete Image'
            onClick={() => props.delImageHandler(props.question.id)}
        >×</button>
    </div>
}

export default ViewImage;