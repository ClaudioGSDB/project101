'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';

function ChatBox(){
    const [message, setMessage] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const onType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendPrompt(message);
            setMessage('');
        }
    }

    async function sendPrompt(prompt: string){
        try {

            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'prompt': prompt
                })
            });

            const data = await response.json();
            setChatResponse(data.message);

        } catch (error){
            console.error(error);
        }
    }

    return (
        <>
            <Input 
                type="text" 
                placeholder="message gemini" 
                value={message} 
                onChange={onType} 
                onKeyDown={onKeyPress}
            />
            <p>
                {chatResponse}
            </p>
        </>
    );
}

export { ChatBox };