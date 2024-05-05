--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-05-05 13:06:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3485 (class 0 OID 102810)
-- Dependencies: 241
-- Data for Name: action; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.action (name) VALUES ('read');
INSERT INTO public.action (name) VALUES ('write');
INSERT INTO public.action (name) VALUES ('create');
INSERT INTO public.action (name) VALUES ('delete');


--
-- TOC entry 3470 (class 0 OID 86517)
-- Dependencies: 226
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.address (id, address) OVERRIDING SYSTEM VALUE VALUES (1, '(Пермь,улица1,1)');
INSERT INTO public.address (id, address) OVERRIDING SYSTEM VALUE VALUES (2, '(Москва,проспект2,2)');
INSERT INTO public.address (id, address) OVERRIDING SYSTEM VALUE VALUES (3, '(Санкт-Петербург,улица3,3)');
INSERT INTO public.address (id, address) OVERRIDING SYSTEM VALUE VALUES (4, '(Екатеринбург,"проспект Ленина",123)');
INSERT INTO public.address (id, address) OVERRIDING SYSTEM VALUE VALUES (5, '(Казань,"улица Баумана",456)');
INSERT INTO public.address (id, address) OVERRIDING SYSTEM VALUE VALUES (6, '(Новосибирск,"улица Красный проспект",789)');


--
-- TOC entry 3479 (class 0 OID 86550)
-- Dependencies: 235
-- Data for Name: apartment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.apartment (number) VALUES (101);
INSERT INTO public.apartment (number) VALUES (202);
INSERT INTO public.apartment (number) VALUES (303);


--
-- TOC entry 3468 (class 0 OID 86508)
-- Dependencies: 224
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (1, 1, 'Имя1 Фамилия1', '1990-01-01', 'user1', 'password1', '1234567890', 'user1@example.com', false);
INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (2, 2, 'Имя2 Фамилия2', '1985-02-02', 'user2', 'password2', '9876543210', 'user2@example.com', false);
INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (3, 3, 'Имя3 Фамилия3', '1980-03-03', 'user3', 'password3', '5555555555', 'user3@example.com', false);
INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (4, 4, 'Имя4 Фамилия4', '1982-04-04', 'user4', 'password4', '1111111111', 'user4@example.com', false);
INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (5, 5, 'Имя5 Фамилия5', '1977-05-05', 'user5', 'password5', '2222222222', 'user5@example.com', false);
INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (6, 1, 'Имя6 Фамилия6', '1972-06-06', 'user6', 'password6', '3333333333', 'user6@example.com', false);
INSERT INTO public."user" (id, address_id, full_name, birth_date, login, password, phone_number, email, is_blocked) OVERRIDING SYSTEM VALUE VALUES (7, 1, 'Админ', '1990-01-01', 'admin', '98da855b7dfc93c6b25543a00923f48055c50adddf9c4831fc23eb6820775b7b116c197b197c4a4a', '1234567890', 'user7@example.com', false);


--
-- TOC entry 3480 (class 0 OID 86556)
-- Dependencies: 236
-- Data for Name: apartment_address; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.apartment_address (apartment_id, address_id, user_id) VALUES (101, 1, 1);
INSERT INTO public.apartment_address (apartment_id, address_id, user_id) VALUES (202, 2, 2);
INSERT INTO public.apartment_address (apartment_id, address_id, user_id) VALUES (303, 3, 3);
INSERT INTO public.apartment_address (apartment_id, address_id, user_id) VALUES (101, 1, 6);


--
-- TOC entry 3478 (class 0 OID 86545)
-- Dependencies: 234
-- Data for Name: poll_sсhedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."poll_sсhedule" (id, type, count_days) VALUES (1, 'Every month', 30);
INSERT INTO public."poll_sсhedule" (id, type, count_days) VALUES (2, 'First day every month', 30);
INSERT INTO public."poll_sсhedule" (id, type, count_days) VALUES (3, 'Every week', 7);
INSERT INTO public."poll_sсhedule" (id, type, count_days) VALUES (4, 'Personal', 0);


