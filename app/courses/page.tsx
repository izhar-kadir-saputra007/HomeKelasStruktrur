// app/courses/page.tsx
import Link from 'next/link';
import { getAllCourses } from '@/lib/tutor-api';

export default async function CoursesPage() {
  let courses: any[] = [];
  let error = null;

  try {
    // Panggil API - sekarang akan mengembalikan array posts langsung
    courses = await getAllCourses(1, 20);
    console.log('Courses loaded:', courses.length);
  } catch (err: any) {
    console.error('Failed to fetch courses:', err);
    error = err.message || 'Gagal memuat daftar kursus. Silakan coba lagi nanti.';
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Belum ada kursus yang tersedia.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Daftar Kursus</h1>
      <div style={{ 
        display: 'grid', 
        gap: '20px', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' 
      }}>
        {courses.map((course: any) => (
          <div key={course.ID} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            {course.thumbnail_url && (
              <img 
                src={course.thumbnail_url} 
                alt={course.post_title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} 
              />
            )}
            <h2>{course.post_title || 'No title'}</h2>
            {course.post_excerpt && (
              <div dangerouslySetInnerHTML={{ __html: course.post_excerpt.substring(0, 150) + '...' }} />
            )}
            {course.ratings && course.ratings.rating_avg > 0 && (
              <div style={{ color: '#f5a623', margin: '10px 0' }}>
                ⭐ {course.ratings.rating_avg} / 5 ({course.ratings.rating_count} ulasan)
              </div>
            )}
            <Link 
              href={`/courses/${course.ID}`} 
              style={{ display: 'inline-block', marginTop: '10px', color: 'blue', textDecoration: 'none' }}
            >
              Lihat Detail →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}