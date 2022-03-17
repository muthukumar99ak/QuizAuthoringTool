import React from "react";
import QuestionOptions from "./questionOption/QuestionOptions";
import './questionDetail.css'
import TextArea from "./textArea/TextArea";
import UploadImage from "./uploadImage/UploadImage";
import ViewImage from "./viewImage/ViewImage";

function QuestionDetail(props) {
    return <div className='question_detail'>
        {
            (props.questions.length > 0) ? (
                <>
                    {props.questions.map((question, questionIndex) => {
                        if (props.questionToShow === questionIndex) {
                            return <React.Fragment key={question.id}>
                                <div className='pane_header'>
                                    <h2 className='pane_title'>
                                        Design question {questionIndex + 1}
                                        <button
                                            className='close_question_detail'
                                            onClick={() => props.setQuestionDetailShowMobile(false)}
                                        >×</button>
                                    </h2>
                                </div>
                                <div className='question_detail_body'>
                                    <div className='inputbox_container'>
                                        <label className="inputbox_label">Question</label>
                                        <div className='w_100'>
                                            <TextArea
                                                value={question.questionText}
                                                onChange={(e) => props.questionChangeHandler(e, question.id, questionIndex)}
                                            />
                                            {question.imageUrl ? (
                                                <ViewImage
                                                    question={question}
                                                    deleteImageHandler={props.deleteImageHandler}
                                                />
                                            ) : (
                                                <UploadImage
                                                    question={question}
                                                    imageChangeHandler={props.imageChangeHandler}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <QuestionOptions
                                        question={question}
                                        optionTextChangeHandler={props.optionTextChangeHandler}
                                        deleteOptionHandler={props.deleteOptionHandler}
                                        addOptionHandler={props.addOptionHandler}
                                        checkCorrectAnswer={props.checkCorrectAnswer}
                                    />
                                </div>
                            </React.Fragment>
                        }
                    })}
                </>) : <h4 className='question_alt'>Please click ADD button to add question</h4>
        }
    </div>
}

export default QuestionDetail;