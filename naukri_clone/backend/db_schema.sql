CREATE DATABASE IF NOT EXISTS naukri_clone;
USE naukri_clone;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','recruiter') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  company VARCHAR(255),
  location VARCHAR(255),
  salary VARCHAR(100),
  description TEXT,
  recruiter_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Applications
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT,
  user_id INT,
  status ENUM('applied', 'shortlisted', 'hired', 'rejected') DEFAULT 'applied',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
