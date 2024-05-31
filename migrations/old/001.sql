-- Type: address_enum

DROP TYPE IF EXISTS public.address_enum;

CREATE TYPE public.address_enum AS
(
    city character varying(50),
    street character varying(60),
    house_number character varying(10)
);

ALTER TYPE public.address_enum
    OWNER TO postgres;


-- Type: poll_type_enum

DROP TYPE IF EXISTS public.poll_type_enum;

CREATE TYPE public.poll_type_enum AS ENUM
    ('Every month', 'First day every month', 'Every week', 'Personal');

ALTER TYPE public.poll_type_enum
    OWNER TO postgres;


-- Type: privilege_enum

DROP TYPE IF EXISTS public.privilege_enum;

CREATE TYPE public.privilege_enum AS ENUM
    ('read', 'write', 'delete', 'update');

ALTER TYPE public.privilege_enum
    OWNER TO postgres;


-- Type: role_enum

DROP TYPE IF EXISTS public.role_enum;

CREATE TYPE public.role_enum AS ENUM
    ('user', 'admin', 'root');

ALTER TYPE public.role_enum
    OWNER TO postgres;


-- Type: status_enum

DROP TYPE IF EXISTS public.status_enum;

CREATE TYPE public.status_enum AS ENUM
    ('proposed', 'active', 'planned', 'closed', 'returned');

ALTER TYPE public.status_enum
    OWNER TO postgres;

-- Type: address_object

-- DROP TYPE IF EXISTS public.address_object;

CREATE TYPE public.address_object AS
(
    city character varying(50),
    street character varying(60),
    house_number character varying(10)
);

ALTER TYPE public.address_object
    OWNER TO postgres;
