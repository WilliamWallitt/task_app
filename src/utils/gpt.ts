export interface GPTRequest {
    messages: GPTChatMessage[];
    model: GPTRequestModel;
    temperature?: number;
}

export type GPTRequestModel = "o3-mini-2025-01-31" | "gpt-3.5-turbo" | "ft:gpt-3.5-turbo-0125:discover-ai::A5ZOCH3w" | "ft:gpt-3.5-turbo-0125:discover-ai::AONxFHfQ"

export interface GPTChatMessage {
    role: string;
    content: string;
}

export interface GPTChatError {
    error: {
        code: string;
        message: string;
        param: string;
        type: string;
    }
}

export const GetGPTRequest = (request: GPTRequest, callback: (message: GPTChatMessage) => void) => {
    const init: RequestInit = {
        headers: {
            'Authorization': 'Bearer sk-svcacct-5DtNLtLMQoc1O_xLey-Ehh-Ljx20ja_n3bSRTusklfEGgvVO9R1LuZnuXRhshSMDK61T3BlbkFJwkDagrJ8rm8yrR8SZkhHLRXfQZPOy7MJq4A5tP9yHfLria6OA1_3tNlFJMOZZ1mIi4gA',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request)
    }

    fetch('https://api.openai.com/v1/chat/completions', init)
        .then(response => {

            if (!response.ok) {

                return response.json().then(errorData => {
                    // Check if the response status is 400 Bad Request
                    if (response.status === 400) {
                        throw new Error(JSON.stringify(errorData));
                    }
                    // Handle other errors here
                    throw new Error('Something went wrong');
                });
            }
            return response.json()
        })
        .then(d => d.choices[0].message)
        .then((msg: GPTChatMessage) => callback(msg))
        .catch(error => {
            try {
                const errorData = JSON.parse(error.message) as GPTChatError;
                // Handle the specific error response here
                callback({role: 'err', content: errorData.error.message})
            } catch (parseError) {
                // Handle non-JSON error responses here
                callback({role: 'err', content: "Something went wrong"})
            }
        })
}