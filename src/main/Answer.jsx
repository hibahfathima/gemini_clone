import React from 'react';
import './main.css';

function Answer({ content, role }) {
    if (!content || typeof content !== 'string') return null;

    const isUser = role === 'user';

    // Helper: Remove Markdown symbols
    const clean = (text) => text.replace(/\*\*/g, '').replace(/\*/g, '').trim();

    // Split by lines to format heading/subheading/paragraph
    const lines = content.split('\n').filter(line => line.trim() !== '');

    return (
        <div style={{ paddingBottom: '20px' }}>
            {isUser ? (
                <div
                    style={{
                        textAlign: 'right',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        background: '#e0f7fa',
                        borderRadius: '12px',
                        maxWidth: '70%',
                        margin: '10px auto 10px 30%',
                        wordBreak: 'break-word',
                    }}
                >
                    {clean(content)}
                </div>
            ) : (
                <div
                    style={{
                        textAlign: 'left',
                        background: '#f8f8f8',
                        borderRadius: '12px',
                        padding: '15px 20px',
                        maxWidth: '80%',
                        margin: '10px 30% 10px auto',
                        wordBreak: 'break-word',
                        lineHeight: '1.6',
                    }}
                >
                    {lines.map((line, index) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginTop: '20px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {clean(trimmed)}
                                </div>
                            );
                        } else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        fontSize: '16px',
                                        marginLeft: '20px',
                                        marginBottom: '8px',
                                    }}
                                >
                                    • {clean(trimmed)}
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        fontSize: '15px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {clean(trimmed)}
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default Answer;
