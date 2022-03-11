import React from "react";
import QuestionOptions from "./question_option/QuestionOptions";
import './rightPane.css'
import TextArea from "./textarea/TextArea";
import UploadImage from "./upload_image/UploadImage";
import ViewImage from "./view_image/ViewImage";

function RightPane(props) {
    return <div className='rightPane'>
        {
            props.questions.length > 0 ? (
                <>
                    {props.questions.map((question, questionIndex) => {
                        if (props.quesToShow === questionIndex) {
                            return <React.Fragment key={question.id}>
                                <div className='paneHeader'>
                                    <h2 className='paneTitle'>
                                        Design question {questionIndex + 1}
                                        <button
                                            className='closePane'
                                            onClick={() => props.setRightPaneShowMobile(false)}
                                        >×</button>
                                    </h2>
                                </div>
                                <div className='rightPaneBody'>
                                    <div className='textBoxCont'>
                                        <label>Question</label>
                                        <div className='w-100'>
                                            <TextArea
                                                value={question.question_text}
                                                onChange={(e) => props.questionChangeHandler(e, question.id, questionIndex)}
                                            />
                                            {
                                                question.image_url ? (
                                                    <ViewImage
                                                        question={question}
                                                        delImageHandler={props.delImageHandler}
                                                    />
                                                ) : (
                                                    <UploadImage
                                                        question={question}
                                                        imageChangeHandler={props.imageChangeHandler}
                                                    />
                                                )
                                            }

                                        </div>
                                    </div>
                                    <QuestionOptions
                                        question={question}
                                        optionChangeHandler={props.optionChangeHandler}
                                        delOptionHandler={props.delOptionHandler}
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

export default RightPane;