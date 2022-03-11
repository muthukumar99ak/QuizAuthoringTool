function QuestionTitle(props) {
    return <li className={props.quesToShow === props.index ? 'active' : ''}>
        <input
            type='checkbox'
            className='delCheckbox'
            onChange={(e) => props.checkboxChangeHandler(e, props.question.id)}
        />
        <button
            className='questionText'
            onClick={() => props.activeQuestionHandler(props.index)}
        >
            {props.index + 1}. {props.question.question_text}
        </button>
    </li>
}

export default QuestionTitle;