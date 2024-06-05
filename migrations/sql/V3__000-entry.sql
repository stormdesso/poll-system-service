alter table poll
    alter column status type varchar(10) using status::varchar(10);

alter table poll
    alter column status set default 'planned';

alter table poll_sсhedule
    alter column type type varchar(50) using type::varchar(50);

alter table poll_sсhedule
    alter column count_days drop not null;

alter table poll_sсhedule
    alter column id add generated always as identity;

alter table poll
    alter column poll_shedule_id drop not null;

alter table poll
    drop column number_votes;

alter table address_ownership
    rename to ownership_address;

alter table address
    drop column address;

alter table address
    add city varchar(50);

alter table address
    add street varchar(50);

alter table address
    add house_number varchar(50);

UPDATE public.address SET city = 'Пермь', street = 'улица 1', house_number = '1' WHERE id = 1;
UPDATE public.address SET city = 'Пермь', street = 'улица 2', house_number = '2' WHERE id = 2;
UPDATE public.address SET city = 'Пермь', street = 'улица 3', house_number = '3' WHERE id = 3;
UPDATE public.address SET city = 'Пермь', street = 'улица 4', house_number = '4' WHERE id = 4;
UPDATE public.address SET city = 'Пермь', street = 'улица 5', house_number = '5' WHERE id = 5;
UPDATE public.address SET city = 'Пермь', street = 'улица 6', house_number = '6' WHERE id = 6;

UPDATE public.role_privilege SET privilege_id = 3, role_id = 3 WHERE ctid = '(0,3)';
UPDATE public.role_privilege SET privilege_id = 1, role_id = 2 WHERE ctid = '(0,4)';
UPDATE public.role_privilege SET privilege_id = 2, role_id = 2 WHERE ctid = '(0,5)';
UPDATE public.role_privilege SET privilege_id = 3, role_id = 2 WHERE ctid = '(0,6)';
UPDATE public.role_privilege SET privilege_id = 4, role_id = 2 WHERE ctid = '(0,7)';
UPDATE public.role_privilege SET privilege_id = 6, role_id = 2 WHERE ctid = '(0,8)';
UPDATE public.role_privilege SET privilege_id = 7, role_id = 2 WHERE ctid = '(0,9)';
UPDATE public.role_privilege SET privilege_id = 8, role_id = 2 WHERE ctid = '(0,10)';
UPDATE public.role_privilege SET privilege_id = 9, role_id = 2 WHERE ctid = '(0,11)';
UPDATE public.role_privilege SET privilege_id = 1, role_id = 1 WHERE ctid = '(0,1)';

alter table address
    add constraint city_street_house_uniq
        unique (city, street, house_number);


