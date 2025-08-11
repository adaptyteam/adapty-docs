import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function MigrationExample({before, after, beforeTitle = "Before", afterTitle = "After"}) {
    return (
        <div className="migration-example">
            <div className="migration-card before">
                <div className="migration-header">
                    <span className="migration-badge before-badge">{beforeTitle}</span>
                </div>
                <CodeBlock language={before.language}>
                    {before.code}
                </CodeBlock>
            </div>

            <div className="migration-arrow"></div>

            <div className="migration-card after">
                <div className="migration-header">
                    <span className="migration-badge after-badge">{afterTitle}</span>
                </div>
                <CodeBlock language={after.language}>
                    {after.code}
                </CodeBlock>
            </div>
        </div>
    );
}