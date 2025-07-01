import type { Lesson } from "@/types/lesson"
import type { Chapter } from "@/types/chapter"
import type { Clazz } from "@/types/clazz"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8084"
const API_TIMEOUT = 5000 // Tăng timeout lên 5 giây

// Hàm helper để tạo options cho fetch
const createFetchOptions = (options: RequestInit = {}): RequestInit => ({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  ...options,
})

// Hàm helper để xử lý response
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    });
    throw new Error(`API returned status: ${response.status}`);
  }
  return response.json();
};

// ------------------- CLASSES (CLAZZ) API -------------------

// Hàm lấy danh sách tất cả các lớp
export async function getAllClazzes(): Promise<{ clazzes: Clazz[]; isUsingMockData: boolean }> {
  try {
    console.log("Attempting to fetch all classes from API");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/v1/clazz`, createFetchOptions({
      signal: controller.signal,
      cache: 'no-store',
    }));
    
    clearTimeout(timeoutId);
    
    const data = await handleResponse(response);
    console.log("Successfully fetched classes data from API:", data);
    
    return {
      clazzes: data,
      isUsingMockData: false,
    };
  } catch (error) {
    console.warn(`Error fetching classes from API: ${error}. Using mock data instead.`);
    
    return {
      clazzes: getMockClazzes(),
      isUsingMockData: true,
    };
  }
}

// Hàm lấy thông tin của một lớp cụ thể
export async function getClazz(id: string | number): Promise<{ clazz: Clazz; isUsingMockData: boolean }> {
  const clazzId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  
  if (isNaN(clazzId)) {
    throw new Error(`Invalid class ID: ${id}`);
  }
  
  try {
    console.log(`Attempting to fetch class with ID: ${clazzId} from API`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/v1/clazz/${clazzId}`, createFetchOptions({
      signal: controller.signal,
      cache: 'no-store',
    }));
    
    clearTimeout(timeoutId);
    
    const data = await handleResponse(response);
    console.log("Successfully fetched class data from API:", data);
    
    return {
      clazz: data,
      isUsingMockData: false,
    };
  } catch (error) {
    console.warn(`Error fetching class from API: ${error}. Using mock data instead.`);
    
    return {
      clazz: getMockClazz(clazzId),
      isUsingMockData: true,
    };
  }
}

// Hàm tạo một lớp mới
export async function createClazz(clazzData: Omit<Clazz, 'id'>): Promise<Clazz> {
  try {
    console.log("Attempting to create a new class with data:", clazzData);
    const response = await fetch(`${API_BASE_URL}/v1/clazz`, createFetchOptions({
      method: 'POST',
      body: JSON.stringify(clazzData),
    }));
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error creating class: ${error}`);
    throw error;
  }
}

// Hàm cập nhật thông tin một lớp
export async function updateClazz(id: number, clazzData: Partial<Omit<Clazz, 'id'>>): Promise<Clazz> {
  try {
    console.log(`Attempting to update class with ID: ${id} with data:`, clazzData);
    const response = await fetch(`${API_BASE_URL}/v1/clazz/${id}`, createFetchOptions({
      method: 'PUT',
      body: JSON.stringify(clazzData),
    }));
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error updating class with ID ${id}: ${error}`);
    throw error;
  }
}

