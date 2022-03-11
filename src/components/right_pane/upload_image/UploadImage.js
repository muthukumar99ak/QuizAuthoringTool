function UploadImage(props) {
    return <div className='flexCenter'>
        <input
            type='file'
            id='image'
            accept="image/png, image/gif, image/jpeg, image/jpg"
            className='d-none'
            onChange={(e) => props.imageChangeHandler(e, props.question.id)}
        />
        <label htmlFor='image' className='bton yellowBtn'>ADD IMAGE</label>
    </div>
}

export default UploadImage;