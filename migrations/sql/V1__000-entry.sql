CREATE ROLE postgres WITH LOGIN;


CREATE TYPE public.address_object AS (
                                         city character varying(50),
                                         street character varying(60),
                                         house_number character varying(10)
                                     );


ALTER TYPE public.address_object OWNER TO postgres;

--
-- TOC entry 869 (class 1247 OID 86434)
-- Name: poll_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.poll_type_enum AS ENUM (
    'Every month',
    'First day every month',
    'Every week',
    'Personal'
    );


ALTER TYPE public.poll_type_enum OWNER TO postgres;

--
-- TOC entry 872 (class 1247 OID 86444)
-- Name: privilege_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.privilege_enum AS ENUM (
    'read',
    'write',
    'delete',
    'update',
    'crud_poll',
    'crud_user',
    'crud_admin'
    );


ALTER TYPE public.privilege_enum OWNER TO postgres;

--
-- TOC entry 875 (class 1247 OID 86454)
-- Name: role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role_enum AS ENUM (
    'user',
    'admin',
    'root'
    );


ALTER TYPE public.role_enum OWNER TO postgres;

--
-- TOC entry 878 (class 1247 OID 86462)
-- Name: status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_enum AS ENUM (
    'proposed',
    'active',
    'planned',
    'closed',
    'returned'
    );


ALTER TYPE public.status_enum OWNER TO postgres;


-- Name: action; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.action (
    name character varying(50) NOT NULL
);


ALTER TABLE public.action OWNER TO postgres;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 239
-- Name: TABLE action; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.action IS 'Действия, которые может выполнить пользователь с определённой ролью';


--
-- TOC entry 226 (class 1259 OID 86517)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
                                id bigint NOT NULL,
                                address public.address_object NOT NULL
);


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 86516)
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.address ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 243 (class 1259 OID 143776)
-- Name: address_ownership; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.address_ownership (
                                          address_id bigint NOT NULL,
                                          ownership_id bigint NOT NULL
);


ALTER TABLE public.address_ownership OWNER TO admin;

--
-- TOC entry 235 (class 1259 OID 86550)
-- Name: apartment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apartment (
    number bigint NOT NULL
);


ALTER TABLE public.apartment OWNER TO postgres;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 235
-- Name: TABLE apartment; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.apartment IS '0 - значение для администраторов, если они не имеют квартиры в доме';


--
-- TOC entry 236 (class 1259 OID 86556)
-- Name: apartment_address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apartment_address (
                                          apartment_id bigint NOT NULL,
                                          address_id bigint NOT NULL,
                                          user_id bigint NOT NULL
);


ALTER TABLE public.apartment_address OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 86494)
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file (
                             id bigint NOT NULL,
                             poll_id bigint NOT NULL,
                             original_name character varying(100) NOT NULL,
                             data bytea NOT NULL,
                             type character varying(20) DEFAULT 'unknown'::character varying NOT NULL,
                             size character varying(10) NOT NULL
);


ALTER TABLE public.file OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN file.data; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.data IS 'колонка для хранения файлов';


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN file.size; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.size IS 'Размер файла';


--
-- TOC entry 219 (class 1259 OID 86493)
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.file ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 218 (class 1259 OID 86484)
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
                                id bigint NOT NULL,
                                user_id bigint DEFAULT 0 NOT NULL,
                                poll_id bigint NOT NULL,
                                date_sent_message timestamp with time zone DEFAULT CURRENT_DATE NOT NULL,
                                message character varying(500) NOT NULL
);


ALTER TABLE public.message OWNER TO postgres;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE message; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.message IS 'сообщение в чате';


--
-- TOC entry 217 (class 1259 OID 86483)
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.message ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 242 (class 1259 OID 143771)
-- Name: ownership; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ownership (
    id bigint NOT NULL
);


ALTER TABLE public.ownership OWNER TO admin;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 242
-- Name: TABLE ownership; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.ownership IS 'владения (для каждого пользователя свой ownership)';


--
-- TOC entry 241 (class 1259 OID 143770)
-- Name: ownership_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.ownership ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ownership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 216 (class 1259 OID 86474)
-- Name: poll; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poll (
                             id bigint NOT NULL,
                             creator_user_id bigint DEFAULT 0 NOT NULL,
                             poll_shedule_id bigint NOT NULL,
                             adress_id bigint NOT NULL,
                             name character varying(100) NOT NULL,
                             start_date date NOT NULL,
                             end_date date NOT NULL,
                             duration integer NOT NULL,
                             status public.status_enum DEFAULT 'proposed'::public.status_enum NOT NULL,
                             number_votes bigint NOT NULL,
                             description character varying(1000) NOT NULL,
                             cyclical boolean NOT NULL,
                             max_number_answers_by_user bigint DEFAULT 1 NOT NULL
);


ALTER TABLE public.poll OWNER TO postgres;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN poll.number_votes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.poll.number_votes IS 'Не используется';


