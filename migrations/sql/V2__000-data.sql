--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-06-16 11:47:01

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
-- TOC entry 3491 (class 0 OID 102810)
-- Dependencies: 237
-- Data for Name: action; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.action VALUES ('read');
INSERT INTO public.action VALUES ('write');
INSERT INTO public.action VALUES ('create');
INSERT INTO public.action VALUES ('delete');


--
-- TOC entry 3480 (class 0 OID 86517)
-- Dependencies: 226
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (5, 'Пермь', 'улица 5', '5');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (4, 'Пермь', 'улица 4', '4');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (3, 'Пермь', 'улица 3', '3');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (1, 'Пермь', 'улица 1', '1');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (6, 'Пермь', 'улица 6', '6');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (2, 'Пермь', 'улица 2', '2');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (7, 'Город', 'Улица', '18');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (9, 'Пермь', 'Попова', '15');
INSERT INTO public.address OVERRIDING SYSTEM VALUE VALUES (10, 'Москва', 'Арбат', '54');


--
-- TOC entry 3488 (class 0 OID 86545)
-- Dependencies: 234
-- Data for Name: poll_sсhedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."poll_sсhedule" OVERRIDING SYSTEM VALUE VALUES (3, 'EVERY_WEEK', 7);
INSERT INTO public."poll_sсhedule" OVERRIDING SYSTEM VALUE VALUES (1, 'EVERY_MONTH', 30);
INSERT INTO public."poll_sсhedule" OVERRIDING SYSTEM VALUE VALUES (4, 'EVERY_YEAR', 365);
INSERT INTO public."poll_sсhedule" OVERRIDING SYSTEM VALUE VALUES (6, 'NO_SCHEDULE', 0);


--
-- TOC entry 3478 (class 0 OID 86508)
-- Dependencies: 224
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (2, 'Имя2 Фамилия2', '1985-02-02', 'user2', 'password2', '9876543210', 'user2@example.com', false, 2);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (5, 'Имя5 Фамилия5', '1977-05-05', 'user5', 'password5', '2222222222', 'user5@example.com', false, 5);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (1, 'Имя1 Фамилия1', '1990-01-01', 'user1', 'password1', '1234567890', 'user1@example.com', false, 1);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (3, 'Имя3 Фамилия3', '1980-03-03', 'user3', 'password3', '5555555555', 'user3@example.com', false, 3);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (4, 'Имя четыре Фамилия четыре  Отчество четыре ', '1982-04-04', 'user4', 'password4', '1111111111', 'user4@example.com', false, 4);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (11, 'Удалённый пользователь', '2024-06-07', 'deleted', '98da855b7dfc93c6b25543a00923f48055c50adddf9c4831fc23eb6820775b7b116c197b197c4a4a', '666', NULL, true, NULL);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (36, 'Иванов Иван Иваныч', '1972-06-09', 'Ivan_II', 'ed7c6e4f249b53d9d89f570da783fa4035ddde440e5b4ec5292779300c062a64a5548da7e5d0b6e1', '8988888821', 'ivanich@gmail.com', false, 33);
INSERT INTO public."user" OVERRIDING SYSTEM VALUE VALUES (7, 'Админ', '1990-01-01', 'admin', '4bf77b0d45ca806df7116271619397b76b715f79a36e9067cbbf8f02add9440469f5918235ad2b05', '1234567890', 'admin7@example.com', false, 7);


--
-- TOC entry 3470 (class 0 OID 86474)
-- Dependencies: 216
-- Data for Name: poll; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.poll OVERRIDING SYSTEM VALUE VALUES (23, 7, 4, 9, 'Субботник', '2024-06-09', '2024-06-15', 6, 'active', 'Выбираем в какой день необходимо провести субботник', false, 1);
INSERT INTO public.poll OVERRIDING SYSTEM VALUE VALUES (24, 7, 6, 9, 'Утренник', '2024-06-09', '2024-06-15', 6, 'proposed', 'Выбираем в какой день необходимо провести утренник', false, 1);
INSERT INTO public.poll OVERRIDING SYSTEM VALUE VALUES (25, 7, 6, 9, 'ТЕСТ', '2024-06-09', '2024-06-15', 6, 'proposed', 'ТЕСТ', false, 1);


--
-- TOC entry 3474 (class 0 OID 86494)
-- Dependencies: 220
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3472 (class 0 OID 86484)
-- Dependencies: 218
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3494 (class 0 OID 143771)
-- Dependencies: 240
-- Data for Name: ownership; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (7, 7);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (4, 4);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (2, 2);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (3, 3);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (5, 5);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (1, 1);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (6, 11);
INSERT INTO public.ownership OVERRIDING SYSTEM VALUE VALUES (33, 36);


--
-- TOC entry 3495 (class 0 OID 143776)
-- Dependencies: 241
-- Data for Name: ownership_address; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.ownership_address VALUES (5, 7, 0);
INSERT INTO public.ownership_address VALUES (2, 7, 0);
INSERT INTO public.ownership_address VALUES (6, 7, 0);
INSERT INTO public.ownership_address VALUES (1, 6, 106);
INSERT INTO public.ownership_address VALUES (5, 5, 105);
INSERT INTO public.ownership_address VALUES (4, 4, 104);
INSERT INTO public.ownership_address VALUES (1, 7, 0);
INSERT INTO public.ownership_address VALUES (3, 7, 0);
INSERT INTO public.ownership_address VALUES (2, 2, 102);
INSERT INTO public.ownership_address VALUES (3, 3, 103);
INSERT INTO public.ownership_address VALUES (1, 1, 101);
INSERT INTO public.ownership_address VALUES (4, 7, 0);
INSERT INTO public.ownership_address VALUES (7, 7, 107);
INSERT INTO public.ownership_address VALUES (7, 7, 110);
INSERT INTO public.ownership_address VALUES (9, 7, 0);
INSERT INTO public.ownership_address VALUES (9, 33, 96);
INSERT INTO public.ownership_address VALUES (10, 7, 0);


