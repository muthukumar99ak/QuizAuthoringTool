import React, { useEffect, useState } from 'react';
import QuestionList from '../../components/questionList/QuestionList';
import QuestionDetail from '../../components/questionDetail/QuestionDetail';
import './questionResponsive.css';

let retrievedQuestions = localStorage.getItem('questions');

function Questions() {
    const [questions, setQuestions] = useState(() => retrievedQuestions ? JSON.parse(retrievedQuestions) : []);
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [willBeDeleteQuestion, setWillBeDeleteQuestion] = useState([])
    const [questionDetailShowMobile, setQuestionDetailShowMobile] = useState(false)
    const [questionToShow, setQuestionToShow] = useState(0);

    useEffect(() => {
        saveToLocalStorageHandler();
    }, [questions])

    // Add question
    const addQuestionHandler = () => {
        let questionsLength = questions.length + 1;
        setQuestions(prev => {
            return [...prev, {
                id: Date.now(),
                questionText: `New question ${questionsLength}`,
                imageUrl: '',
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
            if (willBeDeleteQuestion.length > 0) {
                let deleteConfirmation = window.confirm('Are you sure want to delete?');
                if (deleteConfirmation) {
                    let copyQuestions = [...questions];
                    willBeDeleteQuestion.forEach(deleteQuestionId => {
                        copyQuestions = copyQuestions.filter((copiedQuestion, copiedQuestionIndex) => {
                            if (questionToShow === copiedQuestionIndex) {
                                setQuestionToShow(0)
                            }
                            return copiedQuestion.id !== deleteQuestionId
                        })
                    });
                    setQuestions(copyQuestions)
                    setWillBeDeleteQuestion([])
                } else {
                    setWillBeDeleteQuestion([])
                }
            }
        }
        setDeleteQuestion(prev => !prev)
    }

    // Change which question is to show
    const activeQuestionHandler = (questionIndex) => {
        setQuestionToShow(questionIndex)
        setQuestionDetailShowMobile(true)
    }

    // Question title change handler
    const questionChangeHandler = (e, questionId) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQuestion => {
            if (copiedQuestion.id === questionId) {
                copiedQuestion.questionText = e.target.value;
            }
        })
        setQuestions(copyQuestions)
    }

    // Add option
    const addOptionHandler = (questionId, setShowDeleteOption) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQuestion => {
            if (copiedQuestion.id === questionId) {
                if (copiedQuestion.options.length < 6) {
                    copiedQuestion.options.push({ value: '', isCorrect: false });
                } else {
                    alert('Maximum 6 options only allowed')
                }
            }
        })
        setQuestions(copyQuestions)
        setShowDeleteOption(false)
    }

    // Check correct option
    const checkCorrectAnswer = (questionId, optionIndex) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQuestion => {
            if (copiedQuestion.id === questionId) {
                copiedQuestion.options.forEach((copiedOption, copiedOptionIndex) => {
                    if (copiedOptionIndex === optionIndex) {
                        copiedQuestion.options[copiedOptionIndex].isCorrect = true;
                    } else {
                        copiedQuestion.options[copiedOptionIndex].isCorrect = false;
                    }
                })
            }
        })
        setQuestions(copyQuestions)
    }

    // Delete Option 
    const deleteOptionHandler = (questionId, optionIndex) => {
        let deleteConfirmation = window.confirm('Are you sure want to delete this option?');
        if (deleteConfirmation) {
            let copyQuestion = [...questions];
            copyQuestion.forEach(copiedQuestion => {
                if (copiedQuestion.id === questionId) {
                    copiedQuestion.options.forEach((copiedOption, copiedOptionIndex) => {
                        if (copiedOptionIndex === optionIndex) {
                            copiedQuestion.options.splice(optionIndex, 1)
                        }
                    })
                }
            })
            setQuestions(copyQuestion)
        }
    }

    // Option text change
    const optionTextChangeHandler = (e, optionIndex, questionId) => {
        let copyQuestions = [...questions];
        copyQuestions.forEach(copiedQuestion => {
            if (copiedQuestion.id === questionId) {
                copiedQuestion.options[optionIndex].value = e.target.value;
            }
        })
        setQuestions(copyQuestions)
    }

    // Delete checkbox change handler
    const checkboxChangeHandler = (e, questionId) => {
        if (e.target.checked) {
            setWillBeDeleteQuestion(prev => {
                return [...prev, questionId]
            })
        } else {
            let filteredWillBeDeleteQuestion = willBeDeleteQuestion.filter(deleteQuestionId => questionId !== deleteQuestionId);
            setWillBeDeleteQuestion(filteredWillBeDeleteQuestion)
        }
    }

    // Image change handler
    const imageChangeHandler = (e, questionId) => {
        let copyQuestions = [...questions];
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            copyQuestions.forEach(copiedQuestion => {
                if (copiedQuestion.id === questionId) {
                    copiedQuestion.imageUrl = readerEvent.target.result;
                }
            })
            setQuestions(copyQuestions)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    // Delete Image
    const deleteImageHandler = (questionId) => {
        let deleteConfirmation = window.confirm('Are you sure want to delete the image?');
        if (deleteConfirmation) {
            let copyQuestion = [...questions];
            copyQuestion.forEach(copiedQuestion => {
                if (copiedQuestion.id === questionId) {
                    copiedQuestion.imageUrl = ''
                }
            })
            setQuestions(copyQuestion)
        }
    }

    // Save to local storage
    const saveToLocalStorageHandler = () => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }



    return (
        <div className="row-fluid">
            {/* Question List */}
            <div className='span4 question_list_container'>
                <QuestionList
                    questions={questions}
                    checkboxChangeHandler={checkboxChangeHandler}
                    activeQuestionHandler={activeQuestionHandler}
                    addQuestionHandler={addQuestionHandler}
                    deleteQuestionHandler={deleteQuestionHandler}
                    deleteQuestion={deleteQuestion}
                    questionToShow={questionToShow}
                    willBeDeleteQuestion={willBeDeleteQuestion}
                />
            </div>

            {/* Question Detail */}
            <div className={`span8 question_detail_container ${questionDetailShowMobile ? 'show' : ''}`}>
                <QuestionDetail
                    questions={questions}
                    setQuestionDetailShowMobile={setQuestionDetailShowMobile}
                    questionChangeHandler={questionChangeHandler}
                    deleteImageHandler={deleteImageHandler}
                    imageChangeHandler={imageChangeHandler}
                    optionTextChangeHandler={optionTextChangeHandler}
                    deleteOptionHandler={deleteOptionHandler}
                    addOptionHandler={addOptionHandler}
                    checkCorrectAnswer={checkCorrectAnswer}
                    questionToShow={questionToShow}
                />
            </div>
        </div>
    );
}

export default Questions;