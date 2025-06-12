import ChatMessage from "#models/chat_message";

export async function buildPromptWithHistory(sessionId: number, userMessage: string) {
    const messages = await ChatMessage
        .query()
        .where('session_id', sessionId)
        .orderBy('created_at', 'asc');

    let prompt = '';

    for (const msg of messages) {
        const role = msg.role === 'user' ? 'User' : 'Assistant';
        prompt += `${role}: ${msg.content}\n`;
    }

    prompt += `User: ${userMessage}\nAssistant:`;

    return prompt;
}