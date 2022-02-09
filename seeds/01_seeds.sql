INSERT INTO users (name, email, password) 
VALUES ('Rosemary Ku', 'rk@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Clark Kent', 'clark_kent@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lois Lane', 'lois_lane@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'Summer Cottage', 'description', 'https://www.ctvnews.ca/polopoly_fs/1.2905678.1589129569!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg', 'https://www.ctvnews.ca/polopoly_fs/1.2905678.1589129569!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg', 250, 4, 4, 4, 'Canada', 'Elm Street', 'Muskoka', 'Ontario', 'F8C9J3', true),
(2, 'Winter Cottage', 'description', 'https://www.lowestrates.ca/sites/default/files/cottage-winter.jpg', 'https://www.lowestrates.ca/sites/default/files/cottage-winter.jpg', 200, 3, 3, 3, 'Canada', 'Evergreen Street', 'Tiny', 'Ontario', 'J9D9S8', true),
(3, 'Mirror Cottage', 'description', 'https://media.timeout.com/images/105780755/image.jpg', 'https://media.timeout.com/images/105780755/image.jpg', 400, 1, 1, 1, 'Canada', 'Maple Street', 'Owen Sound', 'Ontario', 'D9F9S9', true); 

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES ('2021-08-01', '2021-08-10', 1, 3), 
('2022-01-01', '2022-01-05', 2, 2), 
('2022-02-01', '2022-01-03', 3, 1); 

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 3, 3, 5, 'messages'),
(2, 2, 2, 3, 'messages'),
(3, 1, 1, 1, 'messages'); 