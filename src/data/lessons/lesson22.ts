import { LessonContent } from '../../types';

export const lesson22: LessonContent = {
  id: 22,
  title: 'Bài 22: Kiểu dữ liệu danh sách',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 111 - 114 (SGK)',
  sbtPages: 'Trang 46 - 47 (SBT)',
  summaryMarkdown: `### 1. Khái niệm kiểu dữ liệu danh sách (List)
- **Danh sách (List)**: Là tập hợp các phần tử được sắp xếp theo thứ tự và được bao quanh bởi cặp dấu ngoặc vuông \`[\ ]\`.
- **Cú pháp khởi tạo**:
  \`<tên list> = [<giá trị 1>, <giá trị 2>, ..., <giá trị n>]\`
  - Danh sách rỗng: \`a = []\` (độ dài bằng 0).
  - **Điểm đặc biệt của Python**: Các phần tử trong cùng một danh sách **có thể có kiểu dữ liệu khác nhau** (số nguyên, số thực, xâu kí tự, boolean,...).
    - Ví dụ: \`B = [1.5, 2, "Python", True, 0]\`.

### 2. Chỉ số và truy cập phần tử trong danh sách
- **Chỉ số (Index)**:
  - Chiều từ trái sang phải: Bắt đầu từ **\`0\`** đến **\`len() - 1\`**.
  - Chiều từ phải sang trái (chỉ số âm): Phần tử cuối cùng có chỉ số **\`-1\`**, phần tử áp chót có chỉ số **\`-2\`**,...
  - Truy cập: \`<tên list>[<chỉ số>]\` (ví dụ \`A[0]\` là phần tử đầu tiên, \`A[-1]\` là phần tử cuối).
  - Nếu truy cập chỉ số vượt quá phạm vi sẽ gây lỗi: \`IndexError: list index out of range\`.
- **Hàm \`len(A)\`**: Trả về độ dài (tổng số phần tử) của danh sách A.
- **Thay đổi giá trị phần tử**: Có thể gán lại trực tiếp: \`A[1] = "Mới"\`.
- **Lệnh xoá phần tử theo chỉ số**: \`del A[i]\` (xoá phần tử tại vị trí i).

### 3. Các phép toán và Duyệt phần tử danh sách
- **Phép ghép danh sách \`+\`**: Nối hai danh sách lại với nhau.
  - Ví dụ: \`[1, 2] + [3, 4] -> [1, 2, 3, 4]\`.
- **Phép nhân bản \`*\`**: Lặp lại các phần tử.
  - Ví dụ: \`[0] * 4 -> [0, 0, 0, 0]\`.
- **Phương thức \`append(x)\`**: Bổ sung phần tử x vào **cuối** danh sách.
  - Cú pháp: \`<danh sách>.append(<giá trị>)\`.
- **Hai cách duyệt danh sách bằng vòng lặp for**:
  1. Duyệt qua chỉ số:
     \`\`\`python
     for i in range(len(A)):
         print(A[i])
     \`\`\`
  2. Duyệt trực tiếp từng giá trị:
     \`\`\`python
     for item in A:
         print(item)
     \`\`\``,
  keyPoints: [
    'Danh sách trong Python nằm trong cặp ngoặc vuông [], phần tử có thể khác kiểu nhau.',
    'Chỉ số danh sách bắt đầu từ 0 đến len()-1; chỉ số -1 là phần tử cuối cùng.',
    'Lệnh del A[i] dùng để xoá phần tử tại chỉ số i.',
    'Phương thức A.append(x) thêm phần tử x vào vị trí cuối cùng của danh sách A.',
    'Truy cập chỉ số ngoài phạm vi sẽ gây lỗi IndexError.'
  ],
  codeExamples: [
    {
      title: 'Khởi tạo và truy cập chỉ số âm, dương',
      code: `A = [10, "Tin học", 3.14, True]\nprint("Độ dài:", len(A))\nprint("Phần tử đầu:", A[0])\nprint("Phần tử cuối:", A[-1])\nA[1] = "Python 10"\nprint(A)`,
      explanation: 'len(A) = 4. Chỉ số 0 lấy 10, chỉ số -1 lấy True. A[1] được thay thế bằng "Python 10".'
    },
    {
      title: 'Tạo danh sách các số chẵn',
      code: `chan = []\nfor i in range(1, 11):\n    if i % 2 == 0:\n        chan.append(i)\nprint("Danh sách chẵn:", chan)`,
      explanation: 'Sử dụng chan.append(i) để lần lượt thêm 2, 4, 6, 8, 10 vào cuối danh sách.'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l22_iq1',
      type: 'single_choice',
      prompt: 'Cho danh sách A = [10, 20, 30, 40, 50]. Giá trị của biểu thức A[2] + A[-1] là bao nhiêu?',
      options: ['80', '70', '60', '50'],
      correctAnswer: 0,
      explanation: 'A[2] là phần tử thứ 3 (giá trị 30). A[-1] là phần tử cuối cùng (giá trị 50). 30 + 50 = 80.'
    },
    {
      id: 'l22_iq2',
      type: 'fill_blank',
      prompt: 'Để bổ sung giá trị 100 vào cuối danh sách A trong Python, ta dùng lệnh: A.____(100)',
      codeTemplate: 'A.__BLANK__(100)',
      blankOptions: ['append', 'insert', 'add', 'push'],
      correctAnswer: 'append',
      explanation: 'Phương thức append() chuyên dùng để thêm phần tử vào cuối danh sách (SGK trang 113).'
    },
    {
      id: 'l22_iq3',
      type: 'multi_choice',
      prompt: 'Những đặc điểm nào sau đây là ĐÚNG về kiểu dữ liệu danh sách (List) trong Python? (Chọn các phương án đúng)',
      options: [
        'Các phần tử trong danh sách được đặt trong cặp ngoặc vuông [ ]',
        'Các phần tử trong một danh sách bắt buộc phải cùng một kiểu dữ liệu',
        'Chỉ số phần tử bắt đầu từ số 0',
        'Có thể thêm, sửa, xoá các phần tử trong danh sách sau khi tạo'
      ],
      correctAnswers: [0, 2, 3],
      explanation: 'Trong Python, danh sách có thể chứa các phần tử khác kiểu dữ liệu nhau (số, xâu, boolean cùng trong 1 list).'
    },
    {
      id: 'l22_iq4',
      type: 'true_false_group',
      prompt: 'Cho danh sách A = [1, 2, 3, 4, 5]. Xét tính Đúng/Sai của các câu lệnh sau:',
      statements: [
        { id: 's1', label: 'a', text: 'Hàm len(A) trả về giá trị là 5', isCorrect: true },
        { id: 's2', label: 'b', text: 'Lệnh del A[0] sẽ xoá phần tử có giá trị 1 khỏi danh sách', isCorrect: true },
        { id: 's3', label: 'c', text: 'Lệnh print(A[5]) sẽ in ra số 5', isCorrect: false },
        { id: 's4', label: 'd', text: 'Phép toán A + [6, 7] sẽ nối thêm 6 và 7 vào danh sách A', isCorrect: true }
      ],
      explanation: 'Danh sách có 5 phần tử thì chỉ số hợp lệ là 0 đến 4. A[5] sẽ gây lỗi IndexError: list index out of range.'
    }
  ],
  quizQuestions: [
    {
      id: 'l22_q1',
      prompt: 'Cho danh sách A = [1, 2, 3, 10, "Việt", True]. Lệnh print(A[4]) in ra giá trị gì?',
      options: ['10', "'Việt'", 'True', '3'],
      correctAnswer: 1,
      explanation: 'Chỉ số 0: 1, 1: 2, 2: 3, 3: 10, 4: "Việt" (SBT câu 22.1).'
    },
    {
      id: 'l22_q2',
      prompt: 'Để xoá phần tử đầu tiên của danh sách A, câu lệnh nào đúng?',
      options: ['del A[0]', 'A.delete(0)', 'A.removeFirst()', 'del A[1]'],
      correctAnswer: 0,
      explanation: 'del A[0] xoá phần tử ở vị trí chỉ số 0 (phần tử đầu tiên) (SBT câu 22.4).'
    },
    {
      id: 'l22_q3',
      prompt: 'Cho A = [1, 2, 3]. Sau lệnh A.append(4), độ dài của danh sách A là bao nhiêu?',
      options: ['3', '4', '5', '1'],
      correctAnswer: 1,
      explanation: 'append(4) thêm 1 phần tử vào cuối danh sách, độ dài tăng từ 3 lên 4.'
    },
    {
      id: 'l22_q4',
      prompt: 'Biểu thức len([10, 20, [30, 40], 50]) trả về kết quả là:',
      options: ['4', '5', '3', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Danh sách ngoài gồm 4 phần tử: 10, 20, danh sách con [30, 40], và 50.'
    },
    {
      id: 'l22_q5',
      prompt: 'Cho A = [5, 4, 3, 2, 1]. Giá trị của A[-2] là:',
      options: ['4', '2', '3', '1'],
      correctAnswer: 1,
      explanation: 'A[-1] là 1, A[-2] là 2 (phần tử kế cuối).'
    },
    {
      id: 'l22_q6',
      prompt: 'Kết quả của lệnh: [1, 2] + [3, 4] là:',
      options: ['[1, 2, 3, 4]', '[4, 6]', '[[1, 2], [3, 4]]', 'Báo lỗi TypeError'],
      correctAnswer: 0,
      explanation: 'Toán tử + thực hiện ghép nối hai danh sách thành một danh sách mới.'
    },
    {
      id: 'l22_q7',
      prompt: 'Lệnh nào sau đây dùng để xoá phần tử CUỐI CÙNG của danh sách A?',
      options: ['del A[-1]', 'del A[len(A)-1]', 'Cả hai đáp án trên đều đúng', 'del A[last]'],
      correctAnswer: 2,
      explanation: 'Phần tử cuối cùng có thể truy cập qua chỉ số âm -1 hoặc len(A)-1 (SGK trang 114).'
    },
    {
      id: 'l22_q8',
      prompt: 'Đoạn mã sau:\nA = [2, 4, 6, 8]\nfor i in range(len(A)):\n    A[i] = A[i] // 2\nprint(A)\nsẽ in ra:',
      options: ['[1, 2, 3, 4]', '[2, 4, 6, 8]', '[0, 2, 4, 6]', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Mỗi phần tử được chia nguyên cho 2: 2//2=1, 4//2=2, 6//2=3, 8//2=4.'
    },
    {
      id: 'l22_q9',
      prompt: 'Cho A = [10, 20, 30]. Nếu gọi lệnh A[3] = 40 thì điều gì xảy ra?',
      options: [
        'Danh sách thêm 40 vào cuối',
        'Báo lỗi IndexError: list assignment index out of range',
        'Phần tử 30 bị thay thế bằng 40',
        'Danh sách giữ nguyên'
      ],
      correctAnswer: 1,
      explanation: 'Không thể gán giá trị tại chỉ số chưa tồn tại bằng toán tử [], phải dùng A.append(40).'
    },
    {
      id: 'l22_q10',
      prompt: 'Cho đoạn mã:\na = []\nfor i in range(3):\n    a.append(i * 2)\nprint(a)\nKết quả in ra là:',
      options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[4, 2, 0]'],
      correctAnswer: 0,
      explanation: 'i nhận 0, 1, 2. a lần lượt append 0, 2, 4 -> [0, 2, 4].'
    },
    {
      id: 'l22_q11',
      prompt: 'Để tính tổng các phần tử trong danh sách số A = [3, 5, 2], ta có thể dùng:',
      options: ['sum(A)', 'tong(A)', 'A.sum()', 'A.total()'],
      correctAnswer: 0,
      explanation: 'Python cung cấp hàm dựng sẵn sum(A) để tính tổng các phần tử số trong danh sách.'
    },
    {
      id: 'l22_q12',
      prompt: 'Cho A = [1, -2, 3, -4, 5]. Đoạn mã sau đếm gì?\ndem = 0\nfor x in A:\n    if x < 0:\n        dem += 1',
      options: [
        'Đếm số lượng phần tử âm trong A (kết quả = 2)',
        'Đếm số lượng phần tử dương',
        'Tính tổng các phần tử âm',
        'Đếm tổng số phần tử'
      ],
      correctAnswer: 0,
      explanation: 'Các phần tử âm là -2 và -4, biến dem sẽ tăng 2 lần (SBT câu 22.3c).'
    },
    {
      id: 'l22_q13',
      prompt: 'Biểu thức [1] * 4 trong Python tạo ra danh sách nào?',
      options: ['[1, 1, 1, 1]', '[4]', '[1, 4]', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Toán tử * nhân bản danh sách [1] thành 4 phần tử [1, 1, 1, 1].'
    },
    {
      id: 'l22_q14',
      prompt: 'Danh sách rỗng trong Python được ký hiệu là:',
      options: ['[]', '{}', '()', '""'],
      correctAnswer: 0,
      explanation: 'Cặp ngoặc vuông rỗng [] biểu diễn danh sách rỗng (SGK trang 111).'
    },
    {
      id: 'l22_q15',
      prompt: 'Cho A = [10, 20, 30, 40]. Lệnh print(A[1:3]) sẽ in ra lát cắt nào?',
      options: ['[20, 30]', '[20, 30, 40]', '[10, 20]', '[30, 40]'],
      correctAnswer: 0,
      explanation: 'Lát cắt A[1:3] lấy từ chỉ số 1 đến trước chỉ số 3 (chỉ số 1 và 2), là [20, 30].'
    },
    {
      id: 'l22_q16',
      prompt: 'Cho đoạn mã:\nA = [1, 2, 3]\nB = A\nB.append(4)\nprint(A)\nKết quả in ra là gì?',
      options: ['[1, 2, 3, 4]', '[1, 2, 3]', '[4]', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Lệnh gán B = A khiến B và A cùng trỏ vào một đối tượng danh sách trong bộ nhớ, do đó thay đổi B cũng làm thay đổi A.'
    },
    {
      id: 'l22_q17',
      prompt: 'Hàm nào tìm giá trị lớn nhất trong một danh sách số A?',
      options: ['max(A)', 'A.max()', 'maximum(A)', 'greatest(A)'],
      correctAnswer: 0,
      explanation: 'Hàm dựng sẵn max(A) trả về phần tử có giá trị lớn nhất trong danh sách.'
    },
    {
      id: 'l22_q18',
      prompt: 'Đoạn mã sau:\nA = [10, 20, 30]\ndel A[1]\nprint(A)\nsẽ in ra:',
      options: ['[10, 30]', '[20, 30]', '[10, 20]', '[10]'],
      correctAnswer: 0,
      explanation: 'del A[1] xoá phần tử ở chỉ số 1 (giá trị 20), danh sách còn lại [10, 30].'
    },
    {
      id: 'l22_q19',
      prompt: 'Chỉ số của phần tử đầu tiên trong mọi danh sách Python luôn là:',
      options: ['0', '1', '-1', 'none'],
      correctAnswer: 0,
      explanation: 'Trong Python (và hầu hết ngôn ngữ hiện đại), chỉ số mảng bắt đầu từ 0.'
    },
    {
      id: 'l22_q20',
      prompt: 'Khi thực hiện lệnh: print(len([])) kết quả in ra là:',
      options: ['0', '1', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Danh sách rỗng không có phần tử nào nên độ dài bằng 0.'
    }
  ]
};
