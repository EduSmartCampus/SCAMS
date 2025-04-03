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
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20)DEFAULT 'lecturer',
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

-- 7. Create schedule_slots table (with correct foreign key types)
CREATE TABLE schedule_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT,
    period INT,
    hour INT,
    lecture_title VARCHAR(100),
    booked_by VARCHAR(100),
    lecturer_id INT UNSIGNED,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(id)
);

-- 8. Insert students
INSERT INTO students (id, name, email, role, password) VALUES
(2252362, 'Anh Khoa', 'khoa.trancs2174@hcmut.edu.vn', 'student', 'khoanhtran'),
(2252293, 'Huynh Mai Quoc Khang', 'khang.huynhmaiquoc@hcmut.edu.vn', 'student', 'quockhang');

-- 9. Insert lecturers
INSERT INTO lecturers (name, email, role, password) VALUES
('Dr. Truong Tuan Anh', 'tuan.anhtruong@hcmut.edu.vn', 'lecturer', 'tuananhtruong'),
('Nguyen Hua Phung', 'phung.nguyenhua@hcmut.edu.vn', 'lecturer', 'phungnguyen');

-- 10. Insert rooms
INSERT INTO rooms (id, name, building, room_number, capacity, corridor_id) VALUES
('ROOM_B1_101', 'Room B1 101', 'B1', 101, 60, 'CORRIDOR_B1_1'),
('ROOM_B2_202', 'Room B2 202', 'B2', 202, 40, 'CORRIDOR_B2_2'),
('ROOM_A1_303', 'Room A1 303', 'A1', 303, 80, 'CORRIDOR_A1_3');

-- 11. Insert room devices
INSERT INTO room_devices (room_id, device) VALUES
('ROOM_B1_101', 'light'),
('ROOM_B1_101', 'fan'),
('ROOM_B1_101', 'sound_system'),
('ROOM_B1_101', 'projector'),
('ROOM_B1_101', 'camera'),

('ROOM_B2_202', 'light'),
('ROOM_B2_202', 'fan'),
('ROOM_B2_202', 'sound_system'),
('ROOM_B2_202', 'projector'),
('ROOM_B2_202', 'camera'),

('ROOM_A1_303', 'light'),
('ROOM_A1_303', 'fan'),
('ROOM_A1_303', 'projector'),
('ROOM_A1_303', 'camera');

-- 12. Insert schedule for ROOM_B1_101 on 2025-03-25
INSERT INTO schedules (room_id, date)
VALUES ('ROOM_B1_101', '2025-03-25');

-- 13. Insert schedule_slots for that day (assuming schedule_id = 1)
INSERT INTO schedule_slots (schedule_id, period, hour, lecture_title, booked_by, lecturer_id) VALUES
(1, 1, 7, 'C Programming', 'phung.huanguyen@hcmut.edu.vn', 2),
(1, 2, 8, 'Advanced Software Engineering', 'tuan.anhtruong@hcmut.edu.vn', 1),
(1, 3, 9, '', NULL, NULL),
(1, 4, 10, '', NULL, NULL),
(1, 5, 11, '', NULL, NULL),
(1, 6, 13, '', NULL, NULL),
(1, 7, 14, '', NULL, NULL),
(1, 8, 15, '', NULL, NULL),
(1, 9, 16, '', NULL, NULL),
(1, 10, 17, '', NULL, NULL),
(1, 11, 18, '', NULL, NULL),
(1, 12, 19, '', NULL, NULL);
