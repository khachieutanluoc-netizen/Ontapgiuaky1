import { LessonContent } from '../../types';

export const lesson17: LessonContent = {
  id: 17,
  title: 'Bài 17: Biến và lệnh gán',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 91 - 96 (SGK)',
  sbtPages: 'Trang 36 - 38 (SBT)',
  summaryMarkdown: `### 1. Khái niệm Biến và Lệnh gán
- **Biến (Variable)**: Là tên gọi (định danh) của một vùng nhớ dùng để lưu trữ giá trị (dữ liệu). Giá trị của biến có thể thay đổi trong quá trình thực hiện chương trình.
- **Cú pháp lệnh gán cơ bản**:
  \`<biến> = <biểu thức>\`
  - Thực hiện tính giá trị biểu thức bên phải trước, rồi gán kết quả cho biến bên trái.
  - Ví dụ: \`x = 10\`, \`y = x + 5\` (y nhận giá trị 15).
- **Lệnh gán đồng thời**:
  \`<biến 1>, <biến 2>, ... = <giá trị 1>, <giá trị 2>, ...\`
  - Ví dụ: \`x, y = 2, 3\` (x=2, y=3).
  - Đổi giá trị 2 biến nhanh chóng: \`x, y = y, x\`.

### 2. Quy tắc đặt tên biến trong Python
- Chỉ gồm các chữ cái (a-z, A-Z), chữ số (0-9) và dấu gạch dưới \`_\`.
- **Bắt buộc KHÔNG được bắt đầu bằng chữ số** (ví dụ: \`1x\` là sai, \`x1\` là đúng).
- **Phân biệt chữ hoa và chữ thường** (\`Age\` khác \`age\`).
- **Không được trùng với từ khoá (Keyword)** của Python (như \`if\`, \`for\`, \`while\`, \`class\`, \`def\`, \`global\`,...).
- Không chứa dấu cách và ký tự đặc biệt (như \`-\`, \`@\`, \`#\`, \`&\`, \`$\`,...).

### 3. Các kiểu dữ liệu cơ bản & Các phép toán
- \`int\`: Số nguyên (ví dụ: \`10\`, \`-5\`, \`0\`).
- \`float\`: Số thực có phần thập phân (ví dụ: \`3.14\`, \`2.0\`).
- \`str\`: Xâu kí tự đặt trong cặp nháy đơn \`' '\` hoặc nháy kép \`" "\`.
- \`bool\`: Kiểu logic gồm 2 giá trị \`True\` và \`False\`.
- Hàm **\`type(x)\`**: Trả về kiểu dữ liệu của biến hoặc giá trị x.
- **Phép toán số học**:
  - Cộng \`+\`, trừ \`-\`, nhân \`*\`, chia \`/\` (luôn ra float).
  - Chia lấy phần nguyên: \`//\` (ví dụ: \`7 // 2 = 3\`).
  - Chia lấy phần dư: \`%\` (ví dụ: \`7 % 2 = 1\`).
  - Lũy thừa: \`**\` (ví dụ: \`2 ** 3 = 8\`). Thứ tự ưu tiên lũy thừa cao nhất và tính từ phải sang trái (\`4**2**3 = 4**(8) = 65536\`).
- **Phép toán trên xâu**:
  - Phép nối xâu: \`+\` (ví dụ: \`"Hà " + "Nội" -> "Hà Nội"\`).
  - Phép lặp xâu: \`*\` với số nguyên dương (ví dụ: \`"123" * 3 -> "123123123"\`).`,
  keyPoints: [
    'Tên biến hợp lệ không bắt đầu bằng số, không chứa ký tự đặc biệt, không trùng từ khóa.',
    'Python phân biệt hoa - thường trong tên biến (ten, Ten, TEN là 3 biến khác nhau).',
    'Toán tử // chia lấy phần nguyên, % chia lấy số dư, ** là toán tử lũy thừa.',
    'Phép toán trên xâu: + là nối hai xâu, * là nhân bản (lặp) xâu với số nguyên.',
    'Cú pháp hoán đổi giá trị hai biến cực nhanh trong Python: x, y = y, x.'
  ],
  codeExamples: [
    {
      title: 'Đổi giá trị hai biến',
      code: `x, y = 10, 20\nx, y = y, x\nprint("x =", x, "y =", y)\n# In ra: x = 20 y = 10`,
      explanation: 'Lệnh gán đồng thời cho phép tráo đổi giá trị 2 biến mà không cần biến phụ.'
    },
    {
      title: 'Thao tác toán tử // và %',
      code: `so_giay = 3665\nsogio = so_giay // 3600\nso_giay = so_giay % 3600\nsophut = so_giay // 60\nsogiay = so_giay % 60\nprint(sogio, "giờ", sophut, "phút", sogiay, "giây")`,
      explanation: 'Ứng dụng chia nguyên // và chia dư % để đổi thời gian giây sang giờ, phút, giây.'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l17_iq1',
      type: 'single_choice',
      prompt: 'Tên biến nào sau đây là KHÔNG HỢP LỆ trong ngôn ngữ Python?',
      options: ['_tong_diem', '2ban_than', 'so_luong_1', 'HocSinhGioi'],
      correctAnswer: 1,
      explanation: 'Tên biến trong Python không được phép bắt đầu bằng chữ số (SBT câu 17.1).'
    },
    {
      id: 'l17_iq2',
      type: 'fill_blank',
      prompt: 'Để xác định kiểu dữ liệu của biến a trong Python, ta dùng hàm: ____(a).',
      codeTemplate: '__BLANK__(a)',
      blankOptions: ['type', 'typeof', 'datatype', 'kind'],
      correctAnswer: 'type',
      explanation: 'Hàm type() trong Python trả về kiểu dữ liệu của đối tượng (SGK trang 98).'
    },
    {
      id: 'l17_iq3',
      type: 'multi_choice',
      prompt: 'Những từ nào dưới đây là TỪ KHÓA (Keyword) của Python và KHÔNG ĐƯỢC dùng để đặt tên biến? (Chọn các phương án đúng)',
      options: ['global', 'while', 'tong', 'def', 'diem_thi'],
      correctAnswers: [0, 1, 3],
      explanation: 'global, while, def là các từ khóa cấu trúc của Python (SGK trang 95).'
    },
    {
      id: 'l17_iq4',
      type: 'true_false_group',
      prompt: 'Xét tính Đúng/Sai của các nhận định về phép toán và biểu thức trong Python:',
      statements: [
        { id: 's1', label: 'a', text: 'Biểu thức 17 // 3 cho kết quả là 5', isCorrect: true },
        { id: 's2', label: 'b', text: 'Biểu thức 17 % 3 cho kết quả là 1', isCorrect: false },
        { id: 's3', label: 'c', text: 'Biểu thức "Python" * 2 cho kết quả là "PythonPython"', isCorrect: true },
        { id: 's4', label: 'd', text: 'Biểu thức 2 ** 3 ** 2 có giá trị bằng 512', isCorrect: true }
      ],
      explanation: '17 % 3 = 2 (do 17 = 5*3 + 2). Phép luỹ thừa tính từ phải sang trái: 3**2 = 9; 2**9 = 512.'
    }
  ],
  quizQuestions: [
    {
      id: 'l17_q1',
      prompt: 'Trong Python, tên biến nào sau đây là hợp lệ?',
      options: ['My-Variable', '123_abc', '_diem_thi', 'def'],
      correctAnswer: 2,
      explanation: 'Tên biến có thể bắt đầu bằng dấu gạch dưới _, không chứa dấu gạch ngang -, không bắt đầu bằng số, không trùng từ khóa def.'
    },
    {
      id: 'l17_q2',
      prompt: 'Cho đoạn mã:\n>>> a, b = 2, 3\n>>> a, b = a + b, a - b\nGiá trị của a và b sau đoạn mã là:',
      options: ['a = 5, b = -1', 'a = 5, b = 1', 'a = 2, b = 3', 'Báo lỗi SyntaxError'],
      correctAnswer: 0,
      explanation: 'Bên phải được tính cùng lúc: a + b = 5, a - b = -1. Sau đó gán đồng thời a = 5, b = -1 (SBT câu 17.3).'
    },
    {
      id: 'l17_q3',
      prompt: 'Kết quả của lệnh print(type(10.5)) là gì?',
      options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
      correctAnswer: 1,
      explanation: '10.5 là số thực, thuộc kiểu dữ liệu float.'
    },
    {
      id: 'l17_q4',
      prompt: 'Biểu thức 14 % 4 trong Python có giá trị là:',
      options: ['3', '2', '3.5', '0'],
      correctAnswer: 1,
      explanation: '14 chia 4 được 3 dư 2 (14 = 4 * 3 + 2), nên 14 % 4 = 2.'
    },
    {
      id: 'l17_q5',
      prompt: 'Cho x = 10, y = 3. Giá trị của biểu thức x // y là:',
      options: ['3.333', '3', '1', '4'],
      correctAnswer: 1,
      explanation: '// là phép chia lấy phần nguyên, 10 // 3 = 3.'
    },
    {
      id: 'l17_q6',
      prompt: 'Cho đoạn mã:\ns1 = "Tin học "\ns2 = "10"\nprint(s1 + s2)\nKết quả in ra là:',
      options: ['Tin học 10', 'Tin học10', 'Tin học + 10', 'Báo lỗi TypeError'],
      correctAnswer: 0,
      explanation: 'Toán tử + thực hiện nối hai chuỗi lại với nhau tạo thành "Tin học 10".'
    },
    {
      id: 'l17_q7',
      prompt: 'Kết quả của lệnh print("Ha" * 3) là:',
      options: ['Ha3', 'Ha Ha Ha', 'HaHaHa', 'Báo lỗi TypeError'],
      correctAnswer: 2,
      explanation: 'Phép * giữa xâu và số nguyên dương thực hiện lặp lại xâu đó 3 lần không có dấu cách: "HaHaHa".'
    },
    {
      id: 'l17_q8',
      prompt: 'Trong các phép toán sau, phép toán nào có thứ tự ưu tiên cao nhất trong Python?',
      options: ['Cộng (+)', 'Nhân (*)', 'Lũy thừa (**)', 'Chia nguyên (//)'],
      correctAnswer: 2,
      explanation: 'Phép lũy thừa ** có độ ưu tiên cao nhất trong các phép toán số học.'
    },
    {
      id: 'l17_q9',
      prompt: 'Cho a = 5, b = 2. Lệnh gán c = a / b sẽ cho biến c có kiểu dữ liệu gì?',
      options: ['int', 'float', 'str', 'bool'],
      correctAnswer: 1,
      explanation: 'Phép chia / trong Python luôn trả về kiểu số thực float (c = 2.5).'
    },
    {
      id: 'l17_q10',
      prompt: 'Biến a, b = 2, "OK". Lệnh a, b = 3*a, a*b cho kết quả a, b là gì?',
      options: [
        'a = 6, b = "OKOK"',
        'a = 6, b = "OKOKOK"',
        'a = 2, b = "OK"',
        'Báo lỗi phép nhân'
      ],
      correctAnswer: 0,
      explanation: '3*a = 3*2 = 6. a*b = 2*"OK" = "OKOK". Do đó a=6, b="OKOK" (SBT câu 17.4).'
    },
    {
      id: 'l17_q11',
      prompt: 'Phát biểu nào sau đây về quy tắc đặt tên biến trong Python là ĐÚNG?',
      options: [
        'Tên biến có thể chứa khoảng trắng nếu dùng dấu ngoặc đơn',
        'Tên biến không phân biệt chữ hoa và chữ thường',
        'Tên biến có thể bắt đầu bằng chữ cái hoặc dấu gạch dưới _',
        'Tên biến có thể dùng bất kỳ từ khóa nào của Python'
      ],
      correctAnswer: 2,
      explanation: 'Quy tắc: bắt đầu bằng chữ cái hoặc dấu gạch dưới _, không bắt đầu bằng số.'
    },
    {
      id: 'l17_q12',
      prompt: 'Giá trị của biểu thức 4 ** 0.5 trong Python là bao nhiêu?',
      options: ['2', '2.0', '16', '16.0'],
      correctAnswer: 1,
      explanation: '4 ** 0.5 tương đương căn bậc hai của 4, kết quả là số thực 2.0.'
    },
    {
      id: 'l17_q13',
      prompt: 'Đoạn mã sau có lỗi gì?\n>>> if = 10',
      options: ['NameError', 'SyntaxError', 'ValueError', 'TypeError'],
      correctAnswer: 1,
      explanation: 'Từ khóa if là từ khóa dành riêng cho cấu trúc điều khiển, không được dùng làm tên biến (SGK trang 95).'
    },
    {
      id: 'l17_q14',
      prompt: 'Cho đoạn mã:\nx = 10\ny = x**2 - 1\nx = x/2 + y\nGiá trị của x sau cùng là bao nhiêu?',
      options: ['104.0', '99.0', '104', '94.0'],
      correctAnswer: 0,
      explanation: 'y = 100 - 1 = 99. x = 10/2 + 99 = 5.0 + 99 = 104.0 (SGK trang 93).'
    },
    {
      id: 'l17_q15',
      prompt: 'Lệnh nào sau đây kiểm tra xem giá trị của biến n có phải là số chẵn không?',
      options: ['n / 2 == 0', 'n // 2 == 0', 'n % 2 == 0', 'n ** 2 == 0'],
      correctAnswer: 2,
      explanation: 'Số chẵn là số chia hết cho 2 (phần dư n % 2 bằng 0).'
    },
    {
      id: 'l17_q16',
      prompt: 'Kết quả của lệnh print("10" + "0"*5) là gì?',
      options: ['1000000', '100000', '50', 'Báo lỗi'],
      correctAnswer: 1,
      explanation: '"0"*5 = "00000". "10" + "00000" = "100000" (SBT câu 17.5).'
    },
    {
      id: 'l17_q17',
      prompt: 'Trong Python, biểu thức (12 - 10//2)**2 - 1 có giá trị là:',
      options: ['48', '47', '49', '0'],
      correctAnswer: 0,
      explanation: '10//2 = 5; 12 - 5 = 7; 7**2 = 49; 49 - 1 = 48 (SGK trang 94).'
    },
    {
      id: 'l17_q18',
      prompt: 'Lệnh gán nào sau đây bị lỗi cú pháp?',
      options: ['a = b = c = 0', 'x, y = 1, 2', 'a = 5 + * 3', 's = "Python"'],
      correctAnswer: 2,
      explanation: 'Cú pháp + * là sai quy tắc biểu thức toán học.'
    },
    {
      id: 'l17_q19',
      prompt: 'Kiểu dữ liệu nào sau đây lưu trữ các giá trị True hoặc False?',
      options: ['int', 'float', 'bool', 'str'],
      correctAnswer: 2,
      explanation: 'Kiểu boolean (bool) chỉ có 2 giá trị chân lý: True và False.'
    },
    {
      id: 'l17_q20',
      prompt: 'Cho biết kiểu dữ liệu của biểu thức 5 > 2 trong Python:',
      options: ['int', 'bool', 'str', 'float'],
      correctAnswer: 1,
      explanation: '5 > 2 là biểu thức so sánh trả về True, thuộc kiểu dữ liệu bool.'
    }
  ]
};
