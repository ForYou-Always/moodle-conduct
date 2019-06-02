DROP TABLE IF EXISTS public.role;
DROP SEQUENCE IF EXISTS public.role_id_seq;

CREATE SEQUENCE public.role_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.role (
  id                          BIGINT NOT NULL DEFAULT nextval('role_id_seq'),
  type                        TEXT UNIQUE DEFAULT NULL,
  description                 TEXT DEFAULT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.project;
DROP SEQUENCE IF EXISTS public.project_id_seq;

CREATE SEQUENCE public.project_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.project (
  id                          BIGINT NOT NULL DEFAULT nextval('project_id_seq'),
  name                        TEXT UNIQUE DEFAULT NULL,
  description                 TEXT DEFAULT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  start_date                  TIMESTAMP,
  end_date                    TIMESTAMP,
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.employee_project_info;
DROP SEQUENCE IF EXISTS public.employee_project_info_id_seq;

CREATE SEQUENCE public.employee_project_info_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.employee_project_info (
  id                          BIGINT NOT NULL DEFAULT nextval('employee_project_info_id_seq'),
  mail_id                     VARCHAR(80) NOT NULL,
  project                     BIGINT DEFAULT NULL,
  role                        BIGINT DEFAULT NULL,
  team_lead                   VARCHAR(80),   
  manager                     VARCHAR(80),
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  start_date                  TIMESTAMP,
  end_date                    TIMESTAMP,
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (project) REFERENCES public.project (id),
  FOREIGN KEY (role) REFERENCES public.role (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
