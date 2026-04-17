import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Questions from "./questions.jsx";

function App() {
    const [items, setItems] = useState([]);
const [question, setQuestion] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correct, setCorrect] = useState(false);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => {
                setItems(data.quizzes); // ✅ correction ici
            })
            .catch((err) => console.error(err));
    }, []);
    const handleclick = (items) => {
       setQuestion(items);

    }
    useEffect(() => {
        setSelected(null);
    }, [currentIndex]);
    const handleResponse = (opt) => {
        setSelected(opt);
       if (opt == question.questions[currentIndex].answer){
         setCorrect(true)
       }else{
          setCorrect(false)
       }
    }
    const handleChoice = () => {
        if (correct) {
            alert("Correct answer");
        } else {
            alert("Incorrect answer");
        }
        setCurrentIndex(currentIndex + 1);
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

                <p>Question {currentIndex} of 10 </p>
                <h1 className="text-white text-center">
                    {question?.questions?.[currentIndex]?.question || "Welcome to the frontend quiz"}
                </h1>

                <ul className="list-unstyled p-0 m-0 mt-4">
                    {question?.questions?.[currentIndex]?.options?.length > 0
                        ? question.questions[currentIndex].options.map((opt, index) => (
                            <li
                                key={index}
                                className={`d-flex align-items-center m-2 choice ${
                                    selected === opt ? "bg-primary text-white" : ""
                                }`}
                                onClick={() => handleResponse(opt)}
                            >
                                {opt}
                            </li>
                        ))
                        : items.map((item, index) => (
                            <li
                                key={index}
                                className="d-flex align-items-center m-2 choice"
                                onClick={() => handleclick(item)}
                            >
                                {item.icon && <img src={item.icon} alt={item.title} />}
                                {item.title}
                            </li>
                        ))}
                </ul>
                <button className="btn btn-primary mt-4" onClick={() => handleChoice()}>
                    Submit answers
                </button>
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