--
-- TOC entry 3476 (class 0 OID 86502)
-- Dependencies: 222
-- Data for Name: poll_value; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.poll_value OVERRIDING SYSTEM VALUE VALUES (25, 23, '15.06');
INSERT INTO public.poll_value OVERRIDING SYSTEM VALUE VALUES (26, 23, '22.06');
INSERT INTO public.poll_value OVERRIDING SYSTEM VALUE VALUES (27, 24, '19.06');
INSERT INTO public.poll_value OVERRIDING SYSTEM VALUE VALUES (28, 24, '27.06');
INSERT INTO public.poll_value OVERRIDING SYSTEM VALUE VALUES (29, 25, '1');
INSERT INTO public.poll_value OVERRIDING SYSTEM VALUE VALUES (30, 25, '2');


--
-- TOC entry 3492 (class 0 OID 102815)
-- Dependencies: 238
-- Data for Name: system_object; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.system_object VALUES ('poll');
INSERT INTO public.system_object VALUES ('user_administration');
INSERT INTO public.system_object VALUES ('relocation');


--
-- TOC entry 3486 (class 0 OID 86537)
-- Dependencies: 232
-- Data for Name: privilege; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (1, 'poll', 'read');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (2, 'poll', 'write');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (3, 'poll', 'create');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (4, 'poll', 'delete');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (6, 'user_administration', 'read');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (7, 'user_administration', 'write');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (8, 'user_administration', 'create');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (9, 'user_administration', 'delete');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (10, 'relocation', 'write');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (11, 'relocation', 'read');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (12, 'relocation', 'create');
INSERT INTO public.privilege OVERRIDING SYSTEM VALUE VALUES (13, 'relocation', 'delete');


--
-- TOC entry 3497 (class 0 OID 160169)
-- Dependencies: 243
-- Data for Name: relocation_request; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.relocation_request VALUES (7, 'Хуево', 'Кукуево', '123', '3', 'ADD');


--
-- TOC entry 3484 (class 0 OID 86531)
-- Dependencies: 230
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role OVERRIDING SYSTEM VALUE VALUES (1, 'user');
INSERT INTO public.role OVERRIDING SYSTEM VALUE VALUES (2, 'admin');
INSERT INTO public.role OVERRIDING SYSTEM VALUE VALUES (3, 'root');


--
-- TOC entry 3487 (class 0 OID 86542)
-- Dependencies: 233
-- Data for Name: role_privilege; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role_privilege VALUES (1, 1);
INSERT INTO public.role_privilege VALUES (3, 3);
INSERT INTO public.role_privilege VALUES (1, 2);
INSERT INTO public.role_privilege VALUES (2, 2);
INSERT INTO public.role_privilege VALUES (3, 2);
INSERT INTO public.role_privilege VALUES (4, 2);
INSERT INTO public.role_privilege VALUES (6, 2);
INSERT INTO public.role_privilege VALUES (7, 2);
INSERT INTO public.role_privilege VALUES (8, 2);
INSERT INTO public.role_privilege VALUES (9, 2);
INSERT INTO public.role_privilege VALUES (10, 2);
INSERT INTO public.role_privilege VALUES (11, 2);
INSERT INTO public.role_privilege VALUES (12, 2);
INSERT INTO public.role_privilege VALUES (13, 2);
INSERT INTO public.role_privilege VALUES (10, 1);
INSERT INTO public.role_privilege VALUES (11, 1);


--
-- TOC entry 3490 (class 0 OID 86565)
-- Dependencies: 236
-- Data for Name: unavailable_poll_for_user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3489 (class 0 OID 86560)
-- Dependencies: 235
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_role VALUES (1, 1);
INSERT INTO public.user_role VALUES (2, 2);
INSERT INTO public.user_role VALUES (3, 3);
INSERT INTO public.user_role VALUES (2, 7);
INSERT INTO public.user_role VALUES (1, 4);
INSERT INTO public.user_role VALUES (1, 36);


--
-- TOC entry 3482 (class 0 OID 86525)
-- Dependencies: 228
-- Data for Name: users_answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_answer OVERRIDING SYSTEM VALUE VALUES (41, 7, 25);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 225
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 10, true);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 219
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq', 13, true);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 217
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_id_seq', 19, true);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 239
-- Name: ownership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.ownership_id_seq', 34, true);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 215
-- Name: poll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_id_seq', 25, true);


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 242
-- Name: poll_sсhedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."poll_sсhedule_id_seq"', 6, true);


--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 221
-- Name: poll_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_value_id_seq', 30, true);


--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 231
-- Name: privilege_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.privilege_id_seq', 13, true);


--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 229
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 6, true);


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 37, true);


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_answer_id_seq', 41, true);


-- Completed on 2024-06-16 11:47:03

--
-- PostgreSQL database dump complete
--

