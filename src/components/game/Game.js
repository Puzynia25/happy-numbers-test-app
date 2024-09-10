import classNames from "classnames";
import "./game.scss";
import { useState } from "react";

const Game = ({ N }) => {
    const [completedTasks, setCompletedTasks] = useState([]); // Массив завершённых примеров
    const [currentNumber, setCurrentNumber] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const [showNewTask, setShowNewTask] = useState(true);
    const [answerStatus, setAnswerStatus] = useState(null); // Для управления цветом кнопки

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            checkAnswer();
        }
    };

    const checkAnswer = () => {
        const result = currentNumber * N;
        if (result === +inputValue) {
            const currentTask = { number: currentNumber, result };
            setCompletedTasks((prevTasks) => [...prevTasks, currentTask]); //добавляем текущий пример в массив решенных примеров
            setAnswerStatus(true);
            setShowNewTask(false);
            setCurrentNumber((prev) => prev + 1);
            setInputValue("");
            setTimeout(() => {
                if (currentNumber < 10) {
                    setShowNewTask(true); // показываем новый пример с анимацией
                }
                setAnswerStatus(null);
            }, 500);
        } else {
            setWrongAnswer(true);
            setAnswerStatus(false); //  устанавливаем состояние для неправильного ответа
            setTimeout(() => {
                setWrongAnswer(false);
                setAnswerStatus(null);
            }, 1000);
        }
    };

    const inputClass = classNames("input", {
        input__wrong: wrongAnswer,
    });

    const btnClass = classNames("button", {
        button__right: answerStatus === true,
        button__wrong: answerStatus === false,
    });

    const renderCubes = (N) => {
        return Array.from({ length: N }, (item, index) => {
            return <div key={index} className="cube"></div>;
        });
    };

    const cubes = renderCubes(N);

    const renderFinishedTasks = () => {
        return completedTasks.map((task, index) => {
            return (
                <div key={index} className="row mt-2 align-items-center">
                    <div className="col d-flex justify-content-center">
                        <div className="w-25">
                            {N} × {task.number} = <span>{task.result}</span>
                        </div>
                    </div>
                    <div className="col animate__animated animate__bounceInUp animate__faster">
                        {/* Cube with animation when the answer is correct */}
                        <div className="d-flex justify-content-center gap-2">{cubes}</div>
                    </div>
                </div>
            );
        });
    };

    const tasks = completedTasks.length > 0 ? renderFinishedTasks() : null;

    return (
        <div>
            <div className="container">
                {tasks}
                {showNewTask && (
                    <div className="row mt-2 align-items-center">
                        <div className="col animate__animated animate__fadeIn animate__faster d-flex justify-content-center">
                            <div className="d-flex align-items-center w-25">
                                <span>
                                    {N} × {currentNumber} =&nbsp;
                                </span>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                    className={inputClass}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                )}
            </div>
            <div className="text-center mt-5">
                <button className={btnClass} disabled={inputValue === ""}>
                    Done
                </button>
            </div>
        </div>
    );
};

export default Game;