--
-- TOC entry 215 (class 1259 OID 86473)
-- Name: poll_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.poll ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.poll_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 234 (class 1259 OID 86545)
-- Name: poll_sсhedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."poll_sсhedule" (
                                        id bigint NOT NULL,
                                        type public.poll_type_enum NOT NULL,
                                        count_days bigint NOT NULL
);


ALTER TABLE public."poll_sсhedule" OWNER TO postgres;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 234
-- Name: TABLE "poll_sсhedule"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."poll_sсhedule" IS 'count_days - через сколько повторится опрос';


--
-- TOC entry 222 (class 1259 OID 86502)
-- Name: poll_value; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poll_value (
                                   id bigint NOT NULL,
                                   poll_id bigint NOT NULL,
                                   value character varying(50) NOT NULL
);


ALTER TABLE public.poll_value OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 86501)
-- Name: poll_value_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.poll_value ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.poll_value_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 232 (class 1259 OID 86537)
-- Name: privilege; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.privilege (
                                  id bigint NOT NULL,
                                  system_object_name character varying(50) NOT NULL,
                                  action_name character varying(50) NOT NULL
);


ALTER TABLE public.privilege OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 86536)
-- Name: privilege_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.privilege ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.privilege_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 230 (class 1259 OID 86531)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
                             id bigint NOT NULL,
                             role_name public.role_enum NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 230
-- Name: TABLE role; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.role IS 'id = 1 для user';


--
-- TOC entry 229 (class 1259 OID 86530)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.role ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 233 (class 1259 OID 86542)
-- Name: role_privilege; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_privilege (
                                       privilege_id bigint NOT NULL,
                                       role_id bigint NOT NULL
);


ALTER TABLE public.role_privilege OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 102815)
-- Name: system_object; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_object (
    name character varying(50) NOT NULL
);


ALTER TABLE public.system_object OWNER TO postgres;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 240
-- Name: TABLE system_object; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.system_object IS 'Объекты системы, к которым пользователь имеет доступ';


--
-- TOC entry 238 (class 1259 OID 86565)
-- Name: unavailable_poll_for_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unavailable_poll_for_user (
                                                  poll_id bigint NOT NULL,
                                                  user_id bigint NOT NULL
);


ALTER TABLE public.unavailable_poll_for_user OWNER TO postgres;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 238
-- Name: TABLE unavailable_poll_for_user; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.unavailable_poll_for_user IS 'Ограничение доступа к некоторым опросам';


--
-- TOC entry 224 (class 1259 OID 86508)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
                               id bigint NOT NULL,
                               address_id bigint NOT NULL,
                               full_name character varying(200) NOT NULL,
                               birth_date date NOT NULL,
                               login character varying(50) NOT NULL,
                               password character varying(500) NOT NULL,
                               phone_number character varying(12) NOT NULL,
                               email character varying(256),
                               is_blocked boolean DEFAULT true NOT NULL,
                               ownership_id bigint
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 224
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."user" IS 'id = 0 - для удалённого пользователя(используется в для отображения его сообщений в чате)

';


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN "user".ownership_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".ownership_id IS 'fk для владений';


--
-- TOC entry 223 (class 1259 OID 86507)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 237 (class 1259 OID 86560)
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
                                  role_id bigint NOT NULL,
                                  user_id bigint NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 86525)
-- Name: users_answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_answer (
                                     id bigint NOT NULL,
                                     user_id bigint NOT NULL,
                                     poll_value_id bigint NOT NULL
);


ALTER TABLE public.users_answer OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 86524)
-- Name: users_answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_answer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_answer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- TOC entry 3304 (class 2606 OID 102814)
-- Name: action action_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_pkey PRIMARY KEY (name);


--
-- TOC entry 3310 (class 2606 OID 143795)
-- Name: address_ownership address_ownership_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.address_ownership
    ADD CONSTRAINT address_ownership_uniq UNIQUE (ownership_id, address_id);


--
-- TOC entry 3288 (class 2606 OID 86523)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- TOC entry 3300 (class 2606 OID 86554)
-- Name: apartment apartment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment
    ADD CONSTRAINT apartment_pkey PRIMARY KEY (number);


--
-- TOC entry 3282 (class 2606 OID 86500)
-- Name: file file_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_pkey PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 86492)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- TOC entry 3308 (class 2606 OID 143775)
-- Name: ownership ownership_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ownership
    ADD CONSTRAINT ownership_pk PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 86482)
-- Name: poll poll_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_pkey PRIMARY KEY (id);


--
-- TOC entry 3298 (class 2606 OID 86549)
-- Name: poll_sсhedule poll_sсhedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."poll_sсhedule"
    ADD CONSTRAINT "poll_sсhedule_pkey" PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 86506)
-- Name: poll_value poll_value_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_value
    ADD CONSTRAINT poll_value_pkey PRIMARY KEY (id);


--
-- TOC entry 3294 (class 2606 OID 86541)
-- Name: privilege privilege_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_pkey PRIMARY KEY (id);


