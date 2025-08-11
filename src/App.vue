<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <h1 class="text-3xl font-bold text-blue-500 mb-4">Gemini AI Chat</h1>

    <input
      v-model="question"
      @keyup.enter="askAI"
      class="w-full max-w-md p-2 border rounded mb-4"
      placeholder="AI에게 질문을 입력하세요..."
    />

    <button
      @click="askAI"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      질문하기
    </button>

    <div v-if="loading" class="mt-4 text-gray-500">답변 생성 중...</div>
    <div v-if="answer" class="mt-4 p-4 bg-white shadow rounded max-w-md">
      {{ answer }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const question = ref("");
const answer = ref("");
const loading = ref(false);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

async function askAI() {
  if (!question.value.trim()) return;
  loading.value = true;
  answer.value = "";

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: question.value }] }],
      }
    );
    answer.value = res.data.candidates[0].content.parts[0].text;
  } catch (err) {
    answer.value = "오류가 발생했습니다.";
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped></style>
