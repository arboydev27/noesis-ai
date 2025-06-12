import axios from 'axios';
import http from 'node:http';

/** One keep-alive agent reused by every call */
const keepAliveAgent = new http.Agent({ keepAlive: true });

export default class LLMService {
    // Generattion method => This method is used to generate a full response from the LLM
    static async generateResponse(prompt: string): Promise<string> {
        const response = await axios.post('http://127.0.0.1:11434/api/generate', {
            model: 'llama3.2',
            prompt,
            stream: false,
        },
        { httpAgent: keepAliveAgent } // Use the keep-alive agent for HTTP requests
    )
        return response.data.response
    }
}

