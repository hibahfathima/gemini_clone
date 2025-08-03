import React, {  useState } from 'react';
import { assets } from '../assets/assets';
import './main.css';
import { URL } from './constants';
import Answer from './Answer';
import { useAppContext } from '../AppContext';

function Main() {
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const{questionArray,setQuestionArray}=useAppContext()

    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: question,
                    },
                ],
            },
        ],
    };

    const askQuestion = async () => {
        if (!question.trim()) return;

        const userMessage = { role: 'user', content: question };
        setChatHistory((prev) => [...prev, userMessage]);

        try {
            let response = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            response = await response.json();

            let data = response.candidates[0].content.parts[0].text;
            const botMessage = { role: 'assistant', content: data.trim() };

            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { role: 'assistant', content: 'Something went wrong. Please try again.' };
            setChatHistory((prev) => [...prev, errorMessage]);
        }
setQuestionArray(prev=>[...prev,question])
        setQuestion('');
       
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemiai</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                <div className="scroll-area">
                    {chatHistory.length === 0 ? (
                        <div className="greet">
                            <p><span>hello, hiba</span></p>
                            <p>How can I help you?</p>
                        </div>
                    ) : (
                        chatHistory.map((msg, index) => (
                            <Answer key={index} role={msg.role} content={msg.content} />
                        ))
                    )}
                </div>

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Enter your prompt"
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" onClick={askQuestion} />
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people. Double check its responses.
                        Your Privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
