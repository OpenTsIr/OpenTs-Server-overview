create table user if not exists
(
    id varchar(36) primary key,
    email varchar(255) unique not null,
    password varchar(255) not null,
    nickname varchar(255) not null,
    role varchar(255) not null,
    status varchar(255) not null,
    createdAt date not null,
    updatedAt date not null,
    concurrencyVersion smallint not null
);
