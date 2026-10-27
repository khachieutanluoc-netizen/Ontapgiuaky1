import { LessonContent } from '../../types';

export const lesson18: LessonContent = {
  id: 18,
  title: 'Bài 18: Các lệnh vào ra đơn giản',
  subtitle: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
  chapter: 'Lập trình Python cơ bản',
  sgkPages: 'Trang 97 - 100 (SGK)',
  sbtPages: 'Trang 38 - 39 (SBT)',
  summaryMarkdown: `### 1. Lệnh nhập dữ liệu input()
- Cú pháp: \`<biến> = input(<Dòng thông báo>)\`
- **QUAN TRỌNG**: Lệnh \`input()\` trong Python **luôn luôn trả về giá trị kiểu xâu kí tự (str)**, kể cả khi người dùng gõ vào số.
  - Ví dụ: Người dùng gõ số 5, thì biến sẽ nhận giá trị \`"5"\` (xâu ký tự), không phải số nguyên 5.
  - Nếu thực hiện: \`print(2 * x)\` khi x = input() nhận "5", kết quả sẽ in ra \`"55"\` (phép lặp xâu), chứ không phải 10!

### 2. Các hàm chuyển đổi kiểu dữ liệu cơ bản
- Muốn thực hiện tính toán số học trên số nhập từ bàn phím, ta phải dùng các hàm ép kiểu:
  1. **\`int()\`**: Chuyển đổi sang số nguyên.
     - Ví dụ: \`n = int(input("Nhập số nguyên n: "))\`
     - \`int("123") -> 123\`
     - \`int(12.6) -> 12\` (cắt bỏ phần thập phân)
     - **Lưu ý lỗi**: \`int("12.5")\` sẽ gây lỗi \`ValueError\` vì xâu chứa dấu chấm thập phân. Không chuyển trực tiếp xâu biểu thức số học như \`int("5*2")\`.
  2. **\`float()\`**: Chuyển đổi sang số thực.
     - Ví dụ: \`x = float(input("Nhập số thực x: "))\`
     - \`float("12.5") -> 12.5\`
     - \`float(8) -> 8.0\`
  3. **\`str()\`**: Chuyển đổi dữ liệu bất kỳ sang xâu kí tự.
     - Ví dụ: \`str(125) -> "125"\`, \`str(3 > 2) -> "True"\`

### 3. Lệnh xuất dữ liệu print()
- Cú pháp: \`print(v1, v2, ..., vn, sep=" ", end="\\n")\`
- Mặc định các giá trị được phân tách bởi 1 khoảng trắng (dấu cách) và kết thúc bằng việc xuống dòng (\`\\n\`).
- Thay đổi ký tự phân cách bằng \`sep\`:
  - Ví dụ: \`print("09", "12", "2026", sep="/")\` in ra \`09/12/2026\`.
- Không xuống dòng bằng tham số \`end\`:
  - Ví dụ: \`print("A", end=" ")\` kết thúc bằng khoảng trắng thay vì xuống dòng.`,
  keyPoints: [
    'Lệnh input() luôn trả về kiểu xâu kí tự str.',
    'Để nhập số nguyên dùng int(input()), nhập số thực dùng float(input()).',
    'Lệnh int() không thể ép kiểu trực tiếp từ xâu biểu thức tính toán hoặc xâu số thực (gây ValueError).',
    'Lệnh print() cho phép in nhiều giá trị, có thể dùng sep để đổi ký tự phân cách và end để điều khiển kết thúc dòng.'
  ],
  codeExamples: [
    {
      title: 'Nhập tính chu vi & diện tích hình chữ nhật',
      code: `a = float(input("Nhập chiều dài: "))\nb = float(input("Nhập chiều rộng: "))\nchu_vi = (a + b) * 2\ndien_tich = a * b\nprint("Chu vi =", chu_vi, "Diện tích =", dien_tich)`,
      explanation: 'Sử dụng float(input()) để nhận số đo từ bàn phím và tính toán số học.'
    },
    {
      title: 'Tùy biến tham số sep và end trong print',
      code: `print("Hà Nội", "Việt Nam", sep=" - ")\nprint("Đang xử lý...", end="")\nprint("Hoàn thành!")`,
      explanation: 'sep=" - " tạo dấu gạch nối giữa các từ. end="" giúp câu lệnh in tiếp theo nối liền dòng.'
    }
  ],
  interactiveQuestions: [
    {
      id: 'l18_iq1',
      type: 'single_choice',
      prompt: 'Khi thực hiện câu lệnh: x = input("Nhập số: ") và người dùng gõ vào số 5. Lệnh print(2 * x) sẽ in ra kết quả gì?',
      options: ['10', "'55'", '2*x', 'Báo lỗi TypeError'],
      correctAnswer: 1,
      explanation: 'input() trả về xâu ký tự "5". Phép 2 * "5" thực hiện nhân bản chuỗi nên kết quả là "55" (SGK trang 97, SBT câu 18.5).'
    },
    {
      id: 'l18_iq2',
      type: 'fill_blank',
      prompt: 'Để nhập một số thực x từ bàn phím trong Python, cú pháp chuẩn là: x = ____(input("Nhập x: "))',
      codeTemplate: 'x = __BLANK__(input("Nhập x: "))',
      blankOptions: ['float', 'int', 'real', 'double'],
      correctAnswer: 'float',
      explanation: 'Dùng hàm float() để chuyển chuỗi do input() trả về thành số thực (SGK trang 99).'
    },
    {
      id: 'l18_iq3',
      type: 'multi_choice',
      prompt: 'Những lệnh chuyển đổi kiểu dữ liệu nào sau đây sẽ BÁO LỖI khi thực thi? (Chọn các phương án đúng)',
      options: [
        'int("12.5")',
        'int("123")',
        'float("123 + 4.5")',
        'str(150)',
        'int("5*2")'
      ],
      correctAnswers: [0, 2, 4],
      explanation: 'int("12.5") báo ValueError; float("123 + 4.5") và int("5*2") báo lỗi vì các hàm ép kiểu không tự tính toán biểu thức trong chuỗi (SBT câu 18.3).'
    },
    {
      id: 'l18_iq4',
      type: 'true_false_group',
      prompt: 'Xét tính Đúng/Sai của các khẳng định về lệnh vào ra trong Python:',
      statements: [
        { id: 's1', label: 'a', text: 'Lệnh input() luôn trả về dữ liệu kiểu số nguyên int nếu người dùng chỉ nhập chữ số', isCorrect: false },
        { id: 's2', label: 'b', text: 'Lệnh int(12.8) trong Python cho kết quả là số nguyên 12', isCorrect: true },
        { id: 's3', label: 'c', text: 'Tham số end=" " trong lệnh print() ngăn việc tự động xuống dòng sau khi in', isCorrect: true },
        { id: 's4', label: 'd', text: 'Lệnh str(12+34) trả về xâu ký tự "46"', isCorrect: true }
      ],
      explanation: 'input() luôn trả về kiểu str dù người dùng nhập gì. int(12.8) cắt phần thập phân thành 12. 12+34 = 46 nên str(12+34) = "46".'
    }
  ],
  quizQuestions: [
    {
      id: 'l18_q1',
      prompt: 'Để nhập giá trị cho biến số nguyên k từ bàn phím, ta dùng lệnh nào?',
      options: ['k = input()', 'k = int(input())', 'k = float(input())', 'k = integer(input())'],
      correctAnswer: 1,
      explanation: 'int(input()) nhận chuỗi từ bàn phím và chuyển thành số nguyên.'
    },
    {
      id: 'l18_q2',
      prompt: 'Lệnh print("A", "B", "C", sep="-") sẽ in ra:',
      options: ['A B C', 'A-B-C', 'ABC-', '-A-B-C'],
      correctAnswer: 1,
      explanation: 'sep="-" quy định ký tự phân cách giữa các đối tượng in là dấu gạch ngang.'
    },
    {
      id: 'l18_q3',
      prompt: 'Kết quả của lệnh: int(5.9) là:',
      options: ['5', '6', '5.0', 'Báo lỗi'],
      correctAnswer: 0,
      explanation: 'Hàm int() khi nhận số thực sẽ cắt bỏ phần thập phân, lấy phần nguyên là 5.'
    },
    {
      id: 'l18_q4',
      prompt: 'Khi thực hiện lệnh: a = float("15.0"), kiểu dữ liệu và giá trị của a là:',
      options: ["Kiểu str, giá trị '15.0'", 'Kiểu float, giá trị 15.0', 'Kiểu int, giá trị 15', 'Báo lỗi ValueError'],
      correctAnswer: 1,
      explanation: 'float("15.0") chuyển chuỗi thành số thực 15.0.'
    },
    {
      id: 'l18_q5',
      prompt: 'Lệnh nào sau đây sẽ gây ra lỗi ValueError?',
      options: ['int("100")', 'float("3.14")', 'int("10.5")', 'str(10.5)'],
      correctAnswer: 2,
      explanation: 'int() không chuyển trực tiếp được chuỗi có dấu chấm thập phân "10.5", cần float("10.5") rồi mới int().'
    },
    {
      id: 'l18_q6',
      prompt: 'Lệnh print("m" + 3 * "k") sẽ in ra:',
      options: ['mmmkkk', 'mkkk', 'm3k', 'mk mk mk'],
      correctAnswer: 1,
      explanation: '3 * "k" là "kkk", ghép với "m" thành "mkkk" (SBT câu 18.2b).'
    },
    {
      id: 'l18_q7',
      prompt: 'Trong lệnh print(), tham số nào dùng để thay đổi ký tự kết thúc thay vì xuống dòng mặc định?',
      options: ['sep', 'end', 'stop', 'newline'],
      correctAnswer: 1,
      explanation: 'Tham số end quy định chuỗi được in ở cuối lệnh print(), mặc định là \\n.'
    },
    {
      id: 'l18_q8',
      prompt: 'Kết quả của biểu thức: int("5" + "5") trong Python là:',
      options: ['10', '55', "'55'", 'Báo lỗi'],
      correctAnswer: 1,
      explanation: '"5" + "5" nối chuỗi thành "55", sau đó int("55") chuyển thành số nguyên 55.'
    },
    {
      id: 'l18_q9',
      prompt: 'Cho đoạn mã:\nx = "20"\ny = "26"\nprint(x + y)\nKết quả in ra là:',
      options: ['46', '2026', '20 26', 'Báo lỗi'],
      correctAnswer: 1,
      explanation: 'x và y đều là kiểu xâu (str), toán tử + thực hiện nối hai xâu thành "2026".'
    },
    {
      id: 'l18_q10',
      prompt: 'Để nhập đồng thời họ tên học sinh vào biến name và in lời chào, câu lệnh nào đúng?',
      options: [
        'name = input("Họ tên: "); print("Xin chào", name)',
        'name = read("Họ tên: "); print("Xin chào", name)',
        'input(name); echo(name)',
        'print = input("Xin chào")'
      ],
      correctAnswer: 0,
      explanation: 'name = input("Họ tên: ") lấy dữ liệu và print("Xin chào", name) xuất lời chào.'
    },
    {
      id: 'l18_q11',
      prompt: 'Kết quả của lệnh str(5 + 3) là:',
      options: ["'8'", '8', "'5 + 3'", '53'],
      correctAnswer: 0,
      explanation: '5 + 3 được tính trước ra 8, hàm str(8) chuyển thành xâu \'8\'.'
    },
    {
      id: 'l18_q12',
      prompt: 'Lệnh nào sau đây chuyển số nguyên 25 thành chuỗi ký tự?',
      options: ['int(25)', 'str(25)', 'char(25)', 'string(25)'],
      correctAnswer: 1,
      explanation: 'Hàm str() dùng để chuyển đổi kiểu dữ liệu sang chuỗi ký tự.'
    },
    {
      id: 'l18_q13',
      prompt: 'Khi thực hiện: float(123), kết quả là:',
      options: ['123', '123.0', "'123.0'", 'Báo lỗi'],
      correctAnswer: 1,
      explanation: 'float(123) chuyển số nguyên 123 thành số thực 123.0.'
    },
    {
      id: 'l18_q14',
      prompt: 'Cho đoạn mã:\na = int(input())\nb = int(input())\nprint(a + b)\nNếu người dùng nhập lần lượt 7 rồi nhấn Enter, sau đó nhập 3 và nhấn Enter thì màn hình in ra:',
      options: ['73', '10', '7 3', 'Báo lỗi'],
      correctAnswer: 1,
      explanation: 'a = 7, b = 3. a và b đã được ép kiểu sang int nên a + b = 10.'
    },
    {
      id: 'l18_q15',
      prompt: 'Biểu thức int(4.3 + 2) trả về kết quả nào?',
      options: ['6.3', '6', '7', 'Báo lỗi'],
      correctAnswer: 1,
      explanation: '4.3 + 2 = 6.3. int(6.3) lấy phần nguyên là 6 (SBT câu 18.4d).'
    },
    {
      id: 'l18_q16',
      prompt: 'Để in ra các số từ 1 đến 3 trên cùng một hàng cách nhau dấu phẩy: "1,2,3", ta có thể viết:',
      options: [
        'print(1, 2, 3, sep=",")',
        'print(1, 2, 3, end=",")',
        'print("1" + "2" + "3")',
        'print(1, 2, 3)'
      ],
      correctAnswer: 0,
      explanation: 'Tham số sep="," quy định dấu ngăn cách giữa 1, 2, 3 là dấu phẩy.'
    },
    {
      id: 'l18_q17',
      prompt: 'Nếu muốn viết một dòng thông báo hướng dẫn người dùng khi nhập dữ liệu, ta đặt dòng chữ đó ở đâu?',
      options: [
        'Bên trong cặp ngoặc đơn của hàm input()',
        'Bên ngoài hàm input()',
        'Trong dấu thăng # sau hàm input()',
        'Không thể thêm dòng hướng dẫn'
      ],
      correctAnswer: 0,
      explanation: 'input("Nội dung nhắc...") cho phép hiển thị lời nhắc trực tiếp trước khi nhận dữ liệu.'
    },
    {
      id: 'l18_q18',
      prompt: 'Cho đoạn lệnh: print("Nam", "học", "Tin", sep="*"). Kết quả in ra là:',
      options: ['Nam*học*Tin', 'Nam học Tin*', '*Nam*học*Tin*', 'Nam học Tin'],
      correctAnswer: 0,
      explanation: 'Dấu * sẽ chèn vào vị trí phân cách giữa các xâu: Nam*học*Tin.'
    },
    {
      id: 'l18_q19',
      prompt: 'Hàm nào dùng để chuyển đổi xâu "100" thành số nguyên để tính toán?',
      options: ['int()', 'str()', 'chr()', 'ord()'],
      correctAnswer: 0,
      explanation: 'int("100") trả về số nguyên 100.'
    },
    {
      id: 'l18_q20',
      prompt: 'Đoạn mã sau:\nprint("A", end="")\nprint("B", end="")\nprint("C")\nsẽ in ra màn hình:',
      options: ['ABC trên 1 dòng', 'A B C', 'A\\nB\\nC trên 3 dòng', 'A-B-C'],
      correctAnswer: 0,
      explanation: 'Tham số end="" khiến các lần in nối liền nhau không xuống dòng, kết quả ra: ABC.'
    }
  ]
};
