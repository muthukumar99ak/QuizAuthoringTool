import { useState } from "react";
import RedButton from "../../buttons/redButton/RedButton";
import YellowButton from "../../buttons/yellowButton/YellowButton";
import TextArea from "../textArea/TextArea";
import './questionOption.css'

function QuestionOptions(props) {
    const [showDeleteOption, setShowDeleteOption] = useState(false)
    return <div className='options_container'>
        {props.question.options.map((option, optionIndex) => {
            return <div className='inputbox_container' key={optionIndex}>
                <label className="inputbox_label">Option {optionIndex + 1}</label>
                <div className="option_area_container">
                    <TextArea
                        value={option.value}
                        onChange={(e) => props.optionTextChangeHandler(e, optionIndex, props.question.id)}
                    />
                    <span
                        title="Correct Answer"
                        className={`${option.isCorrect ? 'active' : ''} check_correct`}
                        onClick={() => props.checkCorrectAnswer(props.question.id, optionIndex)}
                    >&#10004;</span>
                </div>
                {showDeleteOption && props.question.options.length > 2 &&
                    <button
                        className='delete_option'
                        title='Delete Option'
                        onClick={() => props.deleteOptionHandler(props.question.id, optionIndex)}
                    >×</button>
                }
            </div>
        })}
        <div className='flex_center'>
            <YellowButton
                onClick={() => props.addOptionHandler(props.question.id, setShowDeleteOption)}
                label='ADD'
                disabled={((props.question.options.length > 2) && showDeleteOption) ? true : false}
            />
            {(props.question.options.length > 2) &&
                <RedButton
                    onClick={() => setShowDeleteOption(prev => !prev)}
                    label={showDeleteOption ? "HIDE DELETE OPTION" : "DELETE"}
                />
            }
        </div>
    </div>
}

export default QuestionOptions;