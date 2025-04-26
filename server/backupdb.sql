-- 1. Drop and recreate the database
DROP DATABASE IF EXISTS university_db;
CREATE DATABASE university_db;
USE university_db;

-- 2. Create students table
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20),
    password VARCHAR(100)
);

-- 3. Create lecturers table (id is UNSIGNED to match foreign keys)
CREATE TABLE lecturers (
    id INT UNSIGNED PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20) DEFAULT 'lecturer',
    password VARCHAR(100)
);

-- 4. Create rooms table
CREATE TABLE rooms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    building VARCHAR(10),
    room_number INT,
    capacity INT,
    corridor_id VARCHAR(50)
);

-- 5. Create room_devices table
CREATE TABLE room_devices (
    room_id VARCHAR(50),
    device VARCHAR(50),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- 6. Create schedules table
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id VARCHAR(50),
    date DATE,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- 7. Create schedule_slots table
CREATE TABLE schedule_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT,
    period INT,
    lecture_title VARCHAR(100),
    lecturer_id INT UNSIGNED,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(id)
);

-- 8. Insert students
INSERT INTO students (id, name, email, role, password) VALUES
(2252362, 'Anh Khoa', 'khoa.trancs2174@hcmut.edu.vn', 'student', 'khoanhtran'),
(2252293, 'Huynh Mai Quoc Khang', 'khang.huynhmaiquoc@hcmut.edu.vn', 'student', 'quockhang'),
(2252263, 'Tran Duy Duc Huy', 'huy.tranduyduc@hcmut.edu.vn', 'student', 'duchuy'),
(2252210, 'Nguyen Quang Duy', 'huy.nguyenquang@hcmut.edu.vn', 'student', 'quangduy');

-- 9. Insert lecturers
INSERT INTO lecturers (id, name, email, role, password) VALUES
(1, 'Dr. Truong Tuan Anh', 'tuan.anhtruong@hcmut.edu.vn', 'lecturer', 'tuananhtruong'),
(2, 'Nguyen Hua Phung', 'phung.nguyenhua@hcmut.edu.vn', 'lecturer', 'phungnguyen'),
(3, 'Pham Tien Thanh', 'pham.tienthanh@hcmut.edu.vn', 'lecturer', 'pham.tienthanh'),
(4, 'Nguyen Le Hoa', 'nguyen.lehoa@hcmut.edu.vn', 'lecturer', 'nguyen.lehoa'),
(5, 'Tran Hai Anh', 'tran.haianh@hcmut.edu.vn', 'lecturer', 'tran.haianh'),
(6, 'Le Vudat', 'le.vudat@hcmut.edu.vn', 'lecturer', 'le.vudat'),
(7, 'Nguyen Minh Quang', 'nguyen.minhquang@hcmut.edu.vn', 'lecturer', 'nguyen.minhquang'),
(8, 'Pham Ngoc Thanh', 'pham.ngocthanh@hcmut.edu.vn', 'lecturer', 'pham.ngocthanh'),
(9, 'Tran Tien Khoa', 'tran.tienkhoa@hcmut.edu.vn', 'lecturer', 'tran.tienkhoa'),
(10, 'Le Duc Thanh', 'le.ducthanh@hcmut.edu.vn', 'lecturer', 'le.ducthanh'),
(11, 'Nguyen Bich Tram', 'nguyen.bichtram@hcmut.edu.vn', 'lecturer', 'nguyen.bichtram'),
(12, 'Pham Nguyet Anh', 'pham.nguyetanh@hcmut.edu.vn', 'lecturer', 'pham.nguyetanh'),
(13, 'Do Hoang Tu', 'do.hoangtu@hcmut.edu.vn', 'lecturer', 'do.hoangtu'),
(14, 'Nguyen Van Nam', 'nguyen.vannam@hcmut.edu.vn', 'lecturer', 'nguyen.vannam');

