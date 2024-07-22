import { useState } from "react";

const Latihan = ({ data }) => {
    const [inputAnswer, setInputAnswer] = useState({});
    const [result, setResult] = useState({});

    const handleChange = (questionId, event) => {
        const cleanedValue = event.target.value.replace(/[^a-zA-ZığüşöçĞÜŞÖÇıİ]/g, '');
        setInputAnswer(prevState => ({
            ...prevState,
            [questionId]: cleanedValue
        }));
    };

    const handleKeyDown = (event, questionId) => {
        if (event.key === "Enter") {
            checkAnswer(questionId);
        }
    };

    const checkAnswer = (questionId) => {
        const userAnswer = inputAnswer[questionId];
        const correctAnswer = data.latihan.item.find(question => question.id === questionId).answer;
        const isCorrect = userAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        setResult(prevState => ({
            ...prevState,
            [questionId]: isCorrect
        }));
    };

    return (
        <>
            {data?.latihan && (
                <>
                <div className="font-bold justify">Latihan</div>
                <div className="text-justify indent-6">
                    <div dangerouslySetInnerHTML={{ __html: data?.latihan?.petunjuk }} />
                </div>
                <div className="flex flex-col gap-2">
                    {data?.latihan?.item.map((question) => {
                        const kalimat = question.question;
                        const posisiInput = kalimat.indexOf(question.input);
                        const kalimatAwal = kalimat.slice(0, posisiInput + question.input.length);
                        const kalimatAkhir = kalimat.slice(posisiInput + question.input.length);

                        return (
                            <div className="flex flex-row justify-between items-center" key={question.id}>
                                <div className="items-center">
                                    {kalimatAwal}
                                    <input
                                        className="border-b border-black"
                                        type="text"
                                        style={{ width: "75px" }}
                                        onChange={(event) => handleChange(question.id, event)}
                                        onKeyDown={(event) => handleKeyDown(event, question.id)}
                                    />
                                    {kalimatAkhir}
                                    {Object.keys(result).length !== 0 && (
                                        result[question.id] !== undefined && (
                                            result[question.id] === null ? (
                                                <span style={{ marginLeft: "10px", color: "black" }}>Masukkan jawaban Anda</span>
                                            ) : (
                                                <span style={{ marginLeft: "10px", color: result[question.id] ? "green" : "red" }}>
                                                    {result[question.id] ? "Benar" : "Salah"}
                                                </span>
                                            )
                                        )
                                    )}
                                </div>
                                <div
                                    className="bg-primary1 px-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer content-center"
                                    onClick={() => checkAnswer(question.id)}
                                >
                                    cek
                                </div>
                            </div>
                        );
                    })}
                </div>
                </>
            )}
        </>
    );
};

export default Latihan;