// Hàm xóa một lớp
export async function deleteClazz(id: number): Promise<void> {
  try {
    console.log(`Attempting to delete class with ID: ${id}`);
    const response = await fetch(`${API_BASE_URL}/v1/clazz/${id}`, createFetchOptions({
      method: 'DELETE',
    }));
    if (!response.ok) {
      // handleResponse expects JSON, but DELETE might not return a body
      throw new Error(`API returned status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting class with ID ${id}: ${error}`);
    throw error;
  }
}

// ------------------- CHAPTERS API -------------------

// Hàm lấy danh sách tất cả các chương
export async function getAllChapters(): Promise<{ chapters: Chapter[]; isUsingMockData: boolean }> {
  try {
    console.log("Attempting to fetch all chapters from API");
    
    // This is inefficient. A real backend should provide an endpoint to get all chapters.
    const { clazzes } = await getAllClazzes();
    let allChapters: Chapter[] = [];
    for (const clazz of clazzes) {
      const { chapters } = await getChaptersByClazz(clazz.id);
      allChapters = [...allChapters, ...chapters];
    }
    
    return {
      chapters: allChapters,
      isUsingMockData: false, // This is partially true
    };
  } catch (error) {
    console.warn(`Error fetching all chapters from API: ${error}. Using mock data instead.`);
    return {
      chapters: [], // Or some mock data
      isUsingMockData: true,
    };
  }
}

// Hàm lấy danh sách tất cả các chương của một lớp
export async function getChaptersByClazz(clazzId: string | number): Promise<{ chapters: Chapter[]; isUsingMockData: boolean }> {
  const classId = typeof clazzId === "string" ? Number.parseInt(clazzId, 10) : clazzId;
  
  if (isNaN(classId)) {
    throw new Error(`Invalid class ID: ${clazzId}`);
  }
  
  try {
    console.log(`Attempting to fetch chapters for class ID: ${classId} from API`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/v1/chapter/by-clazz/${classId}`, createFetchOptions({
      signal: controller.signal,
      cache: 'no-store',
    }));
    
    clearTimeout(timeoutId);
    
    const data = await handleResponse(response);
    console.log("Successfully fetched chapters data from API:", data);
    
    return {
      chapters: data,
      isUsingMockData: false,
    };
  } catch (error) {
    console.warn(`Error fetching chapters from API: ${error}. Using mock data instead.`);
    
    return {
      chapters: getMockChaptersByClazz(classId),
      isUsingMockData: true,
    };
  }
}

// Hàm lấy thông tin của một chương cụ thể
export async function getChapter(id: string | number): Promise<{ chapter: Chapter; isUsingMockData: boolean }> {
  const chapterId = typeof id === "string" ? Number.parseInt(id, 10) : id
  
  if (isNaN(chapterId)) {
    throw new Error(`Invalid chapter ID: ${id}`)
  }
  
  try {
    console.log(`Attempting to fetch chapter with ID: ${chapterId} from API`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)
    
    const response = await fetch(`${API_BASE_URL}/chapter/${chapterId}`, createFetchOptions({
      signal: controller.signal,
      cache: 'no-store',
    }))
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      console.warn(`API returned error status: ${response.status}`)
      throw new Error(`API returned status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log("Successfully fetched chapter data from API")
    
    return {
      chapter: data,
      isUsingMockData: false,
    }
  } catch (error) {
    console.warn(`Error fetching chapter from API: ${error}. Using mock data instead.`)
    
    return {
      chapter: getMockChapter(chapterId),
      isUsingMockData: true,
    }
  }
}

// Hàm tạo một chương mới
export async function createChapter(chapterData: Omit<Chapter, 'id'>): Promise<Chapter> {
    try {
        console.log("Attempting to create a new chapter with data:", chapterData);
        const response = await fetch(`${API_BASE_URL}/v1/chapter`, createFetchOptions({
            method: 'POST',
            body: JSON.stringify(chapterData),
        }));
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error creating chapter: ${error}`);
        throw error;
    }
}

// Hàm cập nhật thông tin một chương
export async function updateChapter(id: number, chapterData: Partial<Omit<Chapter, 'id'>>): Promise<Chapter> {
    try {
        console.log(`Attempting to update chapter with ID: ${id} with data:`, chapterData);
        const response = await fetch(`${API_BASE_URL}/v1/chapter/${id}`, createFetchOptions({
            method: 'PUT',
            body: JSON.stringify(chapterData),
        }));
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error updating chapter with ID ${id}: ${error}`);
        throw error;
    }
}

// Hàm xóa một chương
export async function deleteChapter(id: number): Promise<void> {
    try {
        console.log(`Attempting to delete chapter with ID: ${id}`);
        const response = await fetch(`${API_BASE_URL}/v1/chapter/${id}`, createFetchOptions({
            method: 'DELETE',
        }));
        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting chapter with ID ${id}: ${error}`);
        throw error;
    }
}

// ------------------- LESSONS API -------------------

// Hàm lấy danh sách tất cả các bài học
export async function getAllLessons(): Promise<{ lessons: Lesson[]; isUsingMockData: boolean }> {
    try {
        console.log("Attempting to fetch all lessons from API");

        // This is inefficient. A real backend should provide an endpoint to get all lessons.
        const { chapters } = await getAllChapters();
        let allLessons: Lesson[] = [];
        for (const chapter of chapters) {
            const { lessons } = await getLessonsByChapter(chapter.id);
            allLessons = [...allLessons, ...lessons];
        }

        return {
            lessons: allLessons,
            isUsingMockData: false, // This is partially true
        };
    } catch (error) {
        console.warn(`Error fetching all lessons from API: ${error}. Using mock data instead.`);
        return {
            lessons: [], // Or some mock data
            isUsingMockData: true,
        };
    }
}

// Hàm lấy danh sách tất cả các bài học của một chương
export async function getLessonsByChapter(chapterId: string | number): Promise<{ lessons: Lesson[]; isUsingMockData: boolean }> {
  const chapId = typeof chapterId === "string" ? Number.parseInt(chapterId, 10) : chapterId;
  
  if (isNaN(chapId)) {
    throw new Error(`Invalid chapter ID: ${chapterId}`);
  }
  
  try {
    console.log(`Attempting to fetch lessons for chapter ID: ${chapId} from API`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/v1/lesson/by-chapter/${chapId}`, createFetchOptions({
      signal: controller.signal,
      cache: 'no-store',
    }));
    
    clearTimeout(timeoutId);
    
    const data = await handleResponse(response);
    console.log("Successfully fetched lessons data from API:", data);
    
    return {
      lessons: data,
      isUsingMockData: false,
    };
  } catch (error) {
    console.warn(`Error fetching lessons from API: ${error}. Using mock data instead.`);
    
    return {
      lessons: getMockLessonsByChapter(chapId),
      isUsingMockData: true,
    };
  }
}

