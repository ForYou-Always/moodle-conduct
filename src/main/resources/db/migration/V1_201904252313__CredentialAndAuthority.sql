
DROP TABLE IF EXISTS public.user_credentials;
DROP SEQUENCE IF EXISTS public.user_credentials_id_seq;

CREATE SEQUENCE public.user_credentials_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.user_credentials (
  id                          BIGINT NOT NULL DEFAULT nextval('user_credentials_id_seq'),
  mail_id                     VARCHAR(150) UNIQUE NOT NULL,
  hashed_password             BYTEA,
  hashed_salt                 BYTEA,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.user_authority_info;
DROP SEQUENCE IF EXISTS public.user_authority_info_id_seq;

CREATE SEQUENCE public.user_authority_info_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.user_authority_info (
  id                          BIGINT NOT NULL DEFAULT nextval('user_authority_info_id_seq'),
  user_id                     BIGINT NOT NULL,
  admin                       BOOLEAN DEFAULT FALSE,
  developer                   BOOLEAN DEFAULT FALSE,
  tester                      BOOLEAN DEFAULT FALSE,
  system_admin                BOOLEAN DEFAULT FALSE,
  manager                     BOOLEAN DEFAULT FALSE,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES public.user_credentials (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------