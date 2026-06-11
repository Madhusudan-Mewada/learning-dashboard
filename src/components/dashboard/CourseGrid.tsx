import { createServerSupabaseClient } from "@/lib/supabase";
import { MOCK_COURSES } from "@/lib/data";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Course } from "@/types";

async function fetchCourses(): Promise<{ data: Course[]; error: string | null }> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      return { data: MOCK_COURSES, error: null };
    }
    return { data, error: null };
  } catch (err) {
    // Fallback to mock data if Supabase not configured
    console.warn("Supabase fetch failed, using mock data:", err);
    return { data: MOCK_COURSES, error: null };
  }
}

export async function CourseGrid() {
  const { data: courses } = await fetchCourses();

  return (
    <>
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </>
  );
}
