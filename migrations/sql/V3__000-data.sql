create table if not exists relocation_request
(
    user_id          bigint      not null
        constraint relocation_request_fk
            references "user"
            on update cascade on delete cascade,
    city             varchar(50) not null,
    street           varchar(50) not null,
    house_number     varchar(50) not null,
    apartment_number varchar(50) not null
);

alter table apartment_address
    drop constraint apartment_address_user_id_fkey;

alter table apartment_address
    drop column user_id;

alter table apartment_address
    drop constraint apartment_address_apartment_id_fkey;

alter table apartment_address
    rename column apartment_id to number;

create unique index apartment_address_id_number_uniq
    on apartment_address (address_id, number);

drop table apartment;

alter table apartment_address
    rename to apartment;

alter table apartment
    add user_id bigint;

alter table apartment
    alter column user_id set not null;

alter table apartment
    add constraint apartment_user_id_fk
        foreign key (user_id) references "user";

alter table ownership_address
    add apartment_number bigint;

comment on column ownership_address.apartment_number is 'номер квартиры';

alter table ownership_address
    alter column apartment_number set not null;

alter table ownership_address
    drop constraint address_ownership_uniq;

alter table ownership_address
    add constraint address_ownership_apartment_number_uniq
        unique (ownership_id, address_id, apartment_number);

alter table apartment
    drop constraint apartment_address_address_id_fkey;

alter table apartment
    drop constraint apartment_user_id_fk;

drop table apartment;

comment on column poll.creator_user_id is 'Указать id удалённого пользователя';

alter table poll
    alter column creator_user_id set default 11;

alter table message
    alter column user_id set default 11;







