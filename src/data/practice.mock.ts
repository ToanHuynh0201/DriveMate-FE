import { CircuitExercise, CommonError } from '@/models/practice.model';

export const CIRCUIT_EXERCISES: CircuitExercise[] = [
  // B1 - 7 bài thi
  {
    id: 'b1-1',
    license: 'B1',
    number: 1,
    name: 'Xuất phát',
    steps: [
      { id: 'b1-1-c1', type: 'correct', description: 'Quan sát gương chiếu hậu và xung quanh trước khi xuất phát' },
      { id: 'b1-1-c2', type: 'correct', description: 'Bật xi-nhan trái, từ từ nhả côn kết hợp tăng ga đều để xuất phát' },
      { id: 'b1-1-d1', type: 'deduct', description: 'Xe tắt máy 1 lần khi xuất phát (-5 điểm)', points: -5 },
      { id: 'b1-1-e1', type: 'eliminate', description: 'Xe tắt máy 2 lần trở lên khi xuất phát (loại)' },
    ],
  },
  {
    id: 'b1-2',
    license: 'B1',
    number: 2,
    name: 'Dừng vạch dừng',
    steps: [
      { id: 'b1-2-c1', type: 'correct', description: 'Giảm tốc độ từ từ, đạp phanh nhẹ để dừng xe đúng vạch' },
      { id: 'b1-2-c2', type: 'correct', description: 'Đầu xe dừng cách vạch dừng không quá 50cm' },
      { id: 'b1-2-d1', type: 'deduct', description: 'Đầu xe vượt qua vạch dừng (-5 điểm)', points: -5 },
      { id: 'b1-2-e1', type: 'eliminate', description: 'Bánh trước chạm hoặc vượt vạch dừng (loại)' },
    ],
  },
  {
    id: 'b1-3',
    license: 'B1',
    number: 3,
    name: 'Dốc cầu',
    steps: [
      { id: 'b1-3-c1', type: 'correct', description: 'Tăng ga đều khi lên dốc, giữ tốc độ ổn định' },
      { id: 'b1-3-c2', type: 'correct', description: 'Dừng xe trên dốc, kéo phanh tay, nhả phanh chân' },
      { id: 'b1-3-c3', type: 'correct', description: 'Khởi hành trên dốc: nhả phanh tay, tăng ga, nhả côn từ từ' },
      { id: 'b1-3-d1', type: 'deduct', description: 'Xe lùi quá 30cm khi khởi hành trên dốc (-5 điểm)', points: -5 },
      { id: 'b1-3-e1', type: 'eliminate', description: 'Xe lùi quá 50cm hoặc tắt máy 2 lần (loại)' },
    ],
  },
  {
    id: 'b1-4',
    license: 'B1',
    number: 4,
    name: 'Hàng dọc chữ Z',
    steps: [
      { id: 'b1-4-c1', type: 'correct', description: 'Giữ tốc độ thấp, quan sát cột mốc hai bên để căn chỉnh' },
      { id: 'b1-4-c2', type: 'correct', description: 'Đánh lái nhẹ nhàng, không đánh lái giật cục' },
      { id: 'b1-4-c3', type: 'correct', description: 'Giữ khoảng cách đều với cột mốc hai bên' },
      { id: 'b1-4-d1', type: 'deduct', description: 'Chạm vào cột mốc (-5 điểm)', points: -5 },
      { id: 'b1-4-e1', type: 'eliminate', description: 'Đổ cột mốc hoặc ra ngoài vạch đường (loại)' },
    ],
  },
  {
    id: 'b1-5',
    license: 'B1',
    number: 5,
    name: 'Ngã tư',
    steps: [
      { id: 'b1-5-c1', type: 'correct', description: 'Quan sát kỹ đèn tín hiệu và biển báo trước khi vào ngã tư' },
      { id: 'b1-5-c2', type: 'correct', description: 'Bật xi-nhan đúng hướng rẽ trước ít nhất 30m' },
      { id: 'b1-5-c3', type: 'correct', description: 'Nhường đường cho xe đi thẳng khi rẽ trái' },
      { id: 'b1-5-d1', type: 'deduct', description: 'Không bật xi-nhan hoặc bật xi-nhan sai hướng (-5 điểm)', points: -5 },
      { id: 'b1-5-e1', type: 'eliminate', description: 'Vượt đèn đỏ hoặc không nhường đường đúng quy định (loại)' },
    ],
  },
  {
    id: 'b1-6',
    license: 'B1',
    number: 6,
    name: 'Đường cong chữ S',
    steps: [
      { id: 'b1-6-c1', type: 'correct', description: 'Giảm tốc độ trước khi vào đường cong, giữ tốc độ đều' },
      { id: 'b1-6-c2', type: 'correct', description: 'Căn chỉnh vô lăng theo đường cong, không đánh lái đột ngột' },
      { id: 'b1-6-c3', type: 'correct', description: 'Nhìn xa về phía trước để dự đoán hướng đường' },
      { id: 'b1-6-d1', type: 'deduct', description: 'Bánh xe chạm vạch kẻ đường (-5 điểm)', points: -5 },
      { id: 'b1-6-e1', type: 'eliminate', description: 'Xe ra ngoài phần đường quy định (loại)' },
    ],
  },
  {
    id: 'b1-7',
    license: 'B1',
    number: 7,
    name: 'Đỗ xe',
    steps: [
      { id: 'b1-7-c1', type: 'correct', description: 'Bật xi-nhan, quan sát gương và điểm mù trước khi vào vị trí đỗ' },
      { id: 'b1-7-c2', type: 'correct', description: 'Đưa xe vào vị trí đỗ chính xác, song song với vỉa hè' },
      { id: 'b1-7-c3', type: 'correct', description: 'Kéo phanh tay, tắt động cơ sau khi đỗ xe hoàn toàn' },
      { id: 'b1-7-d1', type: 'deduct', description: 'Khoảng cách với vỉa hè hoặc xe bên cạnh quá 30cm (-5 điểm)', points: -5 },
      { id: 'b1-7-e1', type: 'eliminate', description: 'Xe chạm vào xe khác hoặc leo lề khi đỗ (loại)' },
    ],
  },

  // B2 - 7 bài thi
  {
    id: 'b2-1',
    license: 'B2',
    number: 1,
    name: 'Xuất phát',
    steps: [
      { id: 'b2-1-c1', type: 'correct', description: 'Điều chỉnh gương chiếu hậu, thắt dây an toàn trước khi xuất phát' },
      { id: 'b2-1-c2', type: 'correct', description: 'Bật xi-nhan, quan sát và xuất phát từ từ' },
      { id: 'b2-1-d1', type: 'deduct', description: 'Xe chồm mạnh khi xuất phát (-5 điểm)', points: -5 },
      { id: 'b2-1-e1', type: 'eliminate', description: 'Tắt máy 2 lần trở lên khi xuất phát (loại)' },
    ],
  },
  {
    id: 'b2-2',
    license: 'B2',
    number: 2,
    name: 'Dừng vạch dừng',
    steps: [
      { id: 'b2-2-c1', type: 'correct', description: 'Giảm tốc độ sớm, phanh nhẹ để dừng xe mượt mà' },
      { id: 'b2-2-c2', type: 'correct', description: 'Dừng đúng vạch, không quá 30cm' },
      { id: 'b2-2-d1', type: 'deduct', description: 'Vượt qua vạch dừng (-5 điểm)', points: -5 },
      { id: 'b2-2-e1', type: 'eliminate', description: 'Bánh xe vượt hoàn toàn qua vạch dừng (loại)' },
    ],
  },
  {
    id: 'b2-3',
    license: 'B2',
    number: 3,
    name: 'Dốc cầu',
    steps: [
      { id: 'b2-3-c1', type: 'correct', description: 'Giảm số trước khi lên dốc, tăng ga đều' },
      { id: 'b2-3-c2', type: 'correct', description: 'Dừng xe trên dốc bằng phanh tay' },
      { id: 'b2-3-c3', type: 'correct', description: 'Khởi hành: nhả phanh tay đồng thời tăng ga nhẹ' },
      { id: 'b2-3-d1', type: 'deduct', description: 'Xe lùi quá 30cm (-5 điểm)', points: -5 },
      { id: 'b2-3-e1', type: 'eliminate', description: 'Xe lùi quá 50cm (loại)' },
    ],
  },
  {
    id: 'b2-4',
    license: 'B2',
    number: 4,
    name: 'Hàng dọc chữ Z',
    steps: [
      { id: 'b2-4-c1', type: 'correct', description: 'Tốc độ thấp, căn chỉnh khoảng cách với cột mốc đều nhau' },
      { id: 'b2-4-c2', type: 'correct', description: 'Đánh lái từ từ, quan sát gương hậu thường xuyên' },
      { id: 'b2-4-c3', type: 'correct', description: 'Không nhấn ga đột ngột trong khu vực hàng dọc' },
      { id: 'b2-4-d1', type: 'deduct', description: 'Bánh xe chạm cột mốc (-5 điểm)', points: -5 },
      { id: 'b2-4-e1', type: 'eliminate', description: 'Đổ cột mốc (loại)' },
    ],
  },
  {
    id: 'b2-5',
    license: 'B2',
    number: 5,
    name: 'Ngã tư',
    steps: [
      { id: 'b2-5-c1', type: 'correct', description: 'Chú ý đèn tín hiệu, giảm tốc độ khi tiếp cận ngã tư' },
      { id: 'b2-5-c2', type: 'correct', description: 'Bật xi-nhan đúng hướng, quan sát gương hậu' },
      { id: 'b2-5-c3', type: 'correct', description: 'Đi đúng làn đường theo chiều rẽ' },
      { id: 'b2-5-d1', type: 'deduct', description: 'Không xi-nhan trước khi rẽ (-5 điểm)', points: -5 },
      { id: 'b2-5-e1', type: 'eliminate', description: 'Đi sai làn đường hoặc vượt đèn đỏ (loại)' },
    ],
  },
  {
    id: 'b2-6',
    license: 'B2',
    number: 6,
    name: 'Đường cong chữ S',
    steps: [
      { id: 'b2-6-c1', type: 'correct', description: 'Vào đường cong với tốc độ vừa phải, không phanh trong cua' },
      { id: 'b2-6-c2', type: 'correct', description: 'Nhìn hướng muốn đi, không nhìn vào vật cản' },
      { id: 'b2-6-c3', type: 'correct', description: 'Ra khỏi cua, tăng tốc từ từ' },
      { id: 'b2-6-d1', type: 'deduct', description: 'Chạm vạch kẻ đường trong cua (-5 điểm)', points: -5 },
      { id: 'b2-6-e1', type: 'eliminate', description: 'Ra ngoài vạch kẻ đường (loại)' },
    ],
  },
  {
    id: 'b2-7',
    license: 'B2',
    number: 7,
    name: 'Đỗ xe',
    steps: [
      { id: 'b2-7-c1', type: 'correct', description: 'Chọn vị trí đỗ phù hợp, bật xi-nhan và quan sát kỹ' },
      { id: 'b2-7-c2', type: 'correct', description: 'Đưa xe vào ô đỗ chính xác, thẳng hàng' },
      { id: 'b2-7-c3', type: 'correct', description: 'Kéo phanh tay, tắt xi-nhan và động cơ' },
      { id: 'b2-7-d1', type: 'deduct', description: 'Đỗ xe lệch so với vạch kẻ quá 30cm (-5 điểm)', points: -5 },
      { id: 'b2-7-e1', type: 'eliminate', description: 'Va chạm với xe hoặc vật cản khi đỗ (loại)' },
    ],
  },

  // C - 5 bài thi
  {
    id: 'c-1',
    license: 'C',
    number: 1,
    name: 'Xuất phát',
    steps: [
      { id: 'c-1-c1', type: 'correct', description: 'Kiểm tra gương và tình trạng xung quanh xe trước khi xuất phát' },
      { id: 'c-1-c2', type: 'correct', description: 'Bật xi-nhan, thả côn từ từ kết hợp tăng ga nhẹ để xe chuyển động mượt' },
      { id: 'c-1-d1', type: 'deduct', description: 'Xe chồm hoặc giật khi xuất phát (-5 điểm)', points: -5 },
      { id: 'c-1-e1', type: 'eliminate', description: 'Tắt máy 2 lần hoặc xe lùi khi xuất phát (loại)' },
    ],
  },
  {
    id: 'c-2',
    license: 'C',
    number: 2,
    name: 'Dốc cầu',
    steps: [
      { id: 'c-2-c1', type: 'correct', description: 'Giảm số phù hợp, giữ tốc độ ổn định khi lên dốc' },
      { id: 'c-2-c2', type: 'correct', description: 'Dừng xe trên dốc bằng phanh tay và phanh chân phối hợp' },
      { id: 'c-2-c3', type: 'correct', description: 'Khởi hành trên dốc: ga trước, nhả phanh tay từ từ' },
      { id: 'c-2-d1', type: 'deduct', description: 'Xe lùi quá 30cm khi khởi hành (-5 điểm)', points: -5 },
      { id: 'c-2-e1', type: 'eliminate', description: 'Xe lùi quá 50cm hoặc tắt máy 2 lần (loại)' },
    ],
  },
  {
    id: 'c-3',
    license: 'C',
    number: 3,
    name: 'Ngã tư',
    steps: [
      { id: 'c-3-c1', type: 'correct', description: 'Giảm tốc độ, chú ý đèn tín hiệu và biển báo' },
      { id: 'c-3-c2', type: 'correct', description: 'Xi-nhan sớm, quan sát điểm mù trước khi rẽ' },
      { id: 'c-3-c3', type: 'correct', description: 'Rẽ theo bán kính lớn, không cắt góc' },
      { id: 'c-3-d1', type: 'deduct', description: 'Không xi-nhan đúng thời điểm (-5 điểm)', points: -5 },
      { id: 'c-3-e1', type: 'eliminate', description: 'Vượt đèn đỏ hoặc cắt ngang đường đi của xe khác (loại)' },
    ],
  },
  {
    id: 'c-4',
    license: 'C',
    number: 4,
    name: 'Đường hẹp',
    steps: [
      { id: 'c-4-c1', type: 'correct', description: 'Giảm tốc độ trước khi vào đường hẹp' },
      { id: 'c-4-c2', type: 'correct', description: 'Quan sát kỹ hai bên, căn chỉnh xe ở giữa đường' },
      { id: 'c-4-c3', type: 'correct', description: 'Ra đường rộng, tăng tốc từ từ và xi-nhan nếu cần' },
      { id: 'c-4-d1', type: 'deduct', description: 'Bánh xe chạm vạch giới hạn đường (-5 điểm)', points: -5 },
      { id: 'c-4-e1', type: 'eliminate', description: 'Ra ngoài vạch giới hạn đường (loại)' },
    ],
  },
  {
    id: 'c-5',
    license: 'C',
    number: 5,
    name: 'Đỗ xe',
    steps: [
      { id: 'c-5-c1', type: 'correct', description: 'Quan sát kỹ trước khi đưa xe vào vị trí đỗ' },
      { id: 'c-5-c2', type: 'correct', description: 'Lùi xe từ từ, dùng gương và người hướng dẫn nếu cần' },
      { id: 'c-5-c3', type: 'correct', description: 'Đỗ xe đúng vị trí, kéo phanh tay, tắt máy' },
      { id: 'c-5-d1', type: 'deduct', description: 'Xe lệch khỏi vị trí đỗ quá 30cm (-5 điểm)', points: -5 },
      { id: 'c-5-e1', type: 'eliminate', description: 'Va chạm với vật cản hoặc xe khác khi đỗ (loại)' },
    ],
  },
];