-- 10. Insert rooms
INSERT INTO rooms (id, name, building, room_number, capacity, corridor_id) VALUES
('ROOM_B1_101', 'Room B1 101', 'B1', 101, 60, 'CORRIDOR_B1_1'),
('ROOM_B1_102', 'Room B1 102', 'B1', 102, 60, 'CORRIDOR_B1_1'),
('ROOM_B1_103', 'Room B1 103', 'B1', 103, 80, 'CORRIDOR_B1_3'),
('ROOM_B1_104', 'Room B1 104', 'B1', 104, 50, 'CORRIDOR_B1_4'),
('ROOM_B2_201', 'Room B2 201', 'B2', 201, 60, 'CORRIDOR_B2_1'),
('ROOM_B2_202', 'Room B2 202', 'B2', 202, 40, 'CORRIDOR_B2_2'),
('ROOM_B2_203', 'Room B2 203', 'B2', 203, 50, 'CORRIDOR_B2_3'),
('ROOM_B2_204', 'Room B2 204', 'B2', 204, 70, 'CORRIDOR_B2_4'),
('ROOM_A1_303', 'Room A1 303', 'A1', 303, 80, 'CORRIDOR_A1_3');

-- 11. Insert room devices
INSERT INTO room_devices (room_id, device) VALUES
('ROOM_B1_101', 'light'), ('ROOM_B1_101', 'fan'), ('ROOM_B1_101', 'sound_system'), ('ROOM_B1_101', 'projector'), ('ROOM_B1_101', 'camera'),
('ROOM_B1_102', 'light'), ('ROOM_B1_102', 'fan'), ('ROOM_B1_102', 'sound_system'), ('ROOM_B1_102', 'projector'), ('ROOM_B1_102', 'camera'),
('ROOM_B1_103', 'light'), ('ROOM_B1_103', 'fan'), ('ROOM_B1_103', 'projector'), ('ROOM_B1_103', 'camera'),
('ROOM_B1_104', 'light'), ('ROOM_B1_104', 'fan'), ('ROOM_B1_104', 'sound_system'), ('ROOM_B1_104', 'projector'), ('ROOM_B1_104', 'camera'),
('ROOM_B2_201', 'light'), ('ROOM_B2_201', 'fan'), ('ROOM_B2_201', 'sound_system'), ('ROOM_B2_201', 'projector'), ('ROOM_B2_201', 'camera'),
('ROOM_B2_202', 'light'), ('ROOM_B2_202', 'fan'), ('ROOM_B2_202', 'sound_system'), ('ROOM_B2_202', 'projector'), ('ROOM_B2_202', 'camera'),
('ROOM_B2_203', 'light'), ('ROOM_B2_203', 'fan'), ('ROOM_B2_203', 'sound_system'), ('ROOM_B2_203', 'projector'), ('ROOM_B2_203', 'camera'),
('ROOM_B2_204', 'light'), ('ROOM_B2_204', 'fan'), ('ROOM_B2_204', 'projector'), ('ROOM_B2_204', 'camera'),
('ROOM_A1_303', 'light'), ('ROOM_A1_303', 'fan'), ('ROOM_A1_303', 'projector'), ('ROOM_A1_303', 'camera');

-- 12. Insert schedules for ROOM_B1_101
INSERT INTO schedules (room_id, date) VALUES
('ROOM_B1_101', '2025-03-26'),
('ROOM_B1_101', '2025-03-27');

-- 13. Insert schedule_slots for 26/03/2025 (schedule_id = 1)
INSERT INTO schedule_slots (schedule_id, period, lecture_title, lecturer_id) VALUES
(1, 7, 'Linear Algebra', 3),
(1, 8, 'Discrete Mathematics', 4),
(1, 9, 'Probability & Statistics', 5),
(1, 10, 'Numerical Methods', 6),
(1, 11, 'Compiler Design', 7),
(1, 12, 'Cybersecurity', 8),
(1, 13, 'Data Structures', 9),
(1, 14, 'Algorithms', 10),
(1, 15, 'Computer Graphics', 11),
(1, 16, 'Parallel Computing', 12),
(1, 17, 'IoT Fundamentals', 13),
(1, 18, 'Blockchain Basics', 14);

-- 14. Insert schedule_slots for 27/03/2025 (schedule_id = 2)
INSERT INTO schedule_slots (schedule_id, period, lecture_title, lecturer_id) VALUES
(2, 7, 'Computer Architecture', 3),
(2, 8, 'Software Engineering', 4);
