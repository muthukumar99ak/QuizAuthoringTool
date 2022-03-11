import React, { useState } from 'react';
import LeftPane from '../left_pane/LeftPane';
import RightPane from '../right_pane/RightPane';
import './questionResponsive.css'

function Questions() {
    let retrievedQuestions = localStorage.getItem('questions');
    const [questions, setQuestions] = useState(() => retrievedQuestions ? JSON.parse(retrievedQuestions) : []);
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [willBeDeleteQues, setWillBeDeleteQues] = useState([])
    const [rightPaneShowMobile, setRightPaneShowMobile] = useState(false)
    const [quesToShow, setQuesToShow] = useState(0)

    // Add question
    const addQuestionHandler = () => {
        let questionsLength = questions.length + 1;
        setQuestions(prev => {
            return [...prev, {
                id: Date.now(),
                question_text: `New question ${questionsLength}`,
                image_url: '',
                // crctAnswer: null,
                options: [
                    { value: '', isCorrect: false },
                    { value: '', isCorrect: false }
                ],
            }]
        })
    }

    // Delete question
    const deleteQuestionHandler = () => {
        if (deleteQuestion === true) {
            let copyQuestions = [...questions];
            let copyWillBeDelQues = [...willBeDeleteQues]
            // Deleted questions
            copyWillBeDelQues.forEach(delQuesId => {
                copyQuestions = copyQuestions.filter((copiedQues, copiedQuesIndex) => {
                    if (quesToShow === copiedQuesIndex) {
                        setQuesToShow(0)
                    }
                    return copiedQues.id !== delQuesId
                })
            });
            setQuestions(copyQuestions)
        }
        setDeleteQuestion(prev => !prev)
    }

    // Change which question is to show
    const activeQuestionHandler = (questionIndex) => {
        setQuesToShow(questionIndex)
        setRightPaneShowMobile(true)
    }

    // Question title change handler
    const questionChangeHandler = (e, questionId) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQues => {
            if (copiedQues.id === questionId) {
                copiedQues.question_text = e.target.value;
            }
        })
        setQuestions(copyQuestions)
    }

    // Add option
    const addOptionHandler = (questionId) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQues => {
            if (copiedQues.id === questionId) {
                if (copiedQues.options.length < 6) {
                    copiedQues.options.push({ value: '', isCorrect: false });
                } else {
                    alert('Maximum 6 options only allowed')
                }
            }
        })
        setQuestions(copyQuestions)
    }

    // Check correct option
    const checkCorrectAnswer = (questionId, optionIndex) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQues => {
            if (copiedQues.id === questionId) {
                copiedQues.options.forEach((option, optIndex) => {
                    if (optIndex === optionIndex) {
                        copiedQues.options[optIndex].isCorrect = true;
                    } else {
                        copiedQues.options[optIndex].isCorrect = false;
                    }
                })
            }
        })
        setQuestions(copyQuestions)
    }

    // Delete Option 
    const delOptionHandler = (questionId, optIndex) => {
        let copyQuestion = [...questions];
        copyQuestion.forEach(copiedQues => {
            if (copiedQues.id === questionId) {
                if (copiedQues.options.length > 2) {
                    copiedQues.options.forEach((copiedOption, copiedOptIndex) => {
                        if (copiedOptIndex === optIndex) {
                            copiedQues.options.splice(optIndex, 1)
                        }
                    })
                } else {
                    alert("Minimum 2 options needed")
                }
            }
        })
        setQuestions(copyQuestion)
    }

    // Option text change
    const optionChangeHandler = (e, optIndex, quesId) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQues => {
            if (copiedQues.id === quesId) {
                // Update crct answer value if its checked
                // if (copiedQues.options[optIndex] === copiedQues.crctAnswer) {
                //     copiedQues.crctAnswer = e.target.value
                // }
                copiedQues.options[optIndex].value = e.target.value;

            }
        })
        setQuestions(copyQuestions)
    }

    // Delete checkbox change handler
    const checkboxChangeHandler = (e, questionId) => {
        if (e.target.checked) {
            setWillBeDeleteQues(prev => {
                return [...prev, questionId]
            })
        } else {
            let copyWillBeDelQues = [...willBeDeleteQues];
            let filteredWillBeDelQues = copyWillBeDelQues.filter(delQuesId => questionId !== delQuesId);
            setWillBeDeleteQues(filteredWillBeDelQues)
        }
    }

    // Image change handler
    const imageChangeHandler = (e, questionId) => {
        // let file_url = URL.createObjectURL(e.target.files[0]);
        let copyQuestions = [...questions];
        var reader = new FileReader();
        reader.onload = function (ev) {
            copyQuestions.forEach(copiedQues => {
                if (copiedQues.id === questionId) {
                    copiedQues.image_url = ev.target.result;
                }
            })
            setQuestions(copyQuestions)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    // Delete Image
    const delImageHandler = (questionId) => {
        let copyQuestion = [...questions];
        copyQuestion.forEach(copiedQues => {
            if (copiedQues.id === questionId) {
                copiedQues.image_url = ''
            }
        })
        setQuestions(copyQuestion)
    }

    // Save to local storage
    const saveToLocalStoHandler = () => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    saveToLocalStoHandler()

    return (
        <div className="row-fluid">
            {/* Left Pane */}
            <div className='span4 leftPaneCont'>
                <LeftPane
                    questions={questions}
                    checkboxChangeHandler={checkboxChangeHandler}
                    activeQuestionHandler={activeQuestionHandler}
                    addQuestionHandler={addQuestionHandler}
                    deleteQuestionHandler={deleteQuestionHandler}
                    deleteQuestion={deleteQuestion}
                    quesToShow={quesToShow}
                />
            </div>

            {/* Right Pane */}
            <div className={`span8 rightPaneCont ${rightPaneShowMobile ? 'show' : ''}`}>
                <RightPane
                    questions={questions}
                    setRightPaneShowMobile={setRightPaneShowMobile}
                    questionChangeHandler={questionChangeHandler}
                    delImageHandler={delImageHandler}
                    imageChangeHandler={imageChangeHandler}
                    optionChangeHandler={optionChangeHandler}
                    delOptionHandler={delOptionHandler}
                    addOptionHandler={addOptionHandler}
                    checkCorrectAnswer={checkCorrectAnswer}
                    quesToShow={quesToShow}
                />
            </div>
        </div>
    );
}

export default Questions;