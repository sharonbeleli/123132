import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState(generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState([]);

  function generateQuestions() {
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const additionQuestions = Array(3).fill(null).map(() => {
      const a = randomNumber(0, 10);
      const b = randomNumber(0, 10);
      return { question: `כמה זה ${a} + ${b}?`, answer: a + b };
    });

    const subtractionQuestions = Array(3).fill(null).map(() => {
      const a = randomNumber(0, 10);
      const b = randomNumber(0, a);
      return { question: `כמה זה ${a} - ${b}?`, answer: a - b };
    });

    const wordQuestions = [
      { question: "לדנה היו 8 תפוחים. היא נתנה 3 לחברתה. כמה נשארו לה?", answer: 5 },
      { question: "ליוסי יש 5 כדורים. חברו נתן לו 4 נוספים. כמה יש לו עכשיו?", answer: 9 },
      { question: "לליה יש 10 ממתקים. היא חילקה 6 לחבריה. כמה ממתקים נשארו לה?", answer: 4 },
      { question: "לאורן היו 7 ספרים. הוא קיבל עוד 2 מאחיו. כמה ספרים יש לאורן עכשיו?", answer: 9 },
    ];

    return [...additionQuestions, ...subtractionQuestions, ...wordQuestions];
  }

  const handleAnswerSubmit = () => {
    const isCorrect = parseInt(currentAnswer, 10) === questions[currentIndex].answer;
    setFeedback(isCorrect);
    setResults([
      ...results,
      {
        question: questions[currentIndex].question,
        givenAnswer: currentAnswer,
        correct: isCorrect,
      },
    ]);

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setCurrentAnswer('');
        setFeedback(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setCurrentAnswer('');
    setFeedback(null);
    setShowResults(false);
    setCorrectCount(0);
    setResults([]);
  };

  return (
    <div className="app">
      <h1>הכנה למבחן כיתה א' - תרגילי חשבון</h1>

      {!showResults ? (
        <div>
          <p>{questions[currentIndex].question}</p>
          <input
            type="number"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
          {feedback === false && <p>✖ תשובה שגויה, נסה שוב</p>}
          {feedback === true && <p>✔ תשובה נכונה!</p>}
          <button onClick={handleAnswerSubmit}>שלח תשובה</button>
        </div>
      ) : (
        <div>
          <h2>תוצאות:</h2>
          <table>
            <thead>
              <tr>
                <th>שאלה</th>
                <th>תשובה שהוקלדה</th>
                <th>תוצאה</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.question}</td>
                  <td>{result.givenAnswer}</td>
                  <td>{result.correct ? '✔ נכון' : '✖ שגוי'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>ענית נכון על {correctCount} מתוך {questions.length} שאלות.</p>
          <button onClick={resetGame}>התחל מחדש</button>
        </div>
      )}
    </div>
  );
};

export default App;
