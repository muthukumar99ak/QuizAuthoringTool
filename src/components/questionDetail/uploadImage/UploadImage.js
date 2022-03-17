function UploadImage(props) {
    return <div className='flex_center'>
        <input
            type='file'
            id='image'
            accept="image/png, image/gif, image/jpeg, image/jpg"
            className='display_none'
            onChange={(e) => props.imageChangeHandler(e, props.question.id)}
        />
        <label htmlFor='image' className='button yellow_button'>ADD IMAGE</label>
    </div>
}

export default UploadImage;