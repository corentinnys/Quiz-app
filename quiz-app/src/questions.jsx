import { useState } from "react";


function Questions({ question, currentIndex, setCurrentIndex }) {
    const questions = question?.questions || [];



    const currentQuestion = questions[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
    };
    return (
        <>

        </>
      /*  <div>
            <h2>{currentQuestion.question}</h2>

            <ul>
                {currentQuestion.options.map((opt, i) => (
                    <li key={i}>
                        {opt}
                    </li>
                ))}
            </ul>

            {currentIndex < questions.length - 1 ? (
                <button onClick={handleNext}>Question suivante</button>
            ) : (
                <p>Quiz terminé 🎉</p>
            )}
        </div>*/
    );
}

export default Questions;