import { useState } from "react";
import RedButton from "../../buttons/red_button/RedButton";
import YellowButton from "../../buttons/yellow_button/YellowButton";
import TextArea from "../textarea/TextArea";
import './questionOption.css'

function QuestionOptions(props) {
    const [showDelOption, setShowDelOption] = useState(false)
    return <div className='optionsCont'>
        {props.question.options.map((option, optionIndex) => {
            return <div className='textBoxCont' key={optionIndex}>
                <label>Option {optionIndex + 1}</label>
                <div className="optionAreaCont">
                    <TextArea
                        value={option.value}
                        onChange={(e) => props.optionChangeHandler(e, optionIndex, props.question.id)}
                    />
                    <span
                        title="Correct Answer"
                        className={`${option.isCorrect ? 'active' : ''} checkCrct`}
                        // className={`${option.isCorrect === props.question.crctAnswer ? 'active' : ''} checkCrct`}
                        onClick={() => props.checkCorrectAnswer(props.question.id, optionIndex)}
                    >&#10004;</span>
                </div>
                {showDelOption &&
                    <button
                        className='delOption'
                        title='Delete Option'
                        onClick={() => props.delOptionHandler(props.question.id, optionIndex)}
                    >×</button>
                }
            </div>
        })}
        <div className='flexCenter'>
            <YellowButton
                onClick={() => props.addOptionHandler(props.question.id)}
                label='ADD'
            />
            <RedButton
                onClick={() => setShowDelOption(prev => !prev)}
                label={showDelOption ? "HIDE DELETE OPTION" : "DELETE"}
            />
        </div>
    </div>
}

export default QuestionOptions;