import { LessonContent } from '../../types';

export const lesson16: LessonContent = {
  id: 16,
  title: 'Bài 16: Ngôn ngữ lập trình bậc cao và Python',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 86 - 90 (SGK)',
  sbtPages: 'Trang 34 - 35 (SBT)',
  summaryMarkdown: `### 1. Ngôn ngữ lập trình bậc cao
- **Ngôn ngữ lập trình**: Là ngôn ngữ dùng để viết chương trình cho máy tính.
- **Ngôn ngữ máy**: Viết trực tiếp dưới dạng mã nhị phân (dãy bit 0 và 1). Máy tính chỉ thực hiện được ngôn ngữ máy.
- **Hợp ngữ (Assembly)**: Dùng các từ viết tắt tiếng Anh (như ADD, SUB, MOV) để thay thế mã nhị phân, nhưng vẫn phụ thuộc chặt chẽ vào phần cứng.
- **Ngôn ngữ bậc cao**: Các câu lệnh gần với ngôn ngữ tự nhiên (tiếng Anh) và biểu thức toán học giúp việc đọc, viết, hiểu chương trình dễ dàng hơn. Ví dụ: Python, C/C++, Java,...
- **Chương trình dịch (Compiler/Interpreter)**: Là phần mềm trung gian giúp chuyển đổi chương trình viết bằng ngôn ngữ bậc cao sang ngôn ngữ máy.

### 2. Ngôn ngữ Python và Môi trường lập trình
- Python là ngôn ngữ lập trình bậc cao do **Guido van Rossum** (người Hà Lan) sáng tạo và ra mắt lần đầu năm **1991**.
- Python là mã nguồn mở, đa nền tảng (chạy trên Windows, macOS, Linux,...), có thư viện phong phú phục vụ Trí tuệ nhân tạo (AI), khoa học dữ liệu, robot, giáo dục,...
- **Hai chế độ làm việc trong IDLE Python**:
  1. **Chế độ gõ lệnh trực tiếp (Interactive Shell)**: Có dấu nhắc \`>>>\`. Nhập từng dòng lệnh, nhấn Enter thì Python sẽ thực thi và in kết quả ngay. Dùng để tính toán nhanh và thử nghiệm câu lệnh.
  2. **Chế độ soạn thảo (Script Mode)**: Vào *File -> New File* để mở cửa sổ soạn thảo. Viết chương trình gồm nhiều dòng, lưu thành tệp đuôi \`.py\`, nhấn **F5** (Run Module) để chạy toàn bộ chương trình.

### 3. Một số lệnh Python đầu tiên
- Lệnh **\`print()\`**: Đưa dữ liệu ra màn hình (xuất dữ liệu). Có thể in số, xâu, biểu thức, hoặc nhiều giá trị phân tách nhau bởi dấu phẩy \`,\` (mặc định cách nhau 1 dấu cách).
  - Ví dụ: \`print("Xin chào", 10)\` in ra: \`Xin chào 10\`
  - Ví dụ: \`print(3.4 + 4, 15)\` in ra: \`7.4 15\`
- Phép toán số học cơ bản: cộng \`+\`, trừ \`-\`, nhân \`*\`, chia \`/\` (kết quả phép chia \`/\` luôn là số thực float).`,
  keyPoints: [
    'Ngôn ngữ máy là ngôn ngữ duy nhất máy tính hiểu trực tiếp; ngôn ngữ bậc cao cần chương trình dịch.',
    'Python được phát triển bởi Guido van Rossum năm 1991, cú pháp ngắn gọn, dễ học.',
    'Môi trường Python có 2 chế độ: Chế độ gõ lệnh trực tiếp (Interactive Mode) và Chế độ soạn thảo (Script Mode).',
    'Lệnh print() dùng để đưa dữ liệu ra màn hình, có thể in nhiều giá trị ngăn cách bởi dấu phẩy.',
    'Phép chia / trong Python luôn trả về kết quả số thực (float).'
  ],
  codeExamples: [
    {
      title: 'Chế độ gõ lệnh trực tiếp',
      code: `>>> 5 / 2\n2.5\n>>> 10 + 7 // 2\n13\n>>> print("Học sinh lớp 10")\nHọc sinh lớp 10`,
      explanation: 'Các lệnh được gõ trực tiếp sau dấu nhắc >>> và in kết quả tức thì.'
    },
    {
      title: 'Lệnh print xuất nhiều giá trị',
      code: `a = 5\nb = 2\nprint("Tổng của", a, "và", b, "là:", a + b)`,
      explanation: 'Xuất ra: Tổng của 5 và 2 là: 7 (mỗi tham số cách nhau bởi khoảng trắng).'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l16_iq1',
      type: 'single_choice',
      prompt: 'Ngôn ngữ lập trình Python được sáng lập bởi ai và vào năm nào?',
      options: [
        'Guido van Rossum (năm 1991)',
        'Dennis Ritchie (năm 1972)',
        'James Gosling (năm 1995)',
        'Bjarne Stroustrup (năm 1983)'
      ],
      correctAnswer: 0,
      explanation: 'Python do Guido van Rossum (người Hà Lan) phát minh và công bố lần đầu năm 1991 (SGK trang 87, SBT trang 101).'
    },
    {
      id: 'l16_iq2',
      type: 'fill_blank',
      prompt: 'Để mở chế độ soạn thảo chương trình hoàn chỉnh trong IDLE Python, từ menu ta chọn File -> ____ và nhấn phím F5 để chạy.',
      codeTemplate: 'File -> __BLANK__',
      blankOptions: ['New File', 'Save As', 'Open Module', 'Recent Files'],
      correctAnswer: 'New File',
      explanation: 'Trong IDLE, chọn File -> New File (hoặc nhấn Ctrl+N) để mở cửa sổ soạn thảo chương trình (SGK trang 88).'
    },
    {
      id: 'l16_iq3',
      type: 'multi_choice',
      prompt: 'Những đặc điểm nào sau đây là ưu điểm nổi bật của ngôn ngữ lập trình bậc cao so với ngôn ngữ máy và hợp ngữ? (Chọn các phương án đúng)',
      options: [
        'Các câu lệnh gần gũi với ngôn ngữ tự nhiên (tiếng Anh) và biểu thức toán học',
        'Dễ đọc, dễ viết, dễ bảo trì và nâng cấp chương trình',
        'Máy tính có thể thi hành trực tiếp các câu lệnh mà không cần chương trình dịch',
        'Chương trình viết ra có tính độc lập cao, chạy được trên nhiều hệ điều hành khác nhau'
      ],
      correctAnswers: [0, 1, 3],
      explanation: 'Ngôn ngữ bậc cao không thể chạy trực tiếp trên vi xử lý mà bắt buộc phải qua chương trình dịch (compiler/interpreter) sang mã máy.'
    },
    {
      id: 'l16_iq4',
      type: 'true_false_group',
      prompt: 'Trong môi trường Python IDLE, xét tính Đúng/Sai của các nhận định sau:',
      statements: [
        { id: 's1', label: 'a', text: 'Dấu nhắc >>> là nơi nhận lệnh trong chế độ soạn thảo tệp script .py', isCorrect: false },
        { id: 's2', label: 'b', text: 'Chế độ gõ lệnh trực tiếp thích hợp để kiểm tra nhanh kết quả của một biểu thức hoặc câu lệnh ngắn', isCorrect: true },
        { id: 's3', label: 'c', text: 'Kết quả của biểu thức 5/2 trong Python là số nguyên 2', isCorrect: false },
        { id: 's4', label: 'd', text: 'Có thể dùng phím F5 để thực hiện chạy chương trình viết trong cửa sổ soạn thảo', isCorrect: true }
      ],
      explanation: 'Dấu nhắc >>> xuất hiện ở chế độ tương tác (Interactive). Phép chia / luôn sinh ra số thực float (5/2 = 2.5).'
    }
  ],
  quizQuestions: [
    {
      id: 'l16_q1',
      prompt: 'Ngôn ngữ nào dưới đây máy tính có thể trực tiếp hiểu và thực thi mà không cần phần mềm dịch?',
      options: ['Ngôn ngữ máy', 'Hợp ngữ (Assembly)', 'Ngôn ngữ Python', 'Ngôn ngữ C++'],
      correctAnswer: 0,
      explanation: 'Máy tính là thiết bị điện tử số, chỉ trực tiếp hiểu và xử lý mã nhị phân gồm các bit 0 và 1 của ngôn ngữ máy.'
    },
    {
      id: 'l16_q2',
      prompt: 'Chương trình dịch trong máy tính có chức năng gì?',
      options: [
        'Phát hiện virus và bảo vệ tệp mã nguồn',
        'Chuyển đổi chương trình viết bằng ngôn ngữ bậc cao sang ngôn ngữ máy',
        'Tăng tốc độ hiển thị hình ảnh trên màn hình',
        'Tự động soạn thảo văn bản cho người lập trình'
      ],
      correctAnswer: 1,
      explanation: 'Chương trình dịch là phần mềm dùng để dịch các chương trình máy tính viết bằng ngôn ngữ bậc cao sang ngôn ngữ máy (SGK trang 86).'
    },
    {
      id: 'l16_q3',
      prompt: 'Cho đoạn lệnh: print("2.5*4 =", 2.5*4). Kết quả in ra màn hình là gì?',
      options: ['2.5*4 = 10', '2.5*4 = 10.0', '10.0', 'Báo lỗi SyntaxError'],
      correctAnswer: 1,
      explanation: '"2.5*4 =" được in nguyên mẫu dạng chuỗi, còn 2.5*4 tính toán ra số thực 10.0. Kết quả in: 2.5*4 = 10.0 (SBT câu 16.7).'
    },
    {
      id: 'l16_q4',
      prompt: 'Khi thực hiện lệnh sau trong chế độ gõ trực tiếp: >>> 12 + 1.5. Kết quả trả về và kiểu dữ liệu là gì?',
      options: ['13.5 (kiểu số nguyên)', '13.5 (kiểu số thực)', '13 (kiểu số nguyên)', 'Báo lỗi TypeMismatch'],
      correctAnswer: 1,
      explanation: 'Phép cộng giữa số nguyên 12 và số thực 1.5 cho kết quả 13.5 kiểu số thực float (SBT câu 16.6b).'
    },
    {
      id: 'l16_q5',
      prompt: 'Phím tắt thông dụng để chạy chương trình từ cửa sổ soạn thảo Python IDLE là:',
      options: ['F1', 'F3', 'F5', 'F9'],
      correctAnswer: 2,
      explanation: 'Trong IDLE Python, nhấn F5 (Run Module) để chạy file chương trình.'
    },
    {
      id: 'l16_q6',
      prompt: 'Phát biểu nào sau đây về ngôn ngữ Python là SAI?',
      options: [
        'Python là ngôn ngữ thông dịch bậc cao',
        'Python chỉ chạy được trên hệ điều hành Windows',
        'Python có mã nguồn mở và cộng đồng hỗ trợ lớn',
        'Cú pháp của Python ngắn gọn, gần gũi với ngôn ngữ tự nhiên'
      ],
      correctAnswer: 1,
      explanation: 'Python là ngôn ngữ đa nền tảng, chạy được trên Windows, macOS, Linux, Unix,...'
    },
    {
      id: 'l16_q7',
      prompt: 'Cho đoạn lệnh:\n>>> a = 5\n>>> b = 2\n>>> c = a - b\n>>> print(c)\nKết quả in ra là:',
      options: ['3', '7', 'c', 'Báo lỗi NameError'],
      correctAnswer: 0,
      explanation: 'c = 5 - 2 = 3. Lệnh print(c) in ra giá trị 3 (SBT câu 16.5).'
    },
    {
      id: 'l16_q8',
      prompt: 'Trong Python, đuôi mở rộng mặc định của tệp chương trình là gì?',
      options: ['.py', '.python', '.pt', '.exe'],
      correctAnswer: 0,
      explanation: 'Tệp mã nguồn Python có phần mở rộng chuẩn là .py'
    },
    {
      id: 'l16_q9',
      prompt: 'Kết quả của lệnh: >>> print(3.4 + 4, "3.4 + 4", 15, "Mùa Xuân") là:',
      options: [
        '7.4 3.4 + 4 15 Mùa Xuân',
        '7.4, 3.4 + 4, 15, Mùa Xuân',
        '7.43.4+415Mùa Xuân',
        'Báo lỗi cú pháp'
      ],
      correctAnswer: 0,
      explanation: 'Mỗi giá trị phân cách bởi dấu phẩy trong print() sẽ được in ra cách nhau một dấu cách khoảng trắng (SBT câu 16.8).'
    },
    {
      id: 'l16_q10',
      prompt: 'Để in ra màn hình dòng chữ "Chào bạn!", lệnh nào sau đây là đúng chuẩn cú pháp Python 3?',
      options: [
        'print "Chào bạn!"',
        'print("Chào bạn!")',
        'echo("Chào bạn!")',
        'write("Chào bạn!")'
      ],
      correctAnswer: 1,
      explanation: 'Trong Python 3, print là một hàm nên nội dung cần in phải nằm trong cặp ngoặc đơn print(...).'
    },
    {
      id: 'l16_q11',
      prompt: 'Kết quả của biểu thức sau trong Python: 10 + 7 // 2 là bao nhiêu?',
      options: ['13.5', '13', '8.5', '14'],
      correctAnswer: 1,
      explanation: 'Toán tử // lấy phần nguyên: 7 // 2 = 3. Do đó 10 + 3 = 13 (SBT câu 16.6d).'
    },
    {
      id: 'l16_q12',
      prompt: 'Kí hiệu nào sau đây là dấu nhắc dòng lệnh trong chế độ tương tác của Python?',
      options: ['>>>', '$$$', '::: ', '###'],
      correctAnswer: 0,
      explanation: 'Dấu nhắc quy ước của Python tương tác là >>> (SGK trang 87).'
    },
    {
      id: 'l16_q13',
      prompt: 'Muốn lưu tệp chương trình Python đang soạn thảo, ta chọn tổ hợp phím nào?',
      options: ['Ctrl + S', 'Ctrl + N', 'Ctrl + C', 'Ctrl + P'],
      correctAnswer: 0,
      explanation: 'Tổ hợp phím thông dụng để lưu tệp là Ctrl + S.'
    },
    {
      id: 'l16_q14',
      prompt: 'Để thoát khỏi phiên làm việc gõ lệnh trực tiếp của Python, ta gõ lệnh nào?',
      options: ['stop()', 'quit() hoặc exit()', 'end()', 'close()'],
      correctAnswer: 1,
      explanation: 'Có thể dùng hàm quit() hoặc exit() để thoát khỏi phiên làm việc Python (SGK trang 90).'
    },
    {
      id: 'l16_q15',
      prompt: 'Cho đoạn mã:\nprint(1 * 3 * 5 * 7)\nKết quả in ra là:',
      options: ['105', '1*3*5*7', '35', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '1 * 3 * 5 * 7 = 105 (SBT câu 16.9a).'
    },
    {
      id: 'l16_q16',
      prompt: 'Tại sao ngôn ngữ lập trình bậc cao lại phổ biến hơn ngôn ngữ máy và hợp ngữ?',
      options: [
        'Vì tốc độ thực thi của ngôn ngữ bậc cao nhanh hơn ngôn ngữ máy',
        'Vì gần với ngôn ngữ tự nhiên, cú pháp dễ học, dễ lập trình và tái sử dụng',
        'Vì không cần bộ nhớ RAM để chạy',
        'Vì không cần máy tính để thực thi'
      ],
      correctAnswer: 1,
      explanation: 'Ngôn ngữ bậc cao giúp con người dễ dàng mô tả bài toán và thuật toán bằng cú pháp gần gũi tiếng Anh.'
    },
    {
      id: 'l16_q17',
      prompt: 'Kết quả của lệnh print(2 * 3 + 4 * 2) là:',
      options: ['14', '20', '28', '12'],
      correctAnswer: 0,
      explanation: 'Phép nhân ưu tiên trước phép cộng: 2*3 = 6; 4*2 = 8; 6 + 8 = 14.'
    },
    {
      id: 'l16_q18',
      prompt: 'Để viết một chương trình Python có nhiều câu lệnh và lưu trữ để dùng nhiều lần, ta nên dùng chế độ nào?',
      options: [
        'Chế độ soạn thảo (Script mode)',
        'Chế độ gõ lệnh trực tiếp (Interactive mode)',
        'Chế độ Command Prompt thông thường',
        'Chế độ ghi nhớ tạm thời'
      ],
      correctAnswer: 0,
      explanation: 'Chế độ soạn thảo cho phép viết chương trình hoàn chỉnh nhiều dòng và lưu thành file .py'
    },
    {
      id: 'l16_q19',
      prompt: 'Lệnh print(15 / 3) trong Python sẽ cho kết quả là gì?',
      options: ['5', '5.0', '5.000', 'Báo lỗi SyntaxError'],
      correctAnswer: 1,
      explanation: 'Toán tử chia / trong Python luôn trả về số thực float, 15 / 3 cho 5.0.'
    },
    {
      id: 'l16_q20',
      prompt: 'Dòng chú thích (comment) trong mã nguồn Python bắt đầu bằng ký tự nào?',
      options: ['//', '/*', '#', '--'],
      correctAnswer: 2,
      explanation: 'Trong Python, chú thích bắt đầu bằng dấu # (SGK trang 89).'
    }
  ]
};
