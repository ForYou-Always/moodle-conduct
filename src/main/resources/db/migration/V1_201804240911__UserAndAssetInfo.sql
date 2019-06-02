DROP TABLE IF EXISTS public.location_details;
DROP SEQUENCE IF EXISTS public.location_details_id_seq;

CREATE SEQUENCE public.location_details_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.location_details (
  id                          BIGINT NOT NULL DEFAULT nextval('location_details_id_seq'),
  place                       VARCHAR(150) NOT NULL,
  branch                      VARCHAR(150) DEFAULT NULL,
  floor                       INT,
  seat_no                     VARCHAR,
  create_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  PRIMARY KEY (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.asset_details;
DROP SEQUENCE IF EXISTS public.asset_details_id_seq;

CREATE SEQUENCE public.asset_details_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.asset_details (
  id                          BIGINT NOT NULL DEFAULT nextval('asset_details_id_seq'),
  type                        VARCHAR(150),
  name                        VARCHAR(150),
  make                        VARCHAR(150),
  model                       VARCHAR(150),
  serial_no                   VARCHAR(255) UNIQUE,
  description                 VARCHAR,
  purchase_date               DATE,
  warranty_exp_date           DATE,
  location_id                 BIGINT DEFAULT NULL,
  insurance_info              TEXT,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (location_id) REFERENCES public.location_details (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.virtual_resources;
DROP SEQUENCE IF EXISTS public.virtual_resources_id_seq;

CREATE SEQUENCE public.virtual_resources_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.virtual_resources (
  id                          BIGINT NOT NULL DEFAULT nextval('virtual_resources_id_seq'),
  type                        VARCHAR(150) DEFAULT NULL,
  name                        VARCHAR(150),
  ip_address                  VARCHAR(150),
  port                        VARCHAR(255),
  description                 TEXT,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.user_details;
DROP SEQUENCE IF EXISTS public.user_details_id_seq;

CREATE SEQUENCE public.user_details_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.user_details (
  id                          BIGINT NOT NULL DEFAULT nextval('user_details_id_seq'),
  mail_id                     VARCHAR(80) UNIQUE NOT NULL,
  emp_id                      VARCHAR(80) UNIQUE NOT NULL,
  domain_name                 VARCHAR(80) UNIQUE NOT NULL,
  location_id                 BIGINT DEFAULT NULL,
  asset_id                    TEXT DEFAULT NULL,
  virtual_resource            TEXT DEFAULT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (location_id) REFERENCES public.location_details (id)
);
