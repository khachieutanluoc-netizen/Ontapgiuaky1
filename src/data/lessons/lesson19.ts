import { LessonContent } from '../../types';

export const lesson19: LessonContent = {
  id: 19,
  title: 'Bài 19: Câu lệnh rẽ nhánh if',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 101 - 104 (SGK)',
  sbtPages: 'Trang 39 - 41 (SBT)',
  summaryMarkdown: `### 1. Biểu thức logic và phép toán so sánh
- **Biểu thức logic**: Là biểu thức chỉ nhận giá trị \`True\` (đúng) hoặc \`False\` (sai).
- **Các phép toán so sánh trong Python**:
  - \`==\`: Bằng nhau (lưu ý: \`=\` là phép gán, \`==\` mới là phép so sánh bằng)
  - \`!=\`: Khác nhau
  - \`>\`, \`<\`: Lớn hơn, nhỏ hơn
  - \`>=\`, \`<=\`: Lớn hơn hoặc bằng, nhỏ hơn hoặc bằng
- **Các phép toán logic**:
  - \`and\`: Phép VÀ (chỉ đúng khi CẢ HAI vế đều True).
  - \`or\`: Phép HOẶC (đúng khi CÓ ÍT NHẤT MỘT vế True).
  - \`not\`: Phép PHỦ ĐỊNH (đảo True thành False và ngược lại).
  - Bảng chân lý:
    - \`True and False -> False\`; \`True or False -> True\`
    - \`not (5 > 3) -> not True -> False\`

### 2. Cú pháp câu lệnh rẽ nhánh trong Python
- **Câu lệnh if dạng thiếu**:
  \`\`\`python
  if <điều kiện>:
      <khối lệnh>
  \`\`\`
  - Nếu <điều kiện> đúng (True) thì thực hiện <khối lệnh>; ngược lại bỏ qua chuyển sang lệnh tiếp theo.
- **Câu lệnh if dạng đủ**:
  \`\`\`python
  if <điều kiện>:
      <khối lệnh 1>
  else:
      <khối lệnh 2>
  \`\`\`
  - Nếu <điều kiện> đúng thì thực hiện <khối lệnh 1>, ngược lại thực hiện <khối lệnh 2>.
- **Câu lệnh rẽ nhánh nhiều trường hợp (if - elif - else)**:
  \`\`\`python
  if <điều kiện 1>:
      <khối lệnh 1>
  elif <điều kiện 2>:
      <khối lệnh 2>
  else:
      <khối lệnh 3>
  \`\`\`

### 3. Quy tắc thụt lề (Indentation) trong Python
- Trong Python, **khối lệnh không dùng cặp ngoặc nhọn \`{}\`** như C/C++ hay Java, mà **dùng thụt lề (khoảng trắng)** để xác định phạm vi.
- Sau \`if <điều kiện>\` và sau \`else\` bắt buộc phải có **dấu hai chấm \`:\`**.
- Các câu lệnh trong cùng khối lệnh phải thụt lề **thẳng hàng nhau** (thường là 4 dấu cách hoặc 1 phím Tab). Viết sai thụt lề sẽ gây lỗi \`IndentationError\`.`,
  keyPoints: [
    'Biểu thức logic trả về True hoặc False.',
    'Phép toán logic: and (và), or (hoặc), not (phủ định).',
    'Sau điều kiện if và sau else/elif luôn có dấu hai chấm :.',
    'Các câu lệnh trong cùng một khối lệnh phải thụt lề thẳng hàng nhau; sai thụt lề sẽ báo lỗi IndentationError.',
    'Toán tử so sánh bằng là ==, khác là !=.'
  ],
  codeExamples: [
    {
      title: 'Kiểm tra số chẵn số lẻ',
      code: `n = int(input("Nhập số tự nhiên n: "))\nif n % 2 == 0:\n    print(n, "là số chẵn")\nelse:\n    print(n, "là số lẻ")`,
      explanation: 'Sử dụng phép chia dư n % 2 == 0 để phân loại chẵn lẻ (SGK trang 103).'
    },
    {
      title: 'Kiểm tra năm nhuận',
      code: `year = int(input("Nhập năm dương lịch: "))\nif (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):\n    print(year, "là năm nhuận")\nelse:\n    print(year, "không phải năm nhuận")`,
      explanation: 'Năm nhuận là năm chia hết cho 400 hoặc chia hết cho 4 nhưng không chia hết cho 100.'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l19_iq1',
      type: 'single_choice',
      prompt: 'Để so sánh biến x có bằng giá trị 10 hay không trong câu lệnh if, ta dùng toán tử nào?',
      options: ['x = 10', 'x == 10', 'x === 10', 'x := 10'],
      correctAnswer: 1,
      explanation: 'Trong Python, == là toán tử so sánh bằng, còn = là phép gán giá trị (SGK trang 101).'
    },
    {
      id: 'l19_iq2',
      type: 'fill_blank',
      prompt: 'Ký tự bắt buộc phải có ở cuối dòng lệnh if và else trong Python là: ____',
      codeTemplate: 'if x > 0__BLANK__',
      blankOptions: [':', ';', '{', 'then'],
      correctAnswer: ':',
      explanation: 'Sau biểu thức điều kiện của lệnh if, elif và sau từ khóa else bắt buộc phải có dấu hai chấm : (SGK trang 102).'
    },
    {
      id: 'l19_iq3',
      type: 'multi_choice',
      prompt: 'Những biểu thức logic nào dưới đây cho giá trị TRUE? (Cho a = 10, b = 5)',
      options: [
        'a > b and b > 0',
        'a < b or b == 5',
        'not (a >= b)',
        'a % b == 0 and a // b == 2'
      ],
      correctAnswers: [0, 1, 3],
      explanation: 'a > b and b > 0 -> 10 > 5 and 5 > 0 -> True. a < b or b == 5 -> False or True -> True. not (a >= b) -> not True -> False. 10 % 5 == 0 and 10 // 5 == 2 -> True.'
    },
    {
      id: 'l19_iq4',
      type: 'true_false_group',
      prompt: 'Xét tính Đúng/Sai của các khẳng định về cấu trúc rẽ nhánh trong Python:',
      statements: [
        { id: 's1', label: 'a', text: 'Khối lệnh trong if được xác định bằng việc thụt lề (indentation) thẳng hàng nhau', isCorrect: true },
        { id: 's2', label: 'b', text: 'Nếu điều kiện trong câu lệnh if dạng thiếu nhận giá trị False, chương trình sẽ báo lỗi dừng lại', isCorrect: false },
        { id: 's3', label: 'c', text: 'Cú pháp if lồng nhau nhiều tầng là hoàn toàn hợp lệ trong Python', isCorrect: true },
        { id: 's4', label: 'd', text: 'Biểu thức 100 % 4 == 0 and 100 % 3 != 0 nhận giá trị False', isCorrect: false }
      ],
      explanation: 'Nếu điều kiện if nhận False, chương trình chỉ đơn giản bỏ qua khối lệnh if chứ không hề báo lỗi. 100 % 4 == 0 (True) và 100 % 3 != 0 (1 != 0 là True) nên biểu thức ra True.'
    }
  ],
  quizQuestions: [
    {
      id: 'l19_q1',
      prompt: 'Cho đoạn mã:\na, b = 10, 20\nif a > b:\n    print("A")\nelse:\n    print("B")\nKết quả in ra màn hình là:',
      options: ['A', 'B', 'AB', 'Không in gì'],
      correctAnswer: 1,
      explanation: '10 > 20 là False, nhánh else được thực hiện và in ra "B".'
    },
    {
      id: 'l19_q2',
      prompt: 'Kết quả của biểu thức logic: (15 > 10) and (5 > 8) là:',
      options: ['True', 'False', 'None', 'Báo lỗi'],
      correctAnswer: 1,
      explanation: '15 > 10 là True, 5 > 8 là False. True and False ra False.'
    },
    {
      id: 'l19_q3',
      prompt: 'Kết quả của biểu thức: not (10 == 10) là:',
      options: ['True', 'False', '10', 'Báo lỗi'],
      correctAnswer: 1,
      explanation: '10 == 10 là True, phép not True trả về False.'
    },
    {
      id: 'l19_q4',
      prompt: 'Để kiểm tra xem số nguyên n có nằm trong khoảng từ 10 đến 50 hay không, biểu thức điều kiện nào đúng?',
      options: [
        '10 < n < 50 hoặc (n > 10 and n < 50)',
        'n > 10 or n < 50',
        '10 <= n or n <= 50',
        'n == 10 and n == 50'
      ],
      correctAnswer: 0,
      explanation: 'Trong Python có thể viết 10 < n < 50 hoặc n > 10 and n < 50.'
    },
    {
      id: 'l19_q5',
      prompt: 'Lỗi IndentationError trong Python thường xuất hiện khi nào?',
      options: [
        'Khi đặt tên biến có số ở đầu',
        'Khi thụt lề các dòng lệnh trong khối lệnh không đúng quy cách hoặc không thẳng hàng',
        'Khi chia cho số 0',
        'Khi quên đóng ngoặc chuỗi ký tự'
      ],
      correctAnswer: 1,
      explanation: 'IndentationError là lỗi thụt lề dòng lệnh trong Python (SGK trang 103).'
    },
    {
      id: 'l19_q6',
      prompt: 'Cho đoạn mã:\nx = 5\nif x % 2 != 0:\n    print("Le")\nelse:\n    print("Chan")\nKết quả in ra là:',
      options: ['Le', 'Chan', '5', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '5 % 2 = 1 (khác 0 là True), nên in ra "Le".'
    },
    {
      id: 'l19_q7',
      prompt: 'Biểu thức logic biểu diễn "x chia hết cho 3 hoặc chia hết cho 5" là:',
      options: [
        'x % 3 == 0 or x % 5 == 0',
        'x % 3 == 0 and x % 5 == 0',
        'x // 3 == 0 or x // 5 == 0',
        'x / 3 == 0 and x / 5 == 0'
      ],
      correctAnswer: 0,
      explanation: 'Chia hết dùng toán tử chia dư %, liên từ "hoặc" biểu diễn bằng or.'
    },
    {
      id: 'l19_q8',
      prompt: 'Cho đoạn chương trình:\nk = int(input())\nif k <= 0:\n    print("Bạn nhập sai rồi!")\nNếu người dùng nhập số 0, màn hình in ra gì?',
      options: ['Bạn nhập sai rồi!', 'Không in gì', '0', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '0 <= 0 là True nên khối lệnh if thực thi và in "Bạn nhập sai rồi!" (SGK trang 103).'
    },
    {
      id: 'l19_q9',
      prompt: 'Cho a = 3, b = 4. Giá trị của biểu thức (a < b) and (b < a + 2) là:',
      options: ['True', 'False', '1', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'a < b (3 < 4) là True; b < a + 2 (4 < 5) là True. True and True cho True.'
    },
    {
      id: 'l19_q10',
      prompt: 'Biểu thức: (5 > 3) or (10 < 2) có giá trị là:',
      options: ['True', 'False', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Toán tử or chỉ cần 1 vế True là toàn bộ biểu thức nhận giá trị True (5 > 3 là True).'
    },
    {
      id: 'l19_q11',
      prompt: 'Cấu trúc if lồng nhau dùng khi nào?',
      options: [
        'Khi cần kiểm tra nhiều điều kiện phụ thuộc tuần tự nhau',
        'Khi muốn lặp lại một câu lệnh 10 lần',
        'Khi cần nhập dữ liệu từ tệp',
        'Khi cần in ra nhiều dòng liên tiếp'
      ],
      correctAnswer: 0,
      explanation: 'if lồng nhau cho phép kiểm tra một điều kiện mới chỉ khi điều kiện trước đó thỏa mãn (hoặc không thỏa mãn).'
    },
    {
      id: 'l19_q12',
      prompt: 'Cho x = 12. Điều kiện if x > 10 and x % 4 == 0: có thỏa mãn không?',
      options: ['Thỏa mãn (True)', 'Không thỏa mãn (False)', 'Gây lỗi cú pháp', 'Không xác định'],
      correctAnswer: 0,
      explanation: '12 > 10 là True và 12 % 4 == 0 là True, do đó thỏa mãn.'
    },
    {
      id: 'l19_q13',
      prompt: 'Đoạn mã sau in ra gì?\nscore = 8.5\nif score >= 8.0:\n    print("Giỏi")\nelif score >= 6.5:\n    print("Khá")\nelse:\n    print("Trung bình")',
      options: ['Giỏi', 'Khá', 'Giỏi Khá', 'Trung bình'],
      correctAnswer: 0,
      explanation: 'score = 8.5 thỏa mãn điều kiện đầu tiên score >= 8.0 nên in "Giỏi" và bỏ qua các nhánh elif/else sau.'
    },
    {
      id: 'l19_q14',
      prompt: 'Trong Python, biểu thức nào sau đây viết ĐÚNG cú pháp kiểm tra x khác y?',
      options: ['x <> y', 'x != y', 'x NOT y', 'x ~= y'],
      correctAnswer: 1,
      explanation: 'Toán tử khác nhau trong Python là !=.'
    },
    {
      id: 'l19_q15',
      prompt: 'Cho đoạn mã:\na = 5\nb = 10\nif a > 0:\n    if b > 0:\n        print("Dương")\nKết quả in ra là:',
      options: ['Dương', 'Không in gì', 'Báo lỗi thụt lề', '5 10'],
      correctAnswer: 0,
      explanation: 'Cả a và b đều lớn hơn 0 nên thỏa mãn cả 2 câu lệnh if lồng nhau, in ra "Dương".'
    },
    {
      id: 'l19_q16',
      prompt: 'Biểu thức 111 // 5 != 20 or 20 % 3 != 0 có giá trị là gì?',
      options: ['True', 'False', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '111 // 5 = 22 (!= 20 là True). Vế đầu True kết hợp or cho kết quả True (SBT câu 19.4).'
    },
    {
      id: 'l19_q17',
      prompt: 'Để tìm số lớn hơn trong hai số a và b, đoạn mã nào sau đây là đúng?',
      options: [
        'if a > b: max_val = a; else: max_val = b',
        'if a > b:\n    max_val = a\nelse:\n    max_val = b',
        'max_val = if a > b then a else b',
        'if a > b max_val = a else max_val = b'
      ],
      correctAnswer: 1,
      explanation: 'Cú pháp chuẩn có dấu hai chấm : và xuống dòng thụt lề cho từng khối lệnh.'
    },
    {
      id: 'l19_q18',
      prompt: 'Điều kiện: year % 400 == 0 or (year % 4 == 0 and year % 100 != 0) dùng để kiểm tra điều gì?',
      options: ['Năm thế kỷ', 'Năm nhuận', 'Năm lẻ', 'Năm chẵn'],
      correctAnswer: 1,
      explanation: 'Đây là quy tắc toán học chuẩn để xác định năm nhuận trong lịch Gregory (SGK trang 104, SBT câu 19.6).'
    },
    {
      id: 'l19_q19',
      prompt: 'Biểu thức: (not (5 == 5)) or (10 > 2) có kết quả là:',
      options: ['True', 'False', '5', '10'],
      correctAnswer: 0,
      explanation: 'not (True) -> False. False or True -> True.'
    },
    {
      id: 'l19_q20',
      prompt: 'Nếu viết:\nif x > 0:\nprint("Dương")\nChương trình sẽ báo lỗi gì?',
      options: ['IndentationError', 'NameError', 'ValueError', 'TypeError'],
      correctAnswer: 0,
      explanation: 'Lệnh print("Dương") không được thụt lề so với dòng if nên phát sinh lỗi IndentationError: expected an indented block.'
    }
  ]
};