--
-- TOC entry 3460 (class 0 OID 86474)
-- Dependencies: 216
-- Data for Name: poll; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.poll (id, creator_user_id, poll_shedule_id, adress_id, name, start_date, end_date, duration, status, number_votes, description, cyclical, max_number_answers_by_user) OVERRIDING SYSTEM VALUE VALUES (7, 1, 1, 1, 'Опрос 1', '2023-01-01', '2023-01-31', 30, 'active', 0, 'Описание опроса 1', true, 1);
INSERT INTO public.poll (id, creator_user_id, poll_shedule_id, adress_id, name, start_date, end_date, duration, status, number_votes, description, cyclical, max_number_answers_by_user) OVERRIDING SYSTEM VALUE VALUES (8, 2, 2, 2, 'Опрос 2', '2023-02-01', '2023-02-28', 30, 'proposed', 0, 'Описание опроса 2', false, 1);
INSERT INTO public.poll (id, creator_user_id, poll_shedule_id, adress_id, name, start_date, end_date, duration, status, number_votes, description, cyclical, max_number_answers_by_user) OVERRIDING SYSTEM VALUE VALUES (9, 3, 3, 3, 'Опрос 3', '2023-03-01', '2023-03-31', 30, 'planned', 0, 'Описание опроса 3', true, 1);
INSERT INTO public.poll (id, creator_user_id, poll_shedule_id, adress_id, name, start_date, end_date, duration, status, number_votes, description, cyclical, max_number_answers_by_user) OVERRIDING SYSTEM VALUE VALUES (10, 4, 1, 4, 'Опрос 4', '2023-04-01', '2023-04-30', 30, 'proposed', 0, 'Описание опроса 4', true, 1);
INSERT INTO public.poll (id, creator_user_id, poll_shedule_id, adress_id, name, start_date, end_date, duration, status, number_votes, description, cyclical, max_number_answers_by_user) OVERRIDING SYSTEM VALUE VALUES (11, 5, 2, 5, 'Опрос 5', '2023-05-01', '2023-05-31', 30, 'active', 0, 'Описание опроса 5', false, 1);
INSERT INTO public.poll (id, creator_user_id, poll_shedule_id, adress_id, name, start_date, end_date, duration, status, number_votes, description, cyclical, max_number_answers_by_user) OVERRIDING SYSTEM VALUE VALUES (12, 6, 3, 6, 'Опрос 6', '2023-06-01', '2023-06-30', 30, 'planned', 0, 'Описание опроса 6', true, 1);


--
-- TOC entry 3464 (class 0 OID 86494)
-- Dependencies: 220
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.file (id, poll_id, url, original_name) OVERRIDING SYSTEM VALUE VALUES (5, 7, 'https://example.com/file1.pdf', 'Document 1');
INSERT INTO public.file (id, poll_id, url, original_name) OVERRIDING SYSTEM VALUE VALUES (6, 8, 'https://example.com/file2.docx', 'Document 2');
INSERT INTO public.file (id, poll_id, url, original_name) OVERRIDING SYSTEM VALUE VALUES (7, 9, 'https://example.com/file3.txt', 'Document 3');


--
-- TOC entry 3484 (class 0 OID 94619)
-- Dependencies: 240
-- Data for Name: file_db; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.file_db (id, poll_id, filename, data) OVERRIDING SYSTEM VALUE VALUES (1, 7, 'testFile', NULL);


--
-- TOC entry 3462 (class 0 OID 86484)
-- Dependencies: 218
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.message (id, user_id, poll_id, date_sent_message, message) OVERRIDING SYSTEM VALUE VALUES (11, 4, 10, '2023-04-05', 'Сообщение 4 для опроса 4');
INSERT INTO public.message (id, user_id, poll_id, date_sent_message, message) OVERRIDING SYSTEM VALUE VALUES (12, 5, 11, '2023-05-10', 'Сообщение 5 для опроса 5');
INSERT INTO public.message (id, user_id, poll_id, date_sent_message, message) OVERRIDING SYSTEM VALUE VALUES (13, 6, 12, '2023-06-15', 'Сообщение 6 для опроса 6');
INSERT INTO public.message (id, user_id, poll_id, date_sent_message, message) OVERRIDING SYSTEM VALUE VALUES (14, 4, 10, '2023-11-16', 'Сообщение для опроса 10');
INSERT INTO public.message (id, user_id, poll_id, date_sent_message, message) OVERRIDING SYSTEM VALUE VALUES (15, 4, 10, '2023-11-16', 'Сообщение 2 для опроса 10');


