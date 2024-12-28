import { useState, useEffect } from "react"
import Question from "./Question";

// Helper function to decode HTML entities
function decodeHTML(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

export default function QuizSection() {
    const [questionsArray, setquestionsArray] = useState([]);
    const [score, setScore] = useState(null);
    const [showResults, setShowResults] = useState(false)
    useEffect(() => {
        async function retrieveQuestions() {
            const res = await fetch("https://opentdb.com/api.php?amount=5");
            const data = await res.json();
            setquestionsArray(data.results.map(question => ({
                // Decode the question text and answers
                question: decodeHTML(question.question),
                incorrect_answers: question.incorrect_answers.map(answer => decodeHTML(answer)),
                correct_answer: decodeHTML(question.correct_answer),
                selectedAnswer: null
            })));
        }
        retrieveQuestions();
    }, []);

    const handleAnswerSelect = (index, answer) => {
        setquestionsArray(prev => prev.map((question, i) => 
            i === index ? { ...question, selectedAnswer: answer } : question
        ))
    }

    const handleCheckAnswers = () => {
        const correctCount = questionsArray.filter(
            question => question.selectedAnswer === question.correct_answer
        ).length;
        setScore(correctCount);
        setShowResults(true);
    }

    function renderQuestions(questionsArray) {
        return questionsArray.map((question, index) => 
            <Question 
                key={index} 
                question={question} 
                questionIndex={index} 
                handleAnswerSelect={handleAnswerSelect} 
                showResults={showResults} 
            />
        )
    }

    return (
        <section>
            <div className="questions">
                {renderQuestions(questionsArray)}
            </div>
            {score === null && 
                <button className="check-button" onClick={handleCheckAnswers}>
                    Check Answers
                </button>
            }
            {score !== null && showResults && 
                <p className="result">You got {score} out of {questionsArray.length} correct!</p>
            }
        </section>
    );
}