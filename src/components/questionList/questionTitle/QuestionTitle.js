function QuestionTitle(props) {
    let isQuestionInDeleteQuestion = props.willBeDeleteQuestion.find(deleteQuestionId => deleteQuestionId === props.question.id);
    let isChecked = isQuestionInDeleteQuestion ? isQuestionInDeleteQuestion : false;

    return <li className={props.questionToShow === props.questionIndex ? 'active' : ''}>
        <input
            type='checkbox'
            className='delete_checkbox'
            checked={isChecked}
            onChange={(e) => props.checkboxChangeHandler(e, props.question.id)}
        />
        <label
            className='question_text'
            onClick={() => props.activeQuestionHandler(props.questionIndex)}
        >
            {props.questionIndex + 1}. {props.question.questionText}
        </label>
    </li>
}

export default QuestionTitle;