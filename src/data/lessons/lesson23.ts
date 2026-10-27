import { LessonContent } from '../../types';

export const lesson23: LessonContent = {
  id: 23,
  title: 'Bài 23: Một số lệnh làm việc với dữ liệu danh sách',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 115 - 118 (SGK)',
  sbtPages: 'Trang 47 - 50 (SBT)',
  summaryMarkdown: `### 1. Duyệt danh sách với toán tử in
- **Toán tử \`in\`**: Dùng để kiểm tra một phần tử có nằm trong danh sách hay không.
  - Cú pháp: \`<giá trị> in <danh sách>\`
  - Trả về \`True\` nếu có, ngược lại trả về \`False\`.
  - Ví dụ: \`A = [1, 2, 3, 4, 5]\` -> \`2 in A\` trả về \`True\`, \`10 in A\` trả về \`False\`.
- **Toán tử \`not in\`**: Trả về \`True\` nếu giá trị KHÔNG nằm trong danh sách.
- Duyệt từng phần tử trực tiếp:
  \`\`\`python
  for item in A:
      print(item)
  \`\`\`

### 2. Một số phương thức làm việc với danh sách
| Phương thức | Cú pháp | Ý nghĩa / Chức năng |
| :--- | :--- | :--- |
| **\`append()\`** | \`A.append(x)\` | Thêm phần tử \`x\` vào cuối danh sách A |
| **\`insert()\`** | \`A.insert(k, x)\` | Chèn phần tử \`x\` vào vị trí chỉ số \`k\` của danh sách A |
| **\`remove()\`** | \`A.remove(x)\` | Xoá phần tử đầu tiên có giá trị bằng \`x\` trong A |
| **\`clear()\`** | \`A.clear()\` | Xoá sạch toàn bộ các phần tử, A trở thành \`[]\` |

### 3. Những lưu ý trọng tâm dễ gặp trong đề thi
- **Lỗi của phương thức \`remove(x)\`**:
  - Nếu giá trị \`x\` **không có** trong danh sách, Python sẽ lập tức báo lỗi \`ValueError: list.remove(x): x not in list\`.
  - Vì vậy trong thực tế, ta nên kiểm tra an toàn:
    \`\`\`python
    if x in A:
        A.remove(x)
    \`\`\`
- **Đặc điểm của phương thức \`insert(k, x)\`**:
  - Nếu $k < 0$: Chèn vào đầu danh sách (tương đương $k = 0$).
  - Nếu $k \\ge len(A)$: Chèn vào cuối danh sách (tương đương \`append(x)\`).
- **Phân biệt \`del\` và \`remove\`**:
  - \`del A[i]\`: Xoá theo **vị trí chỉ số** \`i\` (biết chỉ số).
  - \`A.remove(val)\`: Xoá theo **giá trị** \`val\` (chỉ xoá lần xuất hiện đầu tiên).`,
  keyPoints: [
    'Toán tử in trả về True nếu giá trị có trong danh sách, False nếu không.',
    'A.clear() xoá toàn bộ phần tử đưa danh sách về rỗng [].',
    'A.remove(x) xoá phần tử đầu tiên có giá trị x; nếu x không tồn tại sẽ báo lỗi ValueError.',
    'A.insert(k, x) chèn x vào vị trí chỉ số k; nếu k >= len(A) thì tương đương append(x).',
    'del xoá theo chỉ số, còn remove xoá theo giá trị.'
  ],
  codeExamples: [
    {
      title: 'Minh họa các phương thức list cơ bản',
      code: `A = [1, 2, 6, 10]\nA.insert(2, 5)     # Chèn 5 vào chỉ số 2 -> [1, 2, 5, 6, 10]\nA.remove(6)        # Xoá giá trị 6 -> [1, 2, 5, 10]\nprint("2 có trong A?", 2 in A) # True\nA.clear()          # Xoá sạch -> []\nprint("Sau khi clear:", A)`,
      explanation: 'SGK trang 116: insert dời các phần tử sau sang phải, clear xoá rỗng mảng.'
    },
    {
      title: 'Tạo dãy Fibonacci n phần tử',
      code: `n = 8\nF = [0, 1]\nfor i in range(2, n):\n    F.append(F[i - 1] + F[i - 2])\nprint("Dãy Fibonacci:", F)\n# [0, 1, 1, 2, 3, 5, 8, 13]`,
      explanation: 'Ứng dụng append() để sinh dãy số Fibonacci theo công thức truy hồi (SBT trang 48, 120).'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l23_iq1',
      type: 'single_choice',
      prompt: 'Cho danh sách A = [1, 2, 6, 10]. Sau khi thực hiện lệnh A.insert(2, 5), danh sách A trở thành:',
      options: ['[1, 2, 5, 6, 10]', '[1, 5, 2, 6, 10]', '[1, 2, 6, 5, 10]', '[1, 2, 6, 10, 5]'],
      correctAnswer: 0,
      explanation: 'A.insert(2, 5) chèn giá trị 5 vào vị trí chỉ số 2 (sau phần tử A[1] là 2), kết quả là [1, 2, 5, 6, 10] (SGK trang 116).'
    },
    {
      id: 'l23_iq2',
      type: 'fill_blank',
      prompt: 'Để xoá toàn bộ phần tử trong danh sách A, đưa A về danh sách rỗng [], ta gọi phương thức: A.____()',
      codeTemplate: 'A.__BLANK__()',
      blankOptions: ['clear', 'remove', 'delete', 'reset'],
      correctAnswer: 'clear',
      explanation: 'Phương thức A.clear() xóa toàn bộ các phần tử của danh sách (SGK trang 116).'
    },
    {
      id: 'l23_iq3',
      type: 'multi_choice',
      prompt: 'Giả sử A = [2, 4, "5", "Hà Nội", "Việt Nam", 9]. Những biểu thức nào sau đây trả về giá trị TRUE? (Chọn các phương án đúng)',
      options: [
        '4 in A',
        '5 in A',
        '"5" in A',
        '"Hà" in A',
        '"Việt Nam" in A'
      ],
      correctAnswers: [0, 2, 4],
      explanation: '4 in A (True). "5" là chuỗi kí tự có trong A (True), còn số nguyên 5 không có (False). "Hà" là xâu con nhưng không phải phần tử độc lập của list A (False). "Việt Nam" in A (True) (SBT câu 23.1).'
    },
    {
      id: 'l23_iq4',
      type: 'true_false_group',
      prompt: 'Xét tính Đúng/Sai của các phát biểu về các phương thức làm việc với danh sách trong Python:',
      statements: [
        { id: 's1', label: 'a', text: 'Lệnh A.remove(x) chỉ xoá phần tử đầu tiên tìm thấy có giá trị bằng x', isCorrect: true },
        { id: 's2', label: 'b', text: 'Nếu x không có trong danh sách A, lệnh A.remove(x) sẽ không làm gì và không báo lỗi', isCorrect: false },
        { id: 's3', label: 'c', text: 'Lệnh A.insert(len(A), x) có tác dụng giống hệt như lệnh A.append(x)', isCorrect: true },
        { id: 's4', label: 'd', text: 'Toán tử in có thể dùng trong câu lệnh điều kiện if lẫn vòng lặp for', isCorrect: true }
      ],
      explanation: 'Nếu x không có trong danh sách A, A.remove(x) chắc chắn báo lỗi ValueError! Lệnh A.insert(len(A), x) chèn vào vị trí cuối, tương đương append(x).'
    }
  ],
  quizQuestions: [
    {
      id: 'l23_q1',
      prompt: 'Cho danh sách A = [10, 20, 30, 20, 40]. Sau khi gọi A.remove(20), danh sách A là:',
      options: ['[10, 30, 20, 40]', '[10, 30, 40]', '[10, 20, 30, 40]', '[30, 20, 40]'],
      correctAnswer: 0,
      explanation: 'A.remove(x) chỉ xoá phần tử ĐẦU TIÊN có giá trị x, số 20 thứ hai vẫn được giữ lại.'
    },
    {
      id: 'l23_q2',
      prompt: 'Nếu thực hiện lệnh A.remove(99) khi trong danh sách A không có số 99, chương trình sẽ báo lỗi gì?',
      options: ['ValueError', 'IndexError', 'TypeError', 'SyntaxError'],
      correctAnswer: 0,
      explanation: 'Khi giá trị cần xoá không có trong danh sách, Python phát sinh ngoại lệ ValueError.'
    },
    {
      id: 'l23_q3',
      prompt: 'Cho A = [1, 2, 3]. Sau khi gọi A.clear(), lệnh len(A) trả về:',
      options: ['0', '3', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'clear() xóa toàn bộ phần tử trong danh sách, độ dài trở thành 0.'
    },
    {
      id: 'l23_q4',
      prompt: 'Cho A = [1, 4, 10, 0]. Để chèn số 5 vào sau số 4 (trở thành [1, 4, 5, 10, 0]), ta dùng lệnh nào?',
      options: ['A.insert(2, 5)', 'A.insert(1, 5)', 'A.insert(3, 5)', 'A.append(5)'],
      correctAnswer: 0,
      explanation: 'Vị trí sau số 4 có chỉ số là 2 (0 là 1, 1 là 4, chỉ số 2 mới là 5) (SBT câu 23.2).'
    },
    {
      id: 'l23_q5',
      prompt: 'Khi nào thì lệnh A.append(1) và A.insert(0, 1) có tác dụng HOÀN TOÀN GIỐNG NHAU?',
      options: [
        'Khi danh sách A ban đầu là danh sách rỗng []',
        'Khi danh sách A có đúng 1 phần tử',
        'Khi danh sách A có nhiều phần tử',
        'Không bao giờ giống nhau'
      ],
      correctAnswer: 0,
      explanation: 'Khi A = [], thêm vào cuối (append) hay chèn vào vị trí 0 (insert) đều cho kết quả [1] (SGK trang 118).'
    },
    {
      id: 'l23_q6',
      prompt: 'Kết quả của biểu thức: 10 in [1, 2, 3, 10, 20] là:',
      options: ['True', 'False', '10', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '10 có mặt trong danh sách nên toán tử in trả về True.'
    },
    {
      id: 'l23_q7',
      prompt: 'Kết quả của biểu thức: "abc" not in ["a", "b", "c"] là:',
      options: ['True', 'False', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '"abc" không phải là phần tử trong danh sách ["a", "b", "c"], do đó not in trả về True.'
    },
    {
      id: 'l23_q8',
      prompt: 'Cho A = [10, 20, 30]. Lệnh A.insert(100, 40) sẽ làm gì?',
      options: [
        'Chèn 40 vào cuối danh sách A',
        'Báo lỗi IndexError',
        'Tự động bổ sung 97 số 0 vào giữa',
        'Không làm gì cả'
      ],
      correctAnswer: 0,
      explanation: 'Nếu chỉ số k >= len(A), Python tự động chèn phần tử vào cuối danh sách (SGK trang 117).'
    },
    {
      id: 'l23_q9',
      prompt: 'Cho đoạn mã:\nA = [1, 2, 3]\nA.insert(-5, 0)\nprint(A)\nKết quả in ra là:',
      options: ['[0, 1, 2, 3]', '[1, 2, 3, 0]', 'Báo lỗi IndexError', '[1, 0, 2, 3]'],
      correctAnswer: 0,
      explanation: 'Nếu chỉ số k âm vượt quá giới hạn, Python chèn phần tử vào đầu danh sách (vị trí 0).'
    },
    {
      id: 'l23_q10',
      prompt: 'Sự khác biệt căn bản giữa lệnh del A[i] và A.remove(x) là gì?',
      options: [
        'del xoá phần tử theo chỉ số, còn remove xoá phần tử theo giá trị',
        'del xoá nhanh hơn remove',
        'remove chỉ dùng cho chuỗi ký tự, del chỉ dùng cho số',
        'Không có sự khác biệt'
      ],
      correctAnswer: 0,
      explanation: 'del A[i] định vị vị trí i để xoá; A.remove(x) tìm giá trị x đầu tiên để xoá.'
    },
    {
      id: 'l23_q11',
      prompt: 'Cho đoạn mã:\nA = [1, 2, 3, 4]\nwhile len(A) > 0:\n    A.pop()\nprint(A)\n(Lưu ý pop() lấy và xoá phần tử cuối). Kết quả in ra là:',
      options: ['[]', '[1]', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Vòng lặp xoá hết phần tử đến khi len(A) == 0, danh sách thành rỗng [].'
    },
    {
      id: 'l23_q12',
      prompt: 'Cho A = [1, 3, 5, 7]. Để kiểm tra xem số x nhập vào có phải số lẻ trong A không, ta viết:',
      options: ['if x in A:', 'if x == A:', 'if A has x:', 'if x inside A:'],
      correctAnswer: 0,
      explanation: 'Toán tử in là cú pháp chuẩn của Python để kiểm tra sự tồn tại của phần tử trong danh sách.'
    },
    {
      id: 'l23_q13',
      prompt: 'Đoạn mã sau thực hiện công việc gì?\nA = [1, 2, -5, 5, 8, -8]\nfor x in A:\n    if x < 0:\n        A.remove(x)',
      options: [
        'Xóa các phần tử âm khỏi danh sách A',
        'Đếm số lượng phần tử âm',
        'Thay thế số âm bằng số dương',
        'Tính tổng các số âm'
      ],
      correctAnswer: 0,
      explanation: 'Duyệt và gọi A.remove(x) với mỗi x < 0 để loại bỏ các số âm (SBT câu 23.7).'
    },
    {
      id: 'l23_q14',
      prompt: 'Cho A = ["Táo", "Cam", "Chuối"]. Lệnh A.insert(1, "Xoài") cho kết quả:',
      options: [
        '["Táo", "Xoài", "Cam", "Chuối"]',
        '["Xoài", "Táo", "Cam", "Chuối"]',
        '["Táo", "Cam", "Xoài", "Chuối"]',
        '["Táo", "Xoài", "Chuối"]'
      ],
      correctAnswer: 0,
      explanation: '"Xoài" được chèn vào chỉ số 1 (sau "Táo"), đẩy "Cam" và "Chuối" về phía sau.'
    },
    {
      id: 'l23_q15',
      prompt: 'Để xoá các phần tử trùng lặp trong một danh sách địa danh A, thuật toán nào thường được dùng?',
      options: [
        'Tạo danh sách mới B rỗng, duyệt qua A, nếu phần tử chưa có trong B (not in B) thì thêm vào B',
        'Dùng lệnh A.clear()',
        'Dùng lệnh A.remove(A[0])',
        'Dùng vòng lặp vô hạn'
      ],
      correctAnswer: 0,
      explanation: 'Dùng toán tử not in để kiểm tra trùng lặp và lọc danh sách duy nhất (SBT câu 23.10).'
    },
    {
      id: 'l23_q16',
      prompt: 'Dãy Fibonacci bắt đầu với hai số F[0] = 0, F[1] = 1. Giá trị của F[4] là bao nhiêu?',
      options: ['3', '2', '5', '1'],
      correctAnswer: 0,
      explanation: 'F[0]=0, F[1]=1, F[2]=1, F[3]=2, F[4]=3 (SBT câu 23.4).'
    },
    {
      id: 'l23_q17',
      prompt: 'Cho A = [5, 10, 15]. Lệnh A.insert(0, 20) sẽ biến danh sách A thành:',
      options: ['[20, 5, 10, 15]', '[5, 20, 10, 15]', '[5, 10, 15, 20]', '[20]'],
      correctAnswer: 0,
      explanation: 'Chỉ số 0 là vị trí đầu danh sách, chèn 20 vào trước 5.'
    },
    {
      id: 'l23_q18',
      prompt: 'Cho đoạn mã:\nA = [1, 2, 3]\nif 4 in A:\n    A.remove(4)\nprint(A)\nKết quả in ra là:',
      options: ['[1, 2, 3]', 'Báo lỗi ValueError', '[]', '[1, 2, 3, 4]'],
      correctAnswer: 0,
      explanation: 'Vì 4 in A trả về False nên lệnh remove(4) không bị gọi, tránh được lỗi ValueError, danh sách giữ nguyên [1, 2, 3].'
    },
    {
      id: 'l23_q19',
      prompt: 'Hàm nào chuyển ký tự c thành mã số nguyên ASCII tương ứng trong Python?',
      options: ['ord(c)', 'chr(c)', 'ascii(c)', 'int(c)'],
      correctAnswer: 0,
      explanation: 'Hàm ord("A") trả về 65, còn chr(65) trả về ký tự "A" (SBT câu 23.5).'
    },
    {
      id: 'l23_q20',
      prompt: 'Cho đoạn mã:\nA = ["Hà Nội", "Đà Nẵng", "TP HCM"]\nprint("Huế" in A)\nKết quả in ra là:',
      options: ['False', 'True', 'None', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: '"Huế" không nằm trong danh sách A, do đó trả về False.'
    }
  ]
};
