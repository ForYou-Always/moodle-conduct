--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.vexamine_moodle_test_assignment;
DROP SEQUENCE IF EXISTS public.vexamine_moodle_test_assignment_id_seq;

CREATE SEQUENCE public.vexamine_moodle_test_assignment_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.vexamine_moodle_test_assignment (
  id                          BIGINT NOT NULL DEFAULT nextval('vexamine_moodle_test_assignment_id_seq'),
  user_auth_id                BIGINT NOT NULL,
  question_bank_id            BIGINT NOT NULL,
  questions_count             INT,
  invite_sent                 boolean,
  status                      VARCHAR(200),
  expired                     boolean,
  expiration_time             TIMESTAMP,
  test_start_time             TIMESTAMP,
  test_end_time               TIMESTAMP,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_auth_id) REFERENCES public.vexamine_user_authority_info (id),
  FOREIGN KEY (question_bank_id) REFERENCES public.vexamine_moodle_question_bank (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS public.vexamine_moodle_test_results;
DROP SEQUENCE IF EXISTS public.vexamine_moodle_test_results_id_seq;

CREATE SEQUENCE public.vexamine_moodle_test_results_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.vexamine_moodle_test_results (
  id                          BIGINT NOT NULL DEFAULT nextval('vexamine_moodle_test_results_id_seq'),
  user_auth_id                BIGINT NOT NULL,
  question_id                 BIGINT NOT NULL,
  valid_answer                boolean,
  status                      VARCHAR(200),
  time_taken                  TIMESTAMP,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_auth_id) REFERENCES public.vexamine_user_authority_info (id),
  FOREIGN KEY (question_id) REFERENCES public.vexamine_moodle_question_answer (id)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------