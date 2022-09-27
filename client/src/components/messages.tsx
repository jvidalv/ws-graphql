import React from 'react';
import { useSubscription } from 'urql';

const newMessages = `
  subscription {
    names
  }
`;

const handleSubscription = (messages = [], response) => {
    console.log(response, messages)
    return [response.name, ...messages];
};

const Messages = () => {
    const [res] = useSubscription({ query: newMessages }, handleSubscription);
    console.log(res)
    if (!res.data) {
        return <p>No new messages</p>;
    }

    return (
        <ul>
            {res.data.map(message => (
                <p key={message}>
                    {message}: "{message}"
                </p>
            ))}
        </ul>
    );
};

export default Messages