create type address_object as
(
    city         varchar(50),
    street       varchar(60),
    house_number varchar(10)
);

alter type address_object owner to postgres;

create type poll_type_enum as enum ('Every month', 'First day every month', 'Every week', 'Personal');

alter type poll_type_enum owner to postgres;

create type privilege_enum as enum ('read', 'write', 'delete', 'update', 'crud_poll', 'crud_user', 'crud_admin');

alter type privilege_enum owner to postgres;

create type role_enum as enum ('user', 'admin', 'root');

alter type role_enum owner to postgres;

create type status_enum as enum ('proposed', 'active', 'planned', 'closed', 'returned');

alter type status_enum owner to postgres;

create type relocation_action as enum ('ADD', 'DELETE');

alter type relocation_action owner to postgres;

create table if not exists "user"
(
    id           bigint generated always as identity
        primary key,
    full_name    varchar(200)         not null,
    birth_date   date                 not null,
    login        varchar(50)          not null,
    password     varchar(500)         not null,
    phone_number varchar(12)          not null,
    email        varchar(256),
    is_blocked   boolean default true not null,
    ownership_id bigint
);

comment on table "user" is 'id = 0 - для удалённого пользователя(используется в для отображения его сообщений в чате)

';

comment on column "user".ownership_id is 'fk для владений';

alter table "user"
    owner to postgres;

create table if not exists address
(
    id           bigint generated always as identity
        primary key,
    city         varchar(50),
    street       varchar(50),
    house_number varchar(50),
    constraint city_street_house_uniq
        unique (city, street, house_number)
);

alter table address
    owner to postgres;

create table if not exists role
(
    id        bigint generated always as identity
        primary key,
    role_name role_enum not null
);

comment on table role is 'id = 1 для user';

alter table role
    owner to postgres;

create table if not exists poll_sсhedule
(
    id         bigint generated always as identity
        primary key,
    type       varchar(50) not null,
    count_days bigint
);

alter table poll_sсhedule
    owner to postgres;

create table if not exists poll
(
    id                         bigint generated always as identity
        primary key,
    creator_user_id            bigint      default 11                           not null
        references "user"
            on update cascade on delete set default,
    poll_shedule_id            bigint
        references poll_sсhedule
            on update cascade on delete cascade,
    adress_id                  bigint                                           not null
        references address
            on update cascade on delete cascade,
    name                       varchar(100)                                     not null,
    start_date                 date                                             not null,
    end_date                   date                                             not null,
    duration                   integer                                          not null,
    status                     varchar(10) default 'planned'::character varying not null,
    description                varchar(1000)                                    not null,
    cyclical                   boolean                                          not null,
    max_number_answers_by_user bigint      default 1                            not null
);

comment on column poll.creator_user_id is 'Указать id удалённого пользователя';

alter table poll
    owner to postgres;

create table if not exists message
(
    id                bigint generated always as identity
        primary key,
    user_id           bigint                   default 11           not null
        references "user"
            on update cascade on delete set default,
    poll_id           bigint                                        not null
        references poll
            on update cascade on delete cascade,
    date_sent_message timestamp with time zone default CURRENT_DATE not null,
    message           varchar(500)                                  not null
);

comment on table message is 'сообщение в чате';

alter table message
    owner to postgres;

create table if not exists file
(
    id            bigint generated always as identity
        primary key,
    poll_id       bigint                                           not null
        references poll
            on update cascade on delete cascade,
    original_name varchar(100)                                     not null,
    data          bytea                                            not null,
    type          varchar(20) default 'unknown'::character varying not null,
    size          varchar(10)                                      not null
);

comment on column file.data is 'колонка для хранения файлов';

comment on column file.size is 'Размер файла';

alter table file
    owner to postgres;

create table if not exists poll_value
(
    id      bigint generated always as identity
        primary key,
    poll_id bigint      not null
        references poll
            on update cascade on delete cascade,
    value   varchar(50) not null
);

alter table poll_value
    owner to postgres;

create table if not exists users_answer
(
    id            bigint generated always as identity
        primary key,
    user_id       bigint not null
        references "user"
            on update cascade on delete cascade,
    poll_value_id bigint not null
        references poll_value
            on update cascade on delete cascade
);

alter table users_answer
    owner to postgres;

create table if not exists user_role
(
    role_id bigint not null
        constraint role_user_role_id_fkey
            references role
            on update cascade on delete cascade,
    user_id bigint not null
        constraint role_user_user_id_fkey
            references "user"
            on update cascade on delete cascade
);

alter table user_role
    owner to postgres;

create table if not exists unavailable_poll_for_user
(
    poll_id bigint not null
        references poll
            on update cascade on delete cascade,
    user_id bigint not null
        references "user"
            on update cascade on delete cascade,
    constraint unavailable_poll_for_user_uniq
        unique (poll_id, user_id)
);

alter table unavailable_poll_for_user
    owner to postgres;

create table if not exists action
(
    name varchar(50) not null
        primary key
);

alter table action
    owner to postgres;

create table if not exists system_object
(
    name varchar(50) not null
        primary key
);

alter table system_object
    owner to postgres;

create table if not exists privilege
(
    id                 bigint generated always as identity
        primary key,
    system_object_name varchar(50) not null
        references system_object,
    action_name        varchar(50) not null
        references action,
    constraint privilege_system_object_name_action_name_system_object_name_key
        unique (system_object_name, action_name)
);

alter table privilege
    owner to postgres;

create table if not exists role_privilege
(
    privilege_id bigint not null
        constraint privilege_role_privilege_id_fkey
            references privilege
            on update cascade on delete cascade,
    role_id      bigint not null
        constraint privilege_role_role_id_fkey
            references role
            on update cascade on delete cascade
);

alter table role_privilege
    owner to postgres;

create table if not exists ownership
(
    id      bigint generated always as identity
        constraint ownership_pk
            primary key,
    user_id bigint default 7
        constraint ownership_fk
            references "user"
            on update cascade on delete cascade
);

comment on table ownership is 'владения (для каждого пользователя свой ownership)';

alter table ownership
    owner to admin;

alter table "user"
    add constraint user_ownership_id_fk
        foreign key (ownership_id) references ownership
            on update cascade on delete cascade;

create table if not exists ownership_address
(
    address_id       bigint not null
        constraint address_ownership_address_id_fk
            references address
            on update cascade on delete cascade,
    ownership_id     bigint not null
        constraint address_ownership_ownership_id_fk
            references ownership
            on update cascade on delete cascade,
    apartment_number bigint not null,
    constraint address_ownership_apartment_number_uniq
        unique (ownership_id, address_id, apartment_number)
);

comment on column ownership_address.apartment_number is 'номер квартиры';

alter table ownership_address
    owner to admin;

create table if not exists relocation_request
(
    user_id          bigint            not null
        constraint relocation_request_fk
            references "user"
            on update cascade on delete cascade,
    city             varchar(50)       not null,
    street           varchar(50)       not null,
    house_number     varchar(50)       not null,
    apartment_number varchar(50)       not null,
    action           relocation_action not null
);

alter table relocation_request
    owner to admin;

create unique index if not exists relocation_request_uniq
    on relocation_request (user_id, city, street, house_number, apartment_number);

