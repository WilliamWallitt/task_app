import {UserWithImage} from "~/redux/state";
import {Task} from "~/components/tasks";

export function generateTaskTitlePrompt(task: string): string {
    return `Using the below task description, which is a programming problem for a **Python student**, generate a clear, concise title for that task. Include only the title. \n ${task}`;
}

export function generateTaskPrompt(user: UserWithImage): string {
    return `
You are tasked with creating a Python coding challenge for a developer.

Here is the full developer profile:

- Name: ${user.name}
- Skill Level: ${mapLevelToString(user.level)} (Level ${user.level})
- Objective: ${user.objective}
- Preferred Topics: ${user.preferredTopics || 'None'}
- Strengths: ${user.strengths || 'None'}
- Weaknesses: ${user.weaknesses || 'None'}
- Learning Goals: ${user.learningGoals || 'None'}
- Available Time Per Task: ${user.timePerTaskMinutes ? `${user.timePerTaskMinutes} minutes` : 'Not specified'}
- Preferred Difficulty: ${user.preferredDifficulty || 'Not specified'}
- Task Type Preference: ${user.taskTypePreference || 'Not specified'}
- Preferred Coding Style: ${user.codingStyle || 'Not specified'}
- Target Python Version: ${user.pythonVersion || 'Not specified'}
- Prefers Focus on Code Quality: ${user.prefersCodeQuality ? 'Yes' : 'No'}
- Risk Tolerance: ${user.riskTolerance || 'Not specified'}
- Personality Type: ${user.personalityType || 'Not specified'}

Based on this information:

- The developer has a **clear long-term goal**. Design a task that builds **incrementally toward that goal**, focusing on just **one foundational concept or technique**.
- The current task should reflect the developer’s **skill level**, **learning goals**, and **available time**.
- The task must be **practical** and **relevant to their interests**, helping them progress toward automating a PnL report or sending stock recommendations.
- Do **not** summarize or attempt to solve the full long-term goal in this task — break it down and focus on **one achievable skill** at a time.
- Do **not** use any external libraries (e.g., pandas, requests, FastAPI) unless they are explicitly mentioned in the developer’s profile.
- Assume the developer is working only with **standard Python 3.11 libraries**, unless otherwise specified.
- If the task requires data (e.g., for sorting, searching, statistics, or parsing), include clear instructions to **generate the data in a helper function**.
- Avoid preloaded datasets, CSVs, or API calls unless explicitly allowed.
- Encourage **good error handling**, and optionally, **unit tests**.
- Promote use of **${user.codingStyle || 'appropriate'} coding style**.
- The task should be solvable within approximately **${user.timePerTaskMinutes || 30} minutes**.
- **Do not include the solution** — only write the task description.
- **Write the task in numbered steps**
- The task description should be **structured**, **professional**, and **easy to follow**, written in **4–6 concise sentences**.
- Avoid fictional or overly abstract scenarios — keep it practical and motivating.

Your goal is to help the developer take one meaningful, achievable step toward their broader objective.
`;
}


export function generateProgrammingNotesPrompt(user: UserWithImage, task: { title: string, task: string }): string {
    return `
You are an expert Python tutor helping a developer complete a Python coding task.

Here is the developer's profile:

- Name: ${user.name}
- Skill Level: ${mapLevelToString(user.level)} (Level ${user.level})
- Objective: ${user.objective}
- Preferred Topics: ${user.preferredTopics || 'None'}
- Strengths: ${user.strengths || 'None'}
- Weaknesses: ${user.weaknesses || 'None'}
- Learning Goals: ${user.learningGoals || 'None'}
- Preferred Coding Style: ${user.codingStyle || 'Not specified'}
- Preferred Task Type: ${user.taskTypePreference || 'Not specified'}
- Preferred Difficulty: ${user.preferredDifficulty || 'Not specified'}
- Python Version: ${user.pythonVersion || '3.11'}

Here is the task the user has been given:

Title: ${task.title}
Description: ${task.task.trim()}

Write clear and concise **Python programming notes** that this developer can refer to while solving the task. These notes should:

1. Be tailored to their current **level and learning goals**.
2. Help them **overcome known weaknesses** and reinforce strengths.
3. Include **code snippets** or conceptual explanations if useful.
4. Use **only standard libraries**, unless explicitly stated otherwise.
5. Focus only on what's relevant to **solving this task** — no filler.
6. Use consistent formatting: group by headings (e.g., "Working with Lists", "String Manipulation", "Basic Error Handling").
7. Keep the notes **brief and focused**, with no more than **3 short sections**.

Avoid giving away the solution. Keep the notes instructive and empowering.
`;
}



// Helper to map user level to readable string
function mapLevelToString(level: number): string {
    if (level <= 1) return "Beginner"
    if (level === 2) return "Intermediate"
    if (level >= 3) return "Advanced"
    return "Unknown"
}