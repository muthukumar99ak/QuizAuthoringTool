import RedButton from '../buttons/red_button/RedButton';
import YellowButton from '../buttons/yellow_button/YellowButton';
import './leftPane.css';
import QuestionTitle from './question_title/QuestionTitle';

function LeftPane(props) {
    return <div className='leftPane'>
        <div className='paneHeader'>
            <h2 className='paneTitle'>Select your questions</h2>
        </div>
        <div className='leftPaneBody'>
            {
                props.questions.length > 0 ? (
                    <ul className={`questionList ${props.deleteQuestion ? 'showDelete' : ''}`}>
                        {props.questions.map((question, index) => {
                            return <QuestionTitle
                                key={question.id}
                                question={question}
                                index={index}
                                activeQuestionHandler={props.activeQuestionHandler}
                                checkboxChangeHandler={props.checkboxChangeHandler}
                                quesToShow={props.quesToShow}
                            />
                        })}
                    </ul>
                ) : <h4 className='question_alt'>Please click ADD button to add question</h4>
            }
        </div>
        <div className='leftPaneFooter'>
            <div className='flexCenter'>
                <YellowButton
                    onClick={props.addQuestionHandler}
                    label='ADD'
                />
                <RedButton
                    onClick={props.deleteQuestionHandler}
                    label={props.deleteQuestion ? 'DELETE SELECTED' : 'DELETE'}
                />
            </div>
        </div>
    </div>
}

export default LeftPane;