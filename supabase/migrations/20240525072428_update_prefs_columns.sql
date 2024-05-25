alter table "public"."user_metadata" add column "preferences_keyphrases" text[] not null default '{}'::text[];

alter table "public"."user_metadata" alter column "preferences" set default ''::text;

alter table "public"."user_metadata" alter column "preferences" drop not null;

alter table "public"."user_metadata" alter column "preferences" set data type text using "preferences"::text;


