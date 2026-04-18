import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Questions from "./questions.jsx";

function App() {
    const [items, setItems] = useState([]);
    const [question, setQuestion] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => setItems(data.quizzes))
            .catch((err) => console.error(err));
    }, []);

    const handleclick = (item) => {
        setQuestion(item);
        setCurrentIndex(0);
        setScore(0);
        setQuizFinished(false);
    };

    useEffect(() => {
        setSelected(null);
    }, [currentIndex]);

    const handleResponse = (opt) => {
        if (selected) return;

        setSelected(opt);

        const isCorrect =
            opt === question.questions[currentIndex].answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            if (currentIndex === 9) {
                setQuizFinished(true);
            } else {
                setCurrentIndex((prev) => prev + 1);
            }
        }, 800);
    };

    const speak = (text) => {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "fr-FR";
        speechSynthesis.speak(utterance);
    };


    if (quizFinished) {
        return (
            <div
                className="d-flex flex-column justify-content-center align-items-center text-white"
                style={{
                    height: "100vh",
                    backgroundColor: "#313E51"
                }}
            >
                <h1>🎉 Quiz terminé</h1>

                <div className="bg-dark p-4 rounded mt-4 text-center">
                    <h2>Ton score</h2>
                    <p className="fs-2 mt-2">
                        {score} / 10
                    </p>
                </div>

                <button
                    className="btn btn-primary mt-4"
                    onClick={() => {
                        setQuestion([]);
                        setCurrentIndex(0);
                        setScore(0);
                        setQuizFinished(false);
                    }}
                >
                    Rejouer
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundImage: "url('/assets/images/pattern-background-desktop-dark.svg')",
                height: "100vh",
                backgroundColor: "#313E51"
            }}
        >
            <div className="d-flex flex-column justify-content-center align-items-center h-100">



                <h1 className="text-white text-center">
                    {question?.questions?.[currentIndex]?.question ||
                        "Welcome to the frontend quiz"}
                </h1>

                <ul className="list-unstyled p-0 m-0 mt-4">
                    {question?.questions?.length > 0 ? (
                        <>
                            <p>Question {currentIndex + 1} of 10</p>
                            {question.questions[currentIndex].options.map((opt, index) => {
                                const isCorrectAnswer =
                                    opt === question.questions[currentIndex].answer;

                                return (
                                    <li
                                        key={index}
                                        className={`d-flex align-items-center m-2 choice ${
                                            selected
                                                ? isCorrectAnswer
                                                    ? "bg-success text-white"
                                                    : selected === opt
                                                        ? "bg-danger text-white"
                                                        : ""
                                                : ""
                                        }`}
                                        onClick={() => {
                                            speak(opt);
                                            handleResponse(opt);
                                        }}
                                    >
                                        {opt}
                                    </li>
                                );
                            })}
                        </>
                    ) : (
                        items.map((item, index) => (
                            <li
                                key={index}
                                className="d-flex align-items-center m-2 choice"
                                onClick={() => handleclick(item)}
                            >
                                {item.icon && <img src={item.icon} alt={item.title} />}
                                {item.title}
                            </li>
                        ))
                    )}
                </ul>


                {question?.questions?.length > 0 && (
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() =>
                            speak(question.questions[currentIndex].question)
                        }
                    >
                        🔊 Lire la question
                    </button>
                )}
            </div>

            <Questions
                question={question}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}


            />
        </div>
    );
}

export default App;