--
-- TOC entry 3466 (class 0 OID 86502)
-- Dependencies: 222
-- Data for Name: poll_value; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.poll_value (id, poll_id, value) OVERRIDING SYSTEM VALUE VALUES (7, 7, 'Option A');
INSERT INTO public.poll_value (id, poll_id, value) OVERRIDING SYSTEM VALUE VALUES (8, 7, 'Option B');
INSERT INTO public.poll_value (id, poll_id, value) OVERRIDING SYSTEM VALUE VALUES (9, 8, 'Option X');
INSERT INTO public.poll_value (id, poll_id, value) OVERRIDING SYSTEM VALUE VALUES (10, 8, 'Option Y');
INSERT INTO public.poll_value (id, poll_id, value) OVERRIDING SYSTEM VALUE VALUES (11, 9, 'Option 1');
INSERT INTO public.poll_value (id, poll_id, value) OVERRIDING SYSTEM VALUE VALUES (12, 9, 'Option 2');


--
-- TOC entry 3486 (class 0 OID 102815)
-- Dependencies: 242
-- Data for Name: system_object; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.system_object (name) VALUES ('poll');
INSERT INTO public.system_object (name) VALUES ('user_administration');


--
-- TOC entry 3476 (class 0 OID 86537)
-- Dependencies: 232
-- Data for Name: privilege; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.privilege (id, system_object_name, action_name) OVERRIDING SYSTEM VALUE VALUES (1, 'poll', 'read');
INSERT INTO public.privilege (id, system_object_name, action_name) OVERRIDING SYSTEM VALUE VALUES (2, 'poll', 'write');
INSERT INTO public.privilege (id, system_object_name, action_name) OVERRIDING SYSTEM VALUE VALUES (3, 'poll', 'create');


--
-- TOC entry 3474 (class 0 OID 86531)
-- Dependencies: 230
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role (id, role_name) OVERRIDING SYSTEM VALUE VALUES (1, 'user');
INSERT INTO public.role (id, role_name) OVERRIDING SYSTEM VALUE VALUES (2, 'admin');
INSERT INTO public.role (id, role_name) OVERRIDING SYSTEM VALUE VALUES (3, 'root');


--
-- TOC entry 3477 (class 0 OID 86542)
-- Dependencies: 233
-- Data for Name: role_privilege; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role_privilege (privilege_id, role_id) VALUES (1, 1);
INSERT INTO public.role_privilege (privilege_id, role_id) VALUES (3, 3);
INSERT INTO public.role_privilege (privilege_id, role_id) VALUES (1, 2);
INSERT INTO public.role_privilege (privilege_id, role_id) VALUES (2, 2);
INSERT INTO public.role_privilege (privilege_id, role_id) VALUES (3, 2);


--
-- TOC entry 3482 (class 0 OID 86565)
-- Dependencies: 238
-- Data for Name: unavailable_poll_for_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.unavailable_poll_for_user (poll_id, user_id) VALUES (8, 2);
INSERT INTO public.unavailable_poll_for_user (poll_id, user_id) VALUES (9, 3);
INSERT INTO public.unavailable_poll_for_user (poll_id, user_id) VALUES (8, 1);


--
-- TOC entry 3481 (class 0 OID 86560)
-- Dependencies: 237
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_role (role_id, user_id) VALUES (1, 1);
INSERT INTO public.user_role (role_id, user_id) VALUES (2, 2);
INSERT INTO public.user_role (role_id, user_id) VALUES (3, 3);
INSERT INTO public.user_role (role_id, user_id) VALUES (2, 7);


--
-- TOC entry 3472 (class 0 OID 86525)
-- Dependencies: 228
-- Data for Name: users_answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_answer (id, user_id, poll_value_id) OVERRIDING SYSTEM VALUE VALUES (4, 1, 7);
INSERT INTO public.users_answer (id, user_id, poll_value_id) OVERRIDING SYSTEM VALUE VALUES (5, 2, 9);
INSERT INTO public.users_answer (id, user_id, poll_value_id) OVERRIDING SYSTEM VALUE VALUES (6, 3, 11);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 225
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 6, true);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 239
-- Name: file_db_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.file_db_id_seq', 1, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 219
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq', 7, true);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 217
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_id_seq', 15, true);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 215
-- Name: poll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_id_seq', 12, true);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 221
-- Name: poll_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_value_id_seq', 12, true);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 231
-- Name: privilege_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.privilege_id_seq', 3, true);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 229
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 6, true);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 7, true);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_answer_id_seq', 6, true);


-- Completed on 2024-05-05 13:06:22

--
-- PostgreSQL database dump complete
--

