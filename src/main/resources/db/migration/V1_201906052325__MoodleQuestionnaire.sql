--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.vexamine_moodle_test_category;
DROP SEQUENCE IF EXISTS public.vexamine_moodle_test_category_id_seq;

CREATE SEQUENCE public.vexamine_moodle_test_category_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.vexamine_moodle_test_category (
  id                          BIGINT NOT NULL DEFAULT nextval('vexamine_moodle_test_category_id_seq'),
  category                    TEXT NOT NULL,
  sub_category                TEXT NOT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.vexamine_moodle_question_bank;
DROP SEQUENCE IF EXISTS public.vexamine_moodle_question_bank_id_seq;

CREATE SEQUENCE public.vexamine_moodle_question_bank_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.vexamine_moodle_question_bank (
  id                          BIGINT NOT NULL DEFAULT nextval('vexamine_moodle_question_bank_id_seq'),
  category_id                 BIGINT NOT NULL,
  question_bank_name          TEXT NOT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES public.vexamine_moodle_test_category (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.vexamine_moodle_question_answer;
DROP SEQUENCE IF EXISTS public.vexamine_moodle_question_answer_id_seq;

CREATE SEQUENCE public.vexamine_moodle_question_answer_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.vexamine_moodle_question_answer (
  id                          BIGINT NOT NULL DEFAULT nextval('vexamine_moodle_question_answer_id_seq'),
  question                    TEXT NOT NULL,
  option1                     TEXT,
  option2                     TEXT,
  option3                     TEXT,
  option4                     TEXT,
  answer                      TEXT,
  question_bank_id            BIGINT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (question_bank_id) REFERENCES public.vexamine_moodle_question_bank (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------