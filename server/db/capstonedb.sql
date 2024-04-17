CREATE TABLE "survey_templates" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "survey_template_questions" (
  "id" SERIAL PRIMARY KEY,
  "question_id" integer,
  "survey_template_id" integer,
  "description" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "surveys" (
  "id" SERIAL PRIMARY KEY,
  "survey_template_id" integer,
  "surveyor_id" integer,
  "organization_id" integer,
  "project_id" integer,
  "surveyor_role_id" integer,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY, 
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "user_roles" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "role_id" integer,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "role_permissions" (
  "id" SERIAL PRIMARY KEY,
  "permission_id" integer,
  "role_id" integer,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "permissions" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "organizations" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "surveyor_roles" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question_type_id" integer,
  "question" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "question_types" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

CREATE TABLE "responses" (
  "id" SERIAL PRIMARY KEY,
  "question_id" integer,
  "survey_id" integer,
  "response" varchar,
  "created_at" timestamp,
  "created_by" integer,
  "updated_at" timestamp,
  "updated_by" integer,
  "deleted_at" timestamp,
  "deleted_by" integer
);

ALTER TABLE "survey_template_questions" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "survey_template_questions" ADD FOREIGN KEY ("survey_template_id") REFERENCES "survey_templates" ("id");

ALTER TABLE "surveys" ADD FOREIGN KEY ("survey_template_id") REFERENCES "survey_templates" ("id");

ALTER TABLE "surveys" ADD FOREIGN KEY ("surveyor_id") REFERENCES "users" ("id");

ALTER TABLE "surveys" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id");

ALTER TABLE "surveys" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "surveys" ADD FOREIGN KEY ("surveyor_role_id") REFERENCES "surveyor_roles" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("question_type_id") REFERENCES "question_types" ("id");

ALTER TABLE "responses" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "responses" ADD FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id");

ALTER TABLE "surveys"
ADD COLUMN "start_at" timestamp;

ALTER TABLE "surveys"
ADD COLUMN "end_at" timestamp;

ALTER TABLE "surveys"
ADD COLUMN "isActive" boolean DEFAULT false;





