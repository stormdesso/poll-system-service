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

