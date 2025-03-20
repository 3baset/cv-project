<script setup lang="ts">
import { ref } from 'vue'
import { analyzeCV } from '../utils/api'

const file = ref<File | null>(null)
const errorMessage = ref('')
const isLoading = ref(false)
const analysisResult = ref<any>(null)

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  file.value = input.files[0]
  errorMessage.value = ''
  analysisResult.value = null
  isLoading.value = true

  try {
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.value.type)) {
      throw new Error('Unsupported file type. Please upload a PDF or DOCX file.')
    }

    if (file.value.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit.')
    }

    const fileContent = await readFileContent(file.value)
    const response = await analyzeCV(fileContent)
    
    if (response && response.success) {
      analysisResult.value = {
        hrScore: response.scores?.hr_score || 0,
        satScore: response.scores?.sat_score || 0,
        recommendations: response.recommendations || [],
        strengths: response.strengths || [],
        weaknesses: response.weaknesses || []
      }
    } else {
      throw new Error('Failed to analyze CV. Please try again.')
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Failed to analyze CV'
  } finally {
    isLoading.value = false
  }
}

const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read file content'))
      }
    }
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsText(file)
  })
}
</script>

<template>
  <div class="upload-container">
    <div class="upload-box">
      <input 
        type="file" 
        id="cv-upload" 
        accept=".pdf,.docx" 
        @change="handleFileUpload"
      />
      <label for="cv-upload" class="upload-label">
        <span v-if="!file">Drag &amp; drop your CV here or <span class="browse-link">browse</span></span>
        <span v-else>{{ file.name }}</span>
      </label>
    </div>

    <div v-if="isLoading" class="loading-indicator">
      Analyzing your CV...
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="analysisResult" class="analysis-results">
      <h3>Analysis Results</h3>
      <div class="scores">
        <div class="score-item">
          <span class="score-label">HR Score:</span>
          <span class="score-value">{{ analysisResult.hrScore }}</span>
        </div>
        <div class="score-item">
          <span class="score-label">SAT Score:</span>
          <span class="score-value">{{ analysisResult.satScore }}</span>
        </div>
      </div>
      <div class="recommendations">
        <h4>Recommendations</h4>
        <ul>
          <li v-for="(rec, index) in analysisResult.recommendations" :key="index">{{ rec }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.upload-box {
  border: 2px dashed #2563eb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-box input[type="file"] {
  display: none;
}

.upload-label {
  display: block;
  color: #64748b;
  font-size: 1.1rem;
}

.browse-link {
  color: #2563eb;
  text-decoration: underline;
}

.loading-indicator {
  margin-top: 1rem;
  color: #64748b;
  text-align: center;
}

.error-message {
  margin-top: 1rem;
  color: #dc2626;
  text-align: center;
}

.analysis-results {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
}

.scores {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 1rem 0;
}

.score-item {
  text-align: center;
}

.score-label {
  display: block;
  color: #64748b;
  font-size: 0.9rem;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
}

.recommendations h4 {
  margin: 1rem 0 0.5rem;
  color: #1e293b;
}

.recommendations ul {
  list-style: disc;
  padding-left: 1.5rem;
  color: #64748b;
}

.recommendations li {
  margin: 0.5rem 0;
}
</style>