export const COMMON_ERRORS: CommonError[] = [
  // B1
  { id: 'b1-err-1', license: 'B1', type: 'deduct', description: 'Chạy quá tốc độ 20km/h trong khu vực sa hình', points: -5 },
  { id: 'b1-err-2', license: 'B1', type: 'deduct', description: 'Không quan sát gương chiếu hậu trước khi chuyển hướng', points: -5 },
  { id: 'b1-err-3', license: 'B1', type: 'deduct', description: 'Không bật xi-nhan khi thực hiện thao tác rẽ hoặc đỗ xe', points: -5 },
  { id: 'b1-err-4', license: 'B1', type: 'eliminate', description: 'Leo lề hoặc ra ngoài phần đường quy định' },
  { id: 'b1-err-5', license: 'B1', type: 'eliminate', description: 'Va chạm với cột mốc, biển báo hoặc vật cản cố định' },

  // B2
  { id: 'b2-err-1', license: 'B2', type: 'deduct', description: 'Chạy quá tốc độ 24km/h trong khu vực sa hình', points: -5 },
  { id: 'b2-err-2', license: 'B2', type: 'deduct', description: 'Không sử dụng gương chiếu hậu khi chuyển làn', points: -5 },
  { id: 'b2-err-3', license: 'B2', type: 'deduct', description: 'Phanh gấp không cần thiết gây mất an toàn', points: -5 },
  { id: 'b2-err-4', license: 'B2', type: 'eliminate', description: 'Leo lề' },
  { id: 'b2-err-5', license: 'B2', type: 'eliminate', description: 'Va chạm với vật cản hoặc cột mốc trên sa hình' },

  // C
  { id: 'c-err-1', license: 'C', type: 'deduct', description: 'Chạy quá tốc độ 30km/h trong khu vực sa hình', points: -5 },
  { id: 'c-err-2', license: 'C', type: 'deduct', description: 'Không kiểm tra điểm mù khi chuyển hướng xe tải', points: -5 },
  { id: 'c-err-3', license: 'C', type: 'deduct', description: 'Cua quá rộng hoặc quá hẹp so với bán kính quy định', points: -5 },
  { id: 'c-err-4', license: 'C', type: 'eliminate', description: 'Đè lên vạch kẻ đường hoặc ra ngoài phần đường cho phép' },
  { id: 'c-err-5', license: 'C', type: 'eliminate', description: 'Va chạm với xe khác hoặc vật cản cố định trong sa hình' },
];
