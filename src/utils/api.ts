import axios from 'axios'

const API_BASE_URL = 'https://api.deepseek.com/v1'

export const analyzeCV = async (fileContent: string) => {
  try {
    console.log('Sending request to DeepSeek API...')
    const response = await axios.post(
      `${API_BASE_URL}/analyze`,
      {
        file_content: fileContent,
        analysis_type: 'cv_analysis'
      },
      {
        headers: {
          'Authorization': `Bearer sk-6712f0ee93394635958971746ab8c713`,
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      }
    )
    console.log('API Response:', response.data)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`)
      } else if (error.request) {
        throw new Error('No response received from the API server')
      } else {
        throw new Error(`Request setup error: ${error.message}`)
      }
    }
    throw new Error('Failed to analyze CV')
  }
}
