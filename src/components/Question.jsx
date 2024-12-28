import { useMemo } from 'react';

export default function Question({ question, questionIndex, handleAnswerSelect, showResults }) {
    // Memoize the randomized answers so they stay consistent
    const randomizedAnswers = useMemo(() => {
        const allAnswers = [...question.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
        allAnswers.splice(randomIndex, 0, question.correct_answer);
        return allAnswers;
    }, [question.incorrect_answers, question.correct_answer]); // Only recalculate if answers change

    return (
        <div className="question">
            <h2>{question.question}</h2>
            <div className="answers-container">
                {randomizedAnswers.map((answer, index) => {
                    let buttonClass = "answer-button";
                    if (showResults) {
                        if (answer === question.correct_answer) {
                            buttonClass += " correct";
                        } else if (answer === question.selectedAnswer && answer !== question.correct_answer) {
                            buttonClass += " incorrect";
                        }
                    } else if (answer === question.selectedAnswer) {
                        buttonClass += " selected";
                    }

                    return (
                        <button
                            key={answer} // Changed from index to answer for more stable keys
                            className={buttonClass}
                            onClick={() => handleAnswerSelect(questionIndex, answer)}
                            disabled={showResults}
                        >
                            {answer}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}