// Hàm lấy bài học từ API hoặc dữ liệu mẫu
export async function getLesson(id: string | number): Promise<{ lesson: Lesson; isUsingMockData: boolean }> {
  const lessonId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  
  if (isNaN(lessonId)) {
    throw new Error(`Invalid lesson ID: ${id}`);
  }
  
  try {
    console.log(`Attempting to fetch lesson with ID: ${lessonId} from API`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/v1/lesson/${lessonId}`, createFetchOptions({
      signal: controller.signal,
      cache: 'no-store',
    }));
    
    clearTimeout(timeoutId);
    
    const data = await handleResponse(response);
    console.log("Successfully fetched lesson data from API:", data);
    
    // Validate and transform data if needed
    const lesson: Lesson = {
      id: data.id,
      title: data.title,
      chapterId: data.chapterId,
      description: data.description,
      learningType: data.learningType,
      listLearning: data.listLearning.map((item: any) => {
        if (item.type === "flashcard") {
          return {
            type: "flashcard",
            id: item.id,
            frontContent: item.frontContent,
            backContent: item.backContent,
            frontImage: item.frontImage,
            backImage: item.backImage,
          };
        } else {
          const baseQuestion = {
            id: item.id,
            type: item.type,
            question: item.question,
            description: item.description,
            questionType: item.questionType,
          };

          switch (item.type) {
            case "fill_question":
              return {
                ...baseQuestion,
                answer: item.answer,
              };
            case "single_choice_question":
              return {
                ...baseQuestion,
                choices: item.choices,
                correctChoice: item.correctChoice,
              };
            case "multi_choice_question":
              return {
                ...baseQuestion,
                choices: item.choices,
              };
            default:
              throw new Error(`Unknown question type: ${item.type}`);
          }
        }
      }),
    };
    
    return {
      lesson,
      isUsingMockData: false,
    };
  } catch (error) {
    console.warn(`Error fetching lesson from API: ${error}. Using mock data instead.`);
    
    return {
      lesson: getMockLesson(lessonId),
      isUsingMockData: true,
    };
  }
}

// Hàm tạo một bài học mới
export async function createLesson(lessonData: Omit<Lesson, 'id'>): Promise<Lesson> {
    try {
        console.log("Attempting to create a new lesson with data:", lessonData);
        const response = await fetch(`${API_BASE_URL}/v1/lesson`, createFetchOptions({
            method: 'POST',
            body: JSON.stringify(lessonData),
        }));
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error creating lesson: ${error}`);
        throw error;
    }
}

