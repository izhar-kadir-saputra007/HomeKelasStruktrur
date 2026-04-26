// lib/tutor-api.js
const API_BASE_URL = 'https://kelasstruktur.com/wp-json/tutor/v1';

// 🔥 GANTI DENGAN API KEY DARI WORDPRESS ANDA
const API_KEY = 'key_1f979be82ea4fc2c662ff6dca9389aae';
const SECRET_KEY = 'secret_9ae782dd01d0d08a4b08ce2f19b7df0c548634773579ee91be06a4e0b1d09d50';

// Buat token Basic Auth
const authToken = btoa(`${API_KEY}:${SECRET_KEY}`);

async function fetchAPI(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Basic ${authToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

export async function getAllCourses(page = 1, perPage = 12) {
  const response = await fetchAPI(`/courses?page=${page}&per_page=${perPage}`);
  
  // 🔥 PERBAIKIAN UTAMA: Deteksi format response Tutor LMS
  // Format yang benar: { code: "success", data: { posts: [...] } }
  if (response && response.code === 'success' && response.data) {
    if (response.data.posts && Array.isArray(response.data.posts)) {
      return response.data.posts;
    }
    // Cek kemungkinan struktur lain
    if (Array.isArray(response.data)) {
      return response.data;
    }
  }
  
  // Format alternatif: array langsung (jika API berubah di masa depan)
  if (Array.isArray(response)) {
    return response;
  }
  
  // Format alternatif: response dengan properti posts langsung
  if (response && response.posts && Array.isArray(response.posts)) {
    return response.posts;
  }
  
  // Jika tidak dikenal, kembalikan array kosong dan log untuk debugging
  console.error('[Tutor API] Unknown response format:', JSON.stringify(response, null, 2));
  return [];
}

export async function getCourseById(courseId) {
  const response = await fetchAPI(`/courses/${courseId}`);
  
  // Handle format response untuk single course
  if (response && response.code === 'success' && response.data) {
    return response.data;
  }
  return response;
}

export async function getCourseTopics(courseId) {
  const response = await fetchAPI(`/topics?course_id=${courseId}`);
  return response;
}

export async function getCourseRating(courseId) {
  const response = await fetchAPI(`/course-rating/${courseId}`);
  return response;
}