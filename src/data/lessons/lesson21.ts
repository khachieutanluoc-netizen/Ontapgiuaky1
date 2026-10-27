import { LessonContent } from '../../types';

export const lesson21: LessonContent = {
  id: 21,
  title: 'Bài 21: Câu lệnh lặp while',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 108 - 110 (SGK)',
  sbtPages: 'Trang 43 - 46 (SBT)',
  summaryMarkdown: `### 1. Cấu trúc lặp với số lần chưa biết trước (Lệnh while)
- Lệnh **\`while\`** thực hiện lặp một khối lệnh khi một điều kiện còn đúng (True), và số lần lặp thường **không được xác định trước**.
- **Cú pháp**:
  \`\`\`python
  while <điều kiện>:
      <khối lệnh>
  \`\`\`
  - <điều kiện> là một biểu thức logic (nhận True hoặc False).
  - Khối lệnh được thụt lề thống nhất.
  - Sau câu lệnh \`while\` có dấu hai chấm \`:\`.

### 2. Cơ chế hoạt động & Vòng lặp vô hạn
- **Cơ chế**:
  1. Python kiểm tra <điều kiện> trước.
  2. Nếu <điều kiện> là \`True\`: thực hiện <khối lệnh>, rồi quay lại bước 1.
  3. Nếu <điều kiện> là \`False\`: vòng lặp lập tức kết thúc.
  - *Lưu ý*: Nếu <điều kiện> sai ngay từ đầu, khối lệnh sẽ không được thực thi lần nào.
- **Vòng lặp vô hạn (Infinite Loop)**:
  - Xảy ra khi <điều kiện> luôn luôn đúng (không bao giờ nhận giá trị False). Khi đó chương trình bị "treo" hoặc chạy mãi không dừng.
  - Nguyên nhân: Quên không cập nhật giá trị biến điều khiển trong thân vòng lặp (ví dụ quên \`i = i + 1\`).
  - Thoát khẩn cấp: Dùng câu lệnh **\`break\`** để ngắt vòng lặp ngay lập tức khi gặp tình huống mong muốn.

### 3. Ba cấu trúc điều khiển cơ bản của lập trình
Mọi chương trình trong các ngôn ngữ lập trình bậc cao đều được xây dựng từ 3 cấu trúc cốt lõi:
1. **Cấu trúc tuần tự (Sequence)**: Các lệnh được thực hiện lần lượt từ trên xuống dưới.
2. **Cấu trúc rẽ nhánh (Selection)**: Lệnh \`if\`, \`if-else\` thực hiện khối lệnh tùy thuộc điều kiện đúng hay sai.
3. **Cấu trúc lặp (Iteration)**: Lệnh \`for\`, \`while\` lặp đi lặp lại khối lệnh nhiều lần.`,
  keyPoints: [
    'Lệnh while dùng khi số lần lặp chưa biết trước, lặp cho tới khi điều kiện trở thành False.',
    'Điều kiện lặp được kiểm tra trước khi thực hiện thân vòng lặp.',
    'Để tránh vòng lặp vô hạn, trong thân while bắt buộc phải có câu lệnh làm thay đổi biến điều kiện.',
    'Lệnh break dùng để thoát ngay lập tức khỏi vòng lặp.',
    'Ba cấu trúc lập trình cơ bản là: tuần tự, rẽ nhánh và lặp.'
  ],
  codeExamples: [
    {
      title: 'Nhập dữ liệu cho tới khi nhập số 0',
      code: `x = 1\ntong = 0\nwhile x != 0:\n    x = int(input("Nhập số (nhập 0 để kết thúc): "))\n    tong += x\nprint("Tổng các số đã nhập =", tong)`,
      explanation: 'Số lần lặp phụ thuộc hoàn toàn vào hành vi của người dùng (SGK trang 108).'
    },
    {
      title: 'Tìm số tự nhiên nhỏ nhất để tổng nghịch đảo >= 2',
      code: `S = 0\ni = 0\nwhile S < 2:\n    i = i + 1\n    S = S + 1 / i\nprint("Giá trị i cần tìm =", i)`,
      explanation: 'SBT câu 21.6: Kết quả tìm ra i = 4 (1 + 1/2 + 1/3 + 1/4 = 2.083 >= 2).'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l21_iq1',
      type: 'single_choice',
      prompt: 'Vòng lặp while trong Python kiểm tra điều kiện lặp vào thời điểm nào?',
      options: [
        'Trước khi thực hiện khối lệnh lặp',
        'Sau khi đã thực hiện khối lệnh lặp ít nhất 1 lần',
        'Ở giữa khối lệnh lặp',
        'Chỉ kiểm tra khi chương trình kết thúc'
      ],
      correctAnswer: 0,
      explanation: 'Lệnh while kiểm tra điều kiện trước, nếu đúng mới thực hiện khối lệnh (SGK trang 109).'
    },
    {
      id: 'l21_iq2',
      type: 'fill_blank',
      prompt: 'Để ngắt và thoát ngay lập tức ra khỏi một vòng lặp while hoặc for, ta dùng từ khoá: ____',
      codeTemplate: 'if dieu_kien_dung: __BLANK__',
      blankOptions: ['break', 'exit', 'stop', 'pass'],
      correctAnswer: 'break',
      explanation: 'Từ khóa break dùng để thoát tức thì khỏi vòng lặp gần nhất (SGK trang 110).'
    },
    {
      id: 'l21_iq3',
      type: 'multi_choice',
      prompt: 'Ba cấu trúc lập trình cơ bản cấu thành mọi chương trình trong ngôn ngữ bậc cao là gì? (Chọn 3 phương án đúng)',
      options: [
        'Cấu trúc tuần tự',
        'Cấu trúc rẽ nhánh',
        'Cấu trúc lặp',
        'Cấu trúc ngẫu nhiên'
      ],
      correctAnswers: [0, 1, 2],
      explanation: 'Ba cấu trúc cơ bản của lập trình có cấu trúc là: tuần tự (sequence), rẽ nhánh (selection) và lặp (iteration) (SGK trang 110).'
    },
    {
      id: 'l21_iq4',
      type: 'true_false_group',
      prompt: 'Xét tính Đúng/Sai của các khẳng định về câu lệnh while:',
      statements: [
        { id: 's1', label: 'a', text: 'Nếu điều kiện while sai ngay từ đầu thì khối lệnh lặp sẽ không được thực hiện lần nào', isCorrect: true },
        { id: 's2', label: 'b', text: 'Vòng lặp while k < 100: với k = 0 và không có lệnh tăng k sẽ tạo thành vòng lặp vô hạn', isCorrect: true },
        { id: 's3', label: 'c', text: 'Mọi bài toán viết bằng for đều không thể chuyển sang while được', isCorrect: false },
        { id: 's4', label: 'd', text: 'Sau từ khóa while và trước dấu hai chấm là một biểu thức số thực bắt buộc', isCorrect: false }
      ],
      explanation: 'Mọi vòng lặp for đều có thể tương đương chuyển sang while. Sau while là một biểu thức logic (điều kiện), không bắt buộc số thực.'
    }
  ],
  quizQuestions: [
    {
      id: 'l21_q1',
      prompt: 'Cho đoạn mã:\ni = 1\nwhile i < 4:\n    print(i, end=" ")\n    i += 1\nKết quả in ra là:',
      options: ['1 2 3 ', '1 2 3 4 ', '0 1 2 3 ', '1 '],
      correctAnswer: 0,
      explanation: 'i nhận 1, in 1, i thành 2; in 2, i thành 3; in 3, i thành 4; 4 < 4 là False dừng lại. In ra: 1 2 3.'
    },
    {
      id: 'l21_q2',
      prompt: 'Cho đoạn mã:\ni = 5\nwhile i < 5:\n    print(i)\n    i += 1\nKhối lệnh trong while sẽ lặp bao nhiêu lần?',
      options: ['0 lần', '1 lần', '5 lần', 'Vô hạn lần'],
      correctAnswer: 0,
      explanation: 'Ban đầu i = 5, điều kiện 5 < 5 là False ngay từ đầu nên vòng lặp không chạy lần nào (SBT câu 21.1b).'
    },
    {
      id: 'l21_q3',
      prompt: 'Đoạn mã sau:\nk = 1\nwhile k < 10:\n    k = k * 2\nprint(k)\nsẽ in ra giá trị nào?',
      options: ['16', '8', '10', '32'],
      correctAnswer: 0,
      explanation: 'k = 1 -> 2 -> 4 -> 8 (vẫn < 10) -> 16 (16 < 10 là False dừng). In ra: 16.'
    },
    {
      id: 'l21_q4',
      prompt: 'Hiện tượng vòng lặp vô hạn (chạy mãi không dừng) xảy ra khi nào?',
      options: [
        'Khi điều kiện lặp luôn luôn nhận giá trị True',
        'Khi điều kiện lặp nhận giá trị False ngay từ đầu',
        'Khi trong vòng lặp có lệnh print()',
        'Khi dùng hàm range()'
      ],
      correctAnswer: 0,
      explanation: 'Nếu điều kiện lặp không bao giờ trở thành False thì vòng lặp sẽ chạy vô hạn lần.'
    },
    {
      id: 'l21_q5',
      prompt: 'Để tính tổng các chữ số của một số nguyên dương n, ta có thể dùng vòng lặp while với điều kiện nào?',
      options: ['while n > 0:', 'while n == 0:', 'while n < 0:', 'while n % 10 == 0:'],
      correctAnswer: 0,
      explanation: 'Mỗi bước lấy chữ số cuối bằng n % 10 và rút gọn n //= 10 cho đến khi n bằng 0 (while n > 0) (SBT câu 21.9).'
    },
    {
      id: 'l21_q6',
      prompt: 'Cho đoạn mã:\ns = 0\ni = 1\nwhile s < 10:\n    s += i\n    i += 1\nprint(i)\nGiá trị in ra của i là:',
      options: ['5', '4', '6', '10'],
      correctAnswer: 0,
      explanation: 'Bước 1: s=1, i=2. Bước 2: s=3, i=3. Bước 3: s=6, i=4. Bước 4: s=10, i=5. Khi s=10, s < 10 là False dừng. print(i) in ra 5.'
    },
    {
      id: 'l21_q7',
      prompt: 'Cho đoạn mã:\nx = 10\nwhile x > 0:\n    x -= 3\nprint(x)\nKết quả in ra là:',
      options: ['-2', '1', '0', '-1'],
      correctAnswer: 0,
      explanation: 'x = 10 -> 7 -> 4 -> 1 -> -2. Khi x = -2 thì -2 > 0 là False, in ra -2.'
    },
    {
      id: 'l21_q8',
      prompt: 'Cấu trúc lặp while phù hợp nhất cho tình huống nào sau đây?',
      options: [
        'Lặp lại yêu cầu nhập mật khẩu cho đến khi người dùng nhập đúng',
        'Duyệt lần lượt 10 phần tử của một mảng cố định',
        'In bảng cửu chương 5 từ 1 đến 10',
        'Tính giá trị 10 giai thừa'
      ],
      correctAnswer: 0,
      explanation: 'Việc người dùng nhập bao nhiêu lần mới đúng mật khẩu là chưa biết trước, rất phù hợp với while.'
    },
    {
      id: 'l21_q9',
      prompt: 'Lệnh break trong vòng lặp while có tác dụng gì?',
      options: [
        'Tạm dừng chương trình 1 giây',
        'Thoát ngay lập tức khỏi vòng lặp',
        'Bỏ qua câu lệnh tiếp theo nhưng vẫn lặp tiếp',
        'Quay lại đầu chương trình'
      ],
      correctAnswer: 1,
      explanation: 'break ngắt và chấm dứt ngay vòng lặp chứa nó.'
    },
    {
      id: 'l21_q10',
      prompt: 'Cho đoạn mã:\ni = 0\nwhile True:\n    i += 1\n    if i == 5:\n        break\nprint(i)\nKết quả in ra là:',
      options: ['5', '4', '6', 'Chạy vô hạn'],
      correctAnswer: 0,
      explanation: 'while True lặp liên tục, khi i tăng đến 5 thì gặp break và thoát ra in giá trị 5.'
    },
    {
      id: 'l21_q11',
      prompt: 'Trong đoạn mã sau:\nn = 123\ntong = 0\nwhile n > 0:\n    tong += n % 10\n    n = n // 10\nprint(tong)\nKết quả in ra là:',
      options: ['6', '123', '321', '5'],
      correctAnswer: 0,
      explanation: 'Các chữ số tách ra lần lượt là 3, 2, 1. Tổng = 3 + 2 + 1 = 6.'
    },
    {
      id: 'l21_q12',
      prompt: 'Đoạn mã sau thực hiện bao nhiêu lần in?\ni = 1\nwhile i <= 5:\n    print(i)\n    i += 2',
      options: ['3 lần', '5 lần', '2 lần', '4 lần'],
      correctAnswer: 0,
      explanation: 'i lần lượt nhận 1, 3, 5 (thỏa mãn <= 5, in 3 lần). Khi i = 7 thì dừng.'
    },
    {
      id: 'l21_q13',
      prompt: 'Để tìm ước chung lớn nhất (UCLN) của hai số nguyên dương a và b theo thuật toán Euclid trừ dần, ta lặp khi nào?',
      options: ['while a != b:', 'while a == b:', 'while a > 0:', 'while b == 0:'],
      correctAnswer: 0,
      explanation: 'Thuật toán Euclid trừ dần lặp khi hai số còn khác nhau: while a != b: nếu a > b thì a -= b ngược lại b -= a.'
    },
    {
      id: 'l21_q14',
      prompt: 'Cho đoạn mã:\nx = 0\nwhile x < 3:\n    print(x, end="")\n    # Quên lệnh x += 1\nChương trình sẽ như thế nào?',
      options: [
        'In vô hạn số 0',
        'In 0 1 2',
        'Báo lỗi cú pháp SyntaxError',
        'Tự động dừng sau 3 giây'
      ],
      correctAnswer: 0,
      explanation: 'x luôn bằng 0 và luôn < 3 nên vòng lặp in liên tục số 0 không dừng (vòng lặp vô hạn).'
    },
    {
      id: 'l21_q15',
      prompt: 'Số tự nhiên Palindrom (số đối xứng) như 121, 13455431 có đặc điểm gì?',
      options: [
        'Viết theo chiều xuôi hay ngược lại đều thu được cùng một số',
        'Chỉ chia hết cho 1 và chính nó',
        'Luôn luôn là số chẵn',
        'Có tổng các chữ số bằng 10'
      ],
      correctAnswer: 0,
      explanation: 'Số Palindrom là số mà nếu viết các chữ số theo trình tự ngược lại ta vẫn thu được chính số ban đầu (SBT câu 21.13).'
    },
    {
      id: 'l21_q16',
      prompt: 'Cho đoạn mã:\na = 1\nwhile a < 10:\n    a += 3\nprint(a)\nGiá trị cuối cùng in ra là:',
      options: ['10', '13', '7', '9'],
      correctAnswer: 0,
      explanation: 'a bắt đầu là 1 -> 4 -> 7 -> 10. Khi a = 10, điều kiện a < 10 là False, dừng lặp và in 10.'
    },
    {
      id: 'l21_q17',
      prompt: 'Khẳng định nào sau đây là ĐÚNG về so sánh giữa vòng lặp for và while?',
      options: [
        'Vòng lặp for chạy nhanh hơn while gấp 10 lần',
        'Vòng lặp for thích hợp khi biết trước số lần lặp, còn while thích hợp khi số lần lặp phụ thuộc điều kiện',
        'Lệnh while không thể dùng toán tử so sánh',
        'Lệnh for không thể lồng trong lệnh while'
      ],
      correctAnswer: 1,
      explanation: 'Đây là đặc trưng phân biệt cơ bản trong thiết kế thuật toán giữa for và while.'
    },
    {
      id: 'l21_q18',
      prompt: 'Số hoàn hảo (Perfect Number) như 6 (1 + 2 + 3 = 6), 28 là số có tính chất gì?',
      options: [
        'Bằng tổng các ước thực sự của nó (các ước nhỏ hơn chính nó)',
        'Bằng tích của 2 số nguyên tố',
        'Là bình phương của một số tự nhiên',
        'Là số chia hết cho mọi số từ 1 đến 10'
      ],
      correctAnswer: 0,
      explanation: 'Số hoàn hảo là số tự nhiên có giá trị bằng tổng các ước thực sự của nó (SBT câu 21.14).'
    },
    {
      id: 'l21_q19',
      prompt: 'Lệnh continue trong thân vòng lặp while dùng để làm gì?',
      options: [
        'Bỏ qua phần còn lại của vòng lặp hiện tại và chuyển sang lần lặp kế tiếp',
        'Thoát hoàn toàn khỏi chương trình',
        'Xóa biến đếm',
        'Tăng gấp đôi số lần lặp'
      ],
      correctAnswer: 0,
      explanation: 'continue bỏ qua các câu lệnh phía sau nó trong lần lặp đó để quay lại kiểm tra điều kiện lặp kế tiếp.'
    },
    {
      id: 'l21_q20',
      prompt: 'Cho đoạn mã:\nc = 0\nwhile c < 5:\n    c += 1\n    if c == 3:\n        continue\n    print(c, end=" ")\nKết quả in ra là:',
      options: ['1 2 4 5 ', '1 2 3 4 5 ', '1 2 ', '3 4 5 '],
      correctAnswer: 0,
      explanation: 'Khi c = 3, lệnh continue bỏ qua lệnh print(c) nên số 3 không được in ra. Kết quả: 1 2 4 5.'
    }
  ]
};