// Hàm cập nhật thông tin một bài học
export async function updateLesson(id: number, lessonData: Partial<Omit<Lesson, 'id'>>): Promise<Lesson> {
    try {
        console.log(`Attempting to update lesson with ID: ${id} with data:`, lessonData);
        const response = await fetch(`${API_BASE_URL}/v1/lesson/${id}`, createFetchOptions({
            method: 'PUT',
            body: JSON.stringify(lessonData),
        }));
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error updating lesson with ID ${id}: ${error}`);
        throw error;
    }
}

// Hàm xóa một bài học
export async function deleteLesson(id: number): Promise<void> {
    try {
        console.log(`Attempting to delete lesson with ID: ${id}`);
        const response = await fetch(`${API_BASE_URL}/v1/lesson/${id}`, createFetchOptions({
            method: 'DELETE',
        }));
        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting lesson with ID ${id}: ${error}`);
        throw error;
    }
}

// ------------------- MOCK DATA -------------------

// Hàm mock dữ liệu lớp học
function getMockClazzes(): Clazz[] {
  return [
    { id: 6, name: "Lớp 6", description: "Nền tảng vững chắc với số tự nhiên, phân số và hình học cơ bản" },
    { id: 7, name: "Lớp 7", description: "Phương trình bậc nhất, số hữu tỉ và hình học nâng cao" },
    { id: 8, name: "Lớp 8", description: "Phương trình bậc nhất hai ẩn, tam giác đồng dạng và đường tròn" },
    { id: 9, name: "Lớp 9", description: "Phương trình bậc hai, hàm số và hình học không gian" },
  ]
}

// Hàm mock dữ liệu một lớp học cụ thể
function getMockClazz(id: number): Clazz {
  const mockClazzes = getMockClazzes()
  const foundClazz = mockClazzes.find(c => c.id === id)
  
  if (foundClazz) {
    return foundClazz
  }
  
  return {
    id,
    name: `Lớp ${id}`,
    description: "Mô tả lớp học mặc định"
  }
}

