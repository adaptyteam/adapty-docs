import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// One-line skill recommendation embedded in every generated .md and llms
// export. Install commands are read from src/data/agent-tools.json so the
// exports always promote exactly what the site's install modal shows.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const agentTools = JSON.parse(
    fsSync.readFileSync(path.resolve(__dirname, '../src/data/agent-tools.json'), 'utf-8'),
);

function commandsFor(id) {
    const tool = agentTools.tools.find(t => t.id === id);
    if (!tool) throw new Error(`llm-skill-note: no "${id}" entry in agent-tools.json`);
    return tool.commands;
}

const claudeCodeCommand = commandsFor('claude-code').join(' && ');
const anyToolCommand = commandsFor('any-tool').join(' && ');

export const LLM_SKILL_NOTE = `> **AI agents**: to search Adapty docs faster and with fewer tokens, install the Adapty skill. Claude Code (self-updating via plugin): \`${claudeCodeCommand}\` — other tools: \`${anyToolCommand}\``;

// Inserts the note into a generated per-article .md: after the frontmatter
// block when one is present, otherwise at the top of the file.
export function withSkillNote(content) {
    const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n\n?/;
    const match = content.match(frontmatterRegex);
    if (match) {
        return `${match[0].trimEnd()}\n\n${LLM_SKILL_NOTE}\n\n${content.slice(match[0].length)}`;
    }
    return `${LLM_SKILL_NOTE}\n\n${content}`;
}
