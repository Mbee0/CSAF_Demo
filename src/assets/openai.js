import { OpenAI } from 'openai'

// i put mine but need to take down i think?
const key = 'yourkey'

const configuration = {
    apiKey: key,
    dangerouslyAllowBrowser: true
}

const openai = new OpenAI(configuration)

export default openai