// Hàm mock dữ liệu các chương học của một lớp
function getMockChaptersByClazz(clazzId: number): Chapter[] {
  if (clazzId === 6) {
    return [
      { id: 1, name: "Số tự nhiên", description: "Tìm hiểu về số tự nhiên", clazzId: 6 },
      { id: 2, name: "Phân số", description: "Tìm hiểu về phân số", clazzId: 6 },
      { id: 3, name: "Hình học cơ bản", description: "Tìm hiểu về hình học cơ bản", clazzId: 6 },
    ]
  } else if (clazzId === 7) {
    return [
      { id: 4, name: "Số hữu tỉ", description: "Tìm hiểu về số hữu tỉ", clazzId: 7 },
      { id: 5, name: "Phương trình bậc nhất", description: "Tìm hiểu về phương trình bậc nhất", clazzId: 7 },
      { id: 6, name: "Hình học nâng cao", description: "Tìm hiểu về hình học nâng cao", clazzId: 7 },
    ]
  } else if (clazzId === 8) {
    return [
      { id: 7, name: "Phương trình bậc nhất hai ẩn", description: "Tìm hiểu về phương trình bậc nhất hai ẩn", clazzId: 8 },
      { id: 8, name: "Tam giác đồng dạng", description: "Tìm hiểu về tam giác đồng dạng", clazzId: 8 },
      { id: 9, name: "Đường tròn", description: "Tìm hiểu về đường tròn", clazzId: 8 },
    ]
  } else if (clazzId === 9) {
    return [
      { id: 10, name: "Phương trình bậc hai", description: "Tìm hiểu về phương trình bậc hai", clazzId: 9 },
      { id: 11, name: "Hàm số", description: "Tìm hiểu về hàm số", clazzId: 9 },
      { id: 12, name: "Hình học không gian", description: "Tìm hiểu về hình học không gian", clazzId: 9 },
    ]
  }
  
  return [
    { id: 999, name: "Chương mặc định", description: "Đây là chương mặc định", clazzId },
  ]
}

// Hàm mock dữ liệu một chương cụ thể
function getMockChapter(id: number): Chapter {
  // Tạo danh sách tất cả các chương mock
  const allChapters = [
    ...getMockChaptersByClazz(6),
    ...getMockChaptersByClazz(7),
    ...getMockChaptersByClazz(8),
    ...getMockChaptersByClazz(9),
  ]
  
  const foundChapter = allChapters.find(c => c.id === id)
  
  if (foundChapter) {
    return foundChapter
  }
  
  return {
    id,
    name: `Chương ${id}`,
    description: "Mô tả chương mặc định",
    clazzId: 6  // Default class
  }
}

// Hàm mock dữ liệu các bài học của một chương
function getMockLessonsByChapter(chapterId: number): Lesson[] {
  if (chapterId === 1) {
    return [
      {
        id: 1,
        title: "Số tự nhiên và phép cộng, trừ",
        chapterId: 1,
        description: "Tìm hiểu về số tự nhiên và các phép cộng, trừ cơ bản",
        learningType: "question",
        listLearning: []
      },
      {
        id: 2,
        title: "Phép nhân và phép chia số tự nhiên",
        chapterId: 1,
        description: "Tìm hiểu về phép nhân và phép chia số tự nhiên",
        learningType: "flashcard",
        listLearning: []
      }
    ]
  } else if (chapterId === 2) {
    return [
      {
        id: 3,
        title: "Kiến thức bóng đá cơ bản phần 1",
        chapterId: 2,
        description: "Tìm hiểu về các kiến thức cơ bản trong bóng đá",
        learningType: "question",
        listLearning: []
      },
      {
        id: 4,
        title: "Thẻ ghi nhớ cầu thủ nổi tiếng",
        chapterId: 2,
        description: "Thẻ ghi nhớ về các cầu thủ nổi tiếng",
        learningType: "flashcard",
        listLearning: []
      }
    ]
  }
  
  return [
    {
      id: 999,
      title: `Bài học mặc định cho chương ${chapterId}`,
      chapterId: chapterId,
      description: "Đây là bài học mẫu khi không tìm thấy dữ liệu",
      learningType: "question",
      listLearning: []
    }
  ]
}

