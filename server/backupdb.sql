DROP DATABASE IF EXISTS university_db;
CREATE DATABASE university_db;
USE university_db;

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('staff', 'student') NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (id, name, email, role, password) VALUES
(101, 'Nguyen Thi Lan', 'nguyen.thilan@hcmut.edu.vn', 'staff', 'nguyenlan123'),
(102, 'Tran Thi Bao', 'tran.thibao@hcmut.edu.vn', 'staff', 'tranbao123'),
(103, 'Le Minh Duc', 'le.minhduc@hcmut.edu.vn', 'staff', 'leduc123'),
(104, 'Pham Thi Thu', 'pham.thithu@hcmut.edu.vn', 'staff', 'phamthu123'),
(2252362, 'Anh Khoa', 'khoa.trancs2174@hcmut.edu.vn', 'student', 'khoanhtran'),
(2252293, 'Huynh Mai Quoc Khang', 'khang.huynhmaiquoc@hcmut.edu.vn', 'student', 'quockhang'),
(2252263, 'Tran Duy Duc Huy', 'huy.tranduyduc@hcmut.edu.vn', 'student', 'duchuy'),
(2252210, 'Nguyen Quang Duy', 'huy.nguyenquang@hcmut.edu.vn', 'student', 'quangduy');

CREATE TABLE lecturers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20) DEFAULT 'lecturer',
    password VARCHAR(100)
);

INSERT INTO lecturers (id, name, email, password) VALUES
(1, 'Dr. Truong Tuan Anh', 'tuan.anhtruong@hcmut.edu.vn', 'tuananhtruong'),
(2, 'Nguyen Hua Phung', 'phung.nguyenhua@hcmut.edu.vn', 'phungnguyen'),
(3, 'Pham Tien Thanh', 'pham.tienthanh@hcmut.edu.vn', 'pham.tienthanh'),
(4, 'Nguyen Le Hoa', 'nguyen.lehoa@hcmut.edu.vn', 'nguyen.lehoa'),
(5, 'Tran Hai Anh', 'tran.haianh@hcmut.edu.vn', 'tran.haianh'),
(6, 'Le Vudat', 'le.vudat@hcmut.edu.vn', 'le.vudat'),
(7, 'Nguyen Minh Quang', 'nguyen.minhquang@hcmut.edu.vn', 'nguyen.minhquang'),
(8, 'Pham Ngoc Thanh', 'pham.ngocthanh@hcmut.edu.vn', 'pham.ngocthanh'),
(9, 'Tran Tien Khoa', 'tran.tienkhoa@hcmut.edu.vn', 'tran.tienkhoa'),
(10, 'Le Duc Thanh', 'le.ducthanh@hcmut.edu.vn', 'le.ducthanh'),
(11, 'Nguyen Bich Tram', 'nguyen.bichtram@hcmut.edu.vn', 'nguyen.bichtram'),
(12, 'Pham Nguyet Anh', 'pham.nguyetanh@hcmut.edu.vn', 'pham.nguyetanh'),
(13, 'Do Hoang Tu', 'do.hoangtu@hcmut.edu.vn', 'do.hoangtu'),
(14, 'Nguyen Van Nam', 'nguyen.vannam@hcmut.edu.vn', 'nguyen.vannam');

CREATE TABLE rooms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    building VARCHAR(10),
    room_number INT,
    capacity INT,
    devices TEXT,
    corridor_id VARCHAR(50)
);

INSERT INTO rooms (id, name, building, room_number, capacity, devices, corridor_id) VALUES
('ROOM_B1_101', 'Room B1 101', 'B1', 101, 60, 'light,fan,sound_system,projector,camera', 'CORRIDOR_B1_1'),
('ROOM_B1_102', 'Room B1 102', 'B1', 102, 60, 'light,fan,sound_system,projector,camera', 'CORRIDOR_B1_1'),
('ROOM_B1_103', 'Room B1 103', 'B1', 103, 80, 'light,fan,projector,camera', 'CORRIDOR_B1_3'),
('ROOM_B1_104', 'Room B1 104', 'B1', 104, 50, 'light,fan,sound_system,projector,camera', 'CORRIDOR_B1_4'),
('ROOM_B2_201', 'Room B2 201', 'B2', 201, 60, 'light,fan,sound_system,projector,camera', 'CORRIDOR_B2_1'),
('ROOM_B2_202', 'Room B2 202', 'B2', 202, 40, 'light,fan,sound_system,projector,camera', 'CORRIDOR_B2_2'),
('ROOM_B2_203', 'Room B2 203', 'B2', 203, 50, 'light,fan,sound_system,projector,camera', 'CORRIDOR_B2_3'),
('ROOM_B2_204', 'Room B2 204', 'B2', 204, 70, 'light,fan,projector,camera', 'CORRIDOR_B2_4'),
('ROOM_A1_303', 'Room A1 303', 'A1', 303, 80, 'light,fan,projector,camera', 'CORRIDOR_A1_3');

CREATE TABLE schedules (
    id VARCHAR(50) PRIMARY KEY,
    room_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    usedDate DATE NOT NULL,
    startPeriod INT NOT NULL,
    endPeriod INT NOT NULL,
    teacherId INT NOT NULL,
    lectureTitle VARCHAR(100) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (teacherId) REFERENCES lecturers(id)
);

INSERT INTO schedules (id, room_id, date, usedDate, startPeriod, endPeriod, teacherId, lectureTitle) VALUES
('9', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 7, 8, 3, 'Linear Algebra'),
('8', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 8, 9, 4, 'Discrete Mathematics'),
('7', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 9, 10, 5, 'Probability & Statistics'),
('6', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 10, 11, 6, 'Numerical Methods'),
('5', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 11, 12, 7, 'Compiler Design'),
('10', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 12, 13, 8, 'Cybersecurity'),
('11', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 13, 14, 9, 'Data Structures'),
('12', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 14, 15, 10, 'Algorithms'),
('13', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 15, 16, 11, 'Computer Graphics'),
('14', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 16, 17, 12, 'Parallel Computing'),
('1', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 17, 18, 13, 'IoT Fundamentals'),
('2', 'ROOM_B1_101', '2025-03-26', '2025-03-26', 18, 19, 14, 'Blockchain Basics'),
('3', 'ROOM_B1_101', '2025-03-27', '2025-03-27', 7, 8, 3, 'Computer Architecture'),
('4', 'ROOM_B1_101', '2025-03-27', '2025-03-27', 8, 9, 4, 'Software Engineering');