import { useState } from 'react';
import RedButton from '../buttons/redButton/RedButton';
import YellowButton from '../buttons/yellowButton/YellowButton';
import './questionList.css';
import QuestionTitle from './questionTitle/QuestionTitle';

function QuestionList(props) {
    return <div className='question_list'>
        <div className='pane_header'>
            <h2 className='pane_title'>Select your questions</h2>
        </div>
        <div className='question_list_body'>
            {
                (props.questions.length > 0) ? (
                    <ul className={`question_ul ${props.deleteQuestion ? 'show_delete' : ''}`}>
                        {props.questions.map((question, questionIndex) => {
                            return <QuestionTitle
                                key={question.id}
                                question={question}
                                questionIndex={questionIndex}
                                activeQuestionHandler={props.activeQuestionHandler}
                                checkboxChangeHandler={props.checkboxChangeHandler}
                                questionToShow={props.questionToShow}
                                willBeDeleteQuestion={props.willBeDeleteQuestion}
                            />
                        })}
                    </ul>
                ) : <h4 className='question_alt'>Please click ADD button to add question</h4>
            }
        </div>
        <div className='question_list_footer'>
            <div className='flex_center'>
                <YellowButton
                    onClick={props.addQuestionHandler}
                    label='ADD'
                    disabled={props.deleteQuestion}
                />
                {(props.questions.length > 0) &&
                    <RedButton
                        onClick={() => props.deleteQuestionHandler()}
                        label={props.deleteQuestion ? 'DELETE SELECTED' : 'DELETE'}
                    />
                }
            </div>
        </div>
    </div>
}

export default QuestionList;