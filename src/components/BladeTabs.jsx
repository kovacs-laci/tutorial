import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '../css/BladeTabs.css';

function CodeBlockWithCopy({ code }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="blade-codeblock">
            <button
                className={`blade-copy-btn ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
                aria-label="Másolás a vágólapra"
                title="Másolás"
            >
                {/* Copy icon */}
                <svg className="copy-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                    />
                </svg>

                {/* Success icon */}
                <svg className="success-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                    />
                </svg>
            </button>

            <pre>
        <code className="language-blade">{code}</code>
      </pre>
        </div>
    );
}

export default function BladeTabs({ plain, bootstrap, tailwind }) {
    return (
        <Tabs defaultValue="plain">
            <TabItem value="plain" label="Alap">
                <CodeBlockWithCopy code={plain} />
            </TabItem>

            <TabItem value="bootstrap" label="Bootstrap">
                <CodeBlockWithCopy code={bootstrap} />
            </TabItem>

            <TabItem value="tailwind" label="Tailwind">
                <CodeBlockWithCopy code={tailwind} />
            </TabItem>
        </Tabs>
    );
}
