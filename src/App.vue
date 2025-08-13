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
import api from "./api"; // axios 인스턴스 가져오기

const question = ref("");
const answer = ref("");
const loading = ref(false);

async function askAI() {
  if (!question.value.trim()) return;
  loading.value = true;
  answer.value = "";

  try {
    const res = await api.post("", {
      contents: [
        {
          parts: [
            {
              text: question.value,
            },
          ],
        },
      ],
    });

    if (
      res.data.candidates &&
      res.data.candidates[0] &&
      res.data.candidates[0].content
    ) {
      answer.value = res.data.candidates[0].content.parts[0].text;
    } else {
      answer.value = "응답을 처리할 수 없습니다.";
    }
  } catch (err: any) {
    console.error("API 오류:", err);
    if (err.response) {
      answer.value = `오류: ${err.response.status} - ${
        err.response.data?.error?.message || "알 수 없는 오류"
      }`;
    } else {
      answer.value = "네트워크 오류가 발생했습니다.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
