import { LessonContent } from '../../types';

export const lesson20: LessonContent = {
  id: 20,
  title: 'Bài 20: Câu lệnh lặp for',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 105 - 107 (SGK)',
  sbtPages: 'Trang 41 - 43 (SBT)',
  summaryMarkdown: `### 1. Cấu trúc lặp với số lần biết trước (Lệnh for)
- Lệnh **\`for\`** là câu lệnh lặp với số lần lặp thường được xác định trước.
- **Cú pháp**:
  \`\`\`python
  for <biến chạy> in range(m, n):
      <khối lệnh>
  \`\`\`
  - Sau câu lệnh \`for\` có dấu hai chấm \`:\`.
  - Khối lệnh được lặp thụt lề thống nhất.
  - Ở mỗi vòng lặp, \`<biến chạy>\` lần lượt nhận từng giá trị trong vùng do \`range()\` sinh ra.

### 2. Vùng giá trị của hàm range()
- **\`range(n)\`**: Trả lại vùng giá trị gồm $n$ số nguyên liên tiếp bắt đầu từ **\`0\`** đến **\`n - 1\`**.
  - Ví dụ: \`range(5)\` sinh ra dãy: \`0, 1, 2, 3, 4\` (gồm đúng 5 số, không có số 5).
- **\`range(m, n)\`**: Trả lại vùng giá trị từ **\`m\`** đến **\`n - 1\`**.
  - Ví dụ: \`range(1, 6)\` sinh ra dãy: \`1, 2, 3, 4, 5\`.
  - Nếu $m \\ge n$, \`range(m, n)\` trả về vùng rỗng (vòng lặp không chạy lần nào).
- **\`range(start, stop, step)\`**: Bổ sung bước nhảy \`step\`.
  - Ví dụ: \`range(1, 10, 2)\` sinh ra các số lẻ: \`1, 3, 5, 7, 9\`.

### 3. Các bài toán kinh điển dùng vòng lặp for
- **Tính tổng dãy số**: $S = 1 + 2 + ... + n$
  - Khởi tạo \`S = 0\`, duyệt \`for i in range(1, n + 1): S = S + i\`.
- **Đếm số ước**: Kiểm tra các số $k$ từ $1$ đến $n$ xem có thỏa mãn \`n % k == 0\` hay không.
- **Giải bài toán dân gian (Vét cạn)**:
  - "Vừa gà vừa chó / Bó lại cho tròn / Ba mươi sáu con / Một trăm chân chẵn".
  - Duyệt số gà \`k\` từ 0 đến 36: \`for k in range(37):\` kiểm tra \`k*2 + (36 - k)*4 == 100\`.`,
  keyPoints: [
    'Lệnh for dùng khi biết trước số lần lặp hoặc duyệt qua một dãy giá trị.',
    'range(n) chạy từ 0 đến n-1 (tổng cộng n số).',
    'range(m, n) chạy từ m đến n-1; nếu m >= n thì vùng rỗng.',
    'Cần cẩn thận cận trên: muốn duyệt đến n thì phải dùng range(1, n + 1).',
    'Trong mỗi vòng lặp, biến chạy tự động nhận giá trị tiếp theo mà không cần lệnh tăng i = i + 1 thủ công.'
  ],
  codeExamples: [
    {
      title: 'Tính tổng S = 1 + 2 + ... + n',
      code: `n = int(input("Nhập n: "))\nS = 0\nfor i in range(1, n + 1):\n    S = S + i\nprint("Tổng S =", S)`,
      explanation: 'range(1, n + 1) đảm bảo biến i nhận đủ từ 1 đến n (SGK trang 107).'
    },
    {
      title: 'Giải bài toán Vừa gà vừa chó',
      code: `for ga in range(37):\n    cho = 36 - ga\n    if ga * 2 + cho * 4 == 100:\n        print("Số gà:", ga, "Số chó:", cho)`,
      explanation: 'Kết quả in ra: Số gà: 22, Số chó: 14 (SBT trang 42, 112).'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l20_iq1',
      type: 'single_choice',
      prompt: 'Để sinh ra dãy các số nguyên: 5, 6, 7, 8, 9, 10, ta dùng lệnh range() nào sau đây?',
      options: ['range(5, 10)', 'range(5, 11)', 'range(6, 11)', 'range(5, 10, 1)'],
      correctAnswer: 1,
      explanation: 'range(m, n) kết thúc tại n - 1, do đó muốn dừng ở 10 thì n phải là 11: range(5, 11) (SBT câu 20.1c).'
    },
    {
      id: 'l20_iq2',
      type: 'fill_blank',
      prompt: 'Để tính tổng các số từ 1 đến 10, ta cần hoàn thiện câu lệnh: for i in ____(1, 11):',
      codeTemplate: 'for i in __BLANK__(1, 11):',
      blankOptions: ['range', 'list', 'loop', 'count'],
      correctAnswer: 'range',
      explanation: 'Hàm range(1, 11) tạo dãy từ 1 đến 10 cho biến i duyệt qua (SGK trang 106).'
    },
    {
      id: 'l20_iq3',
      type: 'multi_choice',
      prompt: 'Những lệnh range() nào dưới đây tạo ra một VÙNG RỖNG (không có phần tử nào và vòng lặp for không chạy lần nào)? (Chọn các phương án đúng)',
      options: ['range(10, 5)', 'range(0)', 'range(5, 5)', 'range(1, 5)'],
      correctAnswers: [0, 1, 2],
      explanation: 'range(m, n) với m >= n trả về vùng rỗng. range(0) cũng trả về vùng rỗng vì bắt đầu từ 0 đến < 0 (SGK trang 106).'
    },
    {
      id: 'l20_iq4',
      type: 'true_false_group',
      prompt: 'Xét tính Đúng/Sai của các phát biểu về câu lệnh lặp for trong Python:',
      statements: [
        { id: 's1', label: 'a', text: 'Lệnh for i in range(10): sẽ lặp đúng 10 lần với i chạy từ 0 đến 9', isCorrect: true },
        { id: 's2', label: 'b', text: 'Sau mỗi lần lặp, ta bắt buộc phải viết lệnh i = i + 1 để biến i tăng lên', isCorrect: false },
        { id: 's3', label: 'c', text: 'Biến chạy i trong for có thể dùng trực tiếp trong khối lệnh lặp để tính toán', isCorrect: true },
        { id: 's4', label: 'd', text: 'range(2, 8, 2) sinh ra dãy gồm các số: 2, 4, 6, 8', isCorrect: false }
      ],
      explanation: 'Trong Python, vòng lặp for tự động gán giá trị tiếp theo cho biến chạy i, không cần i = i + 1. range(2, 8, 2) dừng trước 8 nên chỉ gồm: 2, 4, 6 (không có 8).'
    }
  ],
  quizQuestions: [
    {
      id: 'l20_q1',
      prompt: 'Đoạn mã sau in ra gì?\nfor i in range(3):\n    print(i, end=" ")',
      options: ['0 1 2 ', '1 2 3 ', '0 1 2 3 ', '1 2 '],
      correctAnswer: 0,
      explanation: 'range(3) sinh ra các giá trị 0, 1, 2.'
    },
    {
      id: 'l20_q2',
      prompt: 'Cho đoạn mã:\ns = 0\nfor i in range(1, 4):\n    s = s + i\nprint(s)\nKết quả in ra là:',
      options: ['6', '10', '3', '4'],
      correctAnswer: 0,
      explanation: 'i lần lượt nhận các giá trị 1, 2, 3. s = 0 + 1 + 2 + 3 = 6.'
    },
    {
      id: 'l20_q3',
      prompt: 'Lệnh range(1, 10, 3) sinh ra dãy các số nào?',
      options: ['1, 4, 7', '1, 4, 7, 10', '3, 6, 9', '1, 3, 6, 9'],
      correctAnswer: 0,
      explanation: 'Bắt đầu từ 1, bước nhảy 3: 1, 1+3=4, 4+3=7. Giá trị kế tiếp 10 không thuộc khoảng < 10, nên dừng ở 7.'
    },
    {
      id: 'l20_q4',
      prompt: 'Vòng lặp for i in range(5, 10): sẽ thực hiện lặp bao nhiêu lần?',
      options: ['4 lần', '5 lần', '6 lần', '10 lần'],
      correctAnswer: 1,
      explanation: 'i nhận các giá trị 5, 6, 7, 8, 9 (tổng cộng 5 lần lặp).'
    },
    {
      id: 'l20_q5',
      prompt: 'Đoạn mã sau:\nfor i in range(4):\n    print("*", end="")\nsẽ in ra màn hình:',
      options: ['****', '***', '*****', '*'],
      correctAnswer: 0,
      explanation: 'Lệnh in 4 dấu sao liên tiếp trên một hàng.'
    },
    {
      id: 'l20_q6',
      prompt: 'Cho đoạn mã:\ntong = 0\nfor i in range(5):\n    if i % 2 == 0:\n        tong += i\nprint(tong)\nKết quả là:',
      options: ['6', '4', '10', '0'],
      correctAnswer: 0,
      explanation: 'i chạy 0, 1, 2, 3, 4. Các số chẵn là 0, 2, 4. tong = 0 + 2 + 4 = 6.'
    },
    {
      id: 'l20_q7',
      prompt: 'Để đếm số lượng các ước nguyên dương của số n, ta duyệt vòng lặp như thế nào?',
      options: [
        'for i in range(1, n + 1): if n % i == 0: count += 1',
        'for i in range(n): if n % i == 0: count += 1',
        'for i in range(1, n): if n // i == 0: count += 1',
        'for i in range(n + 1): if n % i == 0: count += 1'
      ],
      correctAnswer: 0,
      explanation: 'Ước số của n nằm trong đoạn [1, n], vì vậy cần duyệt range(1, n + 1) và tránh chia cho 0.'
    },
    {
      id: 'l20_q8',
      prompt: 'Kết quả của đoạn mã sau:\np = 1\nfor i in range(1, 5):\n    p = p * i\nprint(p)',
      options: ['24', '120', '10', '15'],
      correctAnswer: 0,
      explanation: 'p = 1 * 2 * 3 * 4 = 24 (tính 4 giai thừa).'
    },
    {
      id: 'l20_q9',
      prompt: 'Dãy số 0, 1, 2, 3, ..., 11 có thể tạo ra bằng lệnh range nào?',
      options: ['range(11)', 'range(12)', 'range(0, 11)', 'range(1, 12)'],
      correctAnswer: 1,
      explanation: 'range(12) tạo các số từ 0 đến 11 (SBT câu 20.1a).'
    },
    {
      id: 'l20_q10',
      prompt: 'Cho đoạn mã:\nfor i in range(1, 6):\n    if i == 3:\n        break\n    print(i, end=" ")\nKết quả in ra là:',
      options: ['1 2 ', '1 2 3 ', '1 2 4 5 ', '3 '],
      correctAnswer: 0,
      explanation: 'Khi i = 3, lệnh break lập tức thoát khỏi vòng lặp, do đó chỉ in 1 và 2.'
    },
    {
      id: 'l20_q11',
      prompt: 'Biểu thức range(-2, 3) sinh ra dãy số nào?',
      options: ['-2, -1, 0, 1, 2', '-2, -1, 0, 1, 2, 3', '-2, -1, 1, 2', '0, 1, 2'],
      correctAnswer: 0,
      explanation: 'Bắt đầu từ -2 và dừng trước 3: -2, -1, 0, 1, 2.'
    },
    {
      id: 'l20_q12',
      prompt: 'Để lặp lùi từ 10 về 1 với bước nhảy -1, ta viết lệnh range như thế nào?',
      options: ['range(10, 0, -1)', 'range(10, 1, -1)', 'range(1, 10, -1)', 'range(10, -1)'],
      correctAnswer: 0,
      explanation: 'range(10, 0, -1) bắt đầu từ 10, mỗi bước giảm 1, dừng trước 0 tức là dừng ở 1.'
    },
    {
      id: 'l20_q13',
      prompt: 'Cho đoạn mã sau:\ns = 0\nfor i in range(1, 4):\n    for j in range(1, 3):\n        s += 1\nprint(s)\nKết quả in ra là:',
      options: ['6', '5', '12', '4'],
      correctAnswer: 0,
      explanation: 'Vòng ngoài chạy 3 lần (1, 2, 3), vòng trong chạy 2 lần (1, 2). Tổng số lần thực hiện s += 1 là 3 * 2 = 6.'
    },
    {
      id: 'l20_q14',
      prompt: 'Trong bài toán "Vừa gà vừa chó", nếu gọi số gà là k (k từ 0 đến 36) thì số chó được biểu diễn là:',
      options: ['36 - k', 'k - 36', '100 - k', '100 - 2*k'],
      correctAnswer: 0,
      explanation: 'Tổng số con gà và chó là 36, nên số chó = 36 - k.'
    },
    {
      id: 'l20_q15',
      prompt: 'Cho đoạn mã:\nfor i in range(10):\n    print(i * i, end=" ")\nGiá trị cuối cùng được in ra màn hình là số nào?',
      options: ['81', '100', '9', '64'],
      correctAnswer: 0,
      explanation: 'Giá trị i cuối cùng là 9, khi đó in ra 9 * 9 = 81 (SBT câu 20.2).'
    },
    {
      id: 'l20_q16',
      prompt: 'Lệnh range(5, 5) sẽ thực hiện bao nhiêu lần lặp?',
      options: ['0 lần', '1 lần', '5 lần', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Start bằng stop nên tạo vùng rỗng, vòng lặp chạy 0 lần.'
    },
    {
      id: 'l20_q17',
      prompt: 'Đoạn mã sau tính biểu thức gì?\nS = 0\nfor i in range(1, n + 1):\n    S += 1 / i',
      options: [
        'Tổng nghịch đảo S = 1 + 1/2 + 1/3 + ... + 1/n',
        'Tổng bình phương',
        'Tổng các số nguyên từ 1 đến n',
        'Giai thừa của n'
      ],
      correctAnswer: 0,
      explanation: 'Mỗi vòng lặp cộng thêm 1/i, đây là tổng nghịch đảo (SBT câu 20.4).'
    },
    {
      id: 'l20_q18',
      prompt: 'Trong Python, lệnh for thường được kết hợp với hàm nào để tạo dãy chỉ số lặp?',
      options: ['range()', 'len()', 'input()', 'type()'],
      correctAnswer: 0,
      explanation: 'Hàm range() là hàm thông dụng nhất để sinh dãy số cho vòng lặp for.'
    },
    {
      id: 'l20_q19',
      prompt: 'Cho đoạn mã:\na = [2, 4, 6]\nfor x in a:\n    print(x * 2, end=" ")\nKết quả in ra là:',
      options: ['4 8 12 ', '2 4 6 ', '4 6 8 ', '12 '],
      correctAnswer: 0,
      explanation: 'Vòng lặp for duyệt từng phần tử trong danh sách a và nhân đôi: 2*2=4, 4*2=8, 6*2=12.'
    },
    {
      id: 'l20_q20',
      prompt: 'Phát biểu nào sau đây đúng về biến chạy trong vòng lặp for?',
      options: [
        'Bắt buộc phải đặt tên là i',
        'Có thể đặt tên tuỳ ý tuân theo quy tắc đặt tên biến',
        'Không thể in giá trị của nó ra màn hình',
        'Phải khai báo kiểu dữ liệu trước khi lặp'
      ],
      correctAnswer: 1,
      explanation: 'Biến chạy có thể đặt tên bất kỳ hợp lệ (như i, k, item, val, num,...).'
    }
  ]
};