// Hàm mock dữ liệu để sử dụng khi API không hoạt động
export function getMockLesson(id: number): Lesson {
  console.log(`Getting mock lesson with ID: ${id}`)

  // Dữ liệu mẫu cho bài học ID 3
  if (id === 3) {
    return {
      id: 3,
      title: "Kiến thức bóng đá cơ bản phần 1",
      chapterId: 1,
      description: "Tìm hiểu về các kiến thức cơ bản trong bóng đá",
      learningType: "question",
      listLearning: [
        {
          type: "fill_question",
          id: 10,
          question: "A7 lọt vào đội hình ngớ ngẩn nhất WC bao nhiêu lần trên tổng số bao nhiêu lần",
          description: null,
          questionType: "fill",
          answer: "3/5",
        },
        {
          type: "multi_choice_question",
          id: 7,
          question: "A7 sinh năm bao nhiêu",
          description: null,
          questionType: "multi_choice",
          choices: {
            "1985": true,
            "1986": false,
            "1987": false,
            "2010": true,
          },
        },
        {
          type: "single_choice_question",
          id: 8,
          question: "Messex ghi bàn bằng tay bao nhiêu quả",
          description: null,
          questionType: "single_choice",
          choices: ["1", "2", "3", "4"],
          correctChoice: 1,
        },
        {
          type: "fill_question",
          id: 9,
          question: "1+1=",
          description: null,
          questionType: "fill",
          answer: "2",
        },
      ],
    }
  }
  // Dữ liệu mẫu cho bài học ID 4
  else if (id === 4) {
    return {
      id: 4,
      title: "Thẻ ghi nhớ cầu thủ nổi tiếng",
      chapterId: 1,
      description: "Thẻ ghi nhớ về các cầu thủ nổi tiếng",
      learningType: "flashcard",
      listLearning: [
        {
          type: "flashcard",
          id: null,
          frontContent: "Ronaldo",
          backContent: "Cầu thủ người Bồ Đào Nha, sinh năm 1985",
          frontImage: null,
          backImage: null,
        },
        {
          type: "flashcard",
          id: null,
          frontContent: "Messi",
          backContent: "Cầu thủ người Argentina, sinh năm 1987",
          frontImage: null,
          backImage: null,
        },
      ],
    }
  }
  // Dữ liệu mẫu cho bài học ID 5
  else if (id === 5) {
    return {
      id: 5,
      title: "Kiến thức bóng đá cơ bản",
      chapterId: 2,
      description: "Tìm hiểu về các kiến thức cơ bản trong bóng đá",
      learningType: "question",
      listLearning: [
        {
          type: "multi_choice_question",
          id: 15,
          question: "A7 sinh năm bao nhiêu",
          description: null,
          questionType: "multi_choice",
          choices: {
            "1985": true,
            "1986": false,
            "1987": false,
            "2010": true,
          },
        },
        {
          type: "single_choice_question",
          id: 16,
          question: "Messex ghi bàn bằng tay bao nhiêu quả",
          description: null,
          questionType: "single_choice",
          choices: ["1", "2", "3", "4"],
          correctChoice: 1,
        },
        {
          type: "fill_question",
          id: 17,
          question: "1+1=",
          description: null,
          questionType: "fill",
          answer: "2",
        },
      ],
    }
  }
  // Dữ liệu mẫu cho bài học ID 6
  else if (id === 6) {
    return {
      id: 6,
      title: "Test flashcard",
      chapterId: 2,
      description: "Thẻ ghi nhớ về các cầu thủ bóng đá",
      learningType: "flashcard",
      listLearning: [
        {
          type: "flashcard",
          id: null,
          frontContent: "Ronaldo",
          backContent: "Dê phó",
          frontImage: null,
          backImage: null,
        },
        {
          type: "flashcard",
          id: null,
          frontContent: "Messi",
          backContent: "Dê trưởng",
          frontImage: null,
          backImage: null,
        },
      ],
    }
  }
  // Dữ liệu mẫu mặc định nếu không tìm thấy ID
  else {
    // Thay vì ném lỗi, trả về một bài học mặc định
    console.warn(`No mock data for lesson ID ${id}, returning default lesson`)
    return {
      id: id,
      title: "Bài học mẫu",
      chapterId: 1,
      description: "Đây là bài học mẫu khi không tìm thấy dữ liệu",
      learningType: "question",
      listLearning: [
        {
          type: "fill_question",
          id: 1,
          question: "Đây là câu hỏi mẫu, hãy điền vào chỗ trống: 2+2=?",
          description: null,
          questionType: "fill",
          answer: "4",
        },
      ],
    }
  }
}