--
-- TOC entry 3296 (class 2606 OID 102821)
-- Name: privilege privilege_system_object_name_action_name_system_object_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_system_object_name_action_name_system_object_name_key UNIQUE (system_object_name, action_name) INCLUDE (system_object_name, action_name);


--
-- TOC entry 3292 (class 2606 OID 86535)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3306 (class 2606 OID 102819)
-- Name: system_object system_object_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_object
    ADD CONSTRAINT system_object_pkey PRIMARY KEY (name);


--
-- TOC entry 3302 (class 2606 OID 143797)
-- Name: unavailable_poll_for_user unavailable_poll_for_user_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unavailable_poll_for_user
    ADD CONSTRAINT unavailable_poll_for_user_uniq UNIQUE (poll_id, user_id);


--
-- TOC entry 3286 (class 2606 OID 86515)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3290 (class 2606 OID 86529)
-- Name: users_answer users_answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_answer
    ADD CONSTRAINT users_answer_pkey PRIMARY KEY (id);


--
-- TOC entry 3332 (class 2606 OID 143779)
-- Name: address_ownership address_ownership_address_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.address_ownership
    ADD CONSTRAINT address_ownership_address_id_fk FOREIGN KEY (address_id) REFERENCES public.address(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3333 (class 2606 OID 143784)
-- Name: address_ownership address_ownership_ownership_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.address_ownership
    ADD CONSTRAINT address_ownership_ownership_id_fk FOREIGN KEY (ownership_id) REFERENCES public.ownership(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3325 (class 2606 OID 86628)
-- Name: apartment_address apartment_address_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_address
    ADD CONSTRAINT apartment_address_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3326 (class 2606 OID 86623)
-- Name: apartment_address apartment_address_apartment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_address
    ADD CONSTRAINT apartment_address_apartment_id_fkey FOREIGN KEY (apartment_id) REFERENCES public.apartment(number) ON UPDATE CASCADE NOT VALID;


--
-- TOC entry 3327 (class 2606 OID 86633)
-- Name: apartment_address apartment_address_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_address
    ADD CONSTRAINT apartment_address_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE NOT VALID;


--
-- TOC entry 3316 (class 2606 OID 86593)
-- Name: file file_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES public.poll(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3314 (class 2606 OID 86583)
-- Name: message message_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES public.poll(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3315 (class 2606 OID 86588)
-- Name: message message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


--
-- TOC entry 3311 (class 2606 OID 86568)
-- Name: poll poll_adress_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_adress_id_fkey FOREIGN KEY (adress_id) REFERENCES public.address(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3312 (class 2606 OID 86578)
-- Name: poll poll_creator_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_creator_user_id_fkey FOREIGN KEY (creator_user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


--
-- TOC entry 3313 (class 2606 OID 86573)
-- Name: poll poll_poll_shedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_poll_shedule_id_fkey FOREIGN KEY (poll_shedule_id) REFERENCES public."poll_sсhedule"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3317 (class 2606 OID 86598)
-- Name: poll_value poll_value_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_value
    ADD CONSTRAINT poll_value_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES public.poll(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3321 (class 2606 OID 102827)
-- Name: privilege privilege_action_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_action_name_fkey FOREIGN KEY (action_name) REFERENCES public.action(name) NOT VALID;


--
-- TOC entry 3323 (class 2606 OID 86613)
-- Name: role_privilege privilege_role_privilege_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_privilege
    ADD CONSTRAINT privilege_role_privilege_id_fkey FOREIGN KEY (privilege_id) REFERENCES public.privilege(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3324 (class 2606 OID 86618)
-- Name: role_privilege privilege_role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_privilege
    ADD CONSTRAINT privilege_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3322 (class 2606 OID 102822)
-- Name: privilege privilege_system_object_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_system_object_name_fkey FOREIGN KEY (system_object_name) REFERENCES public.system_object(name) NOT VALID;


--
-- TOC entry 3328 (class 2606 OID 111002)
-- Name: user_role role_user_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT role_user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3329 (class 2606 OID 86643)
-- Name: user_role role_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT role_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3330 (class 2606 OID 86648)
-- Name: unavailable_poll_for_user unavailable_poll_for_user_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unavailable_poll_for_user
    ADD CONSTRAINT unavailable_poll_for_user_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES public.poll(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3331 (class 2606 OID 86653)
-- Name: unavailable_poll_for_user unavailable_poll_for_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unavailable_poll_for_user
    ADD CONSTRAINT unavailable_poll_for_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3318 (class 2606 OID 143789)
-- Name: user user_ownership_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_ownership_id_fk FOREIGN KEY (ownership_id) REFERENCES public.ownership(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3319 (class 2606 OID 86608)
-- Name: users_answer users_answer_poll_value_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_answer
    ADD CONSTRAINT users_answer_poll_value_id_fkey FOREIGN KEY (poll_value_id) REFERENCES public.poll_value(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3320 (class 2606 OID 86603)
-- Name: users_answer users_answer_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_answer
    ADD CONSTRAINT users_answer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2024-05-31 23:04:55

--
-- PostgreSQL database dump complete
--

