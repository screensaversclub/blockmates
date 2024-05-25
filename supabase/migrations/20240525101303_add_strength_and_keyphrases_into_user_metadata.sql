alter table "public"."user_metadata" add column "strengths" text not null default '''none for now''::text'::text;

alter table "public"."user_metadata" add column "strengths_keyphrases" text[] not null default '{}'::text[];


