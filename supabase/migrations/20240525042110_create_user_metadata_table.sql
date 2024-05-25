create table "public"."user_metadata" (
    "user_id" uuid not null default auth.uid(),
    "block_no" text not null,
    "unit_no" text not null,
    "name" text not null,
    "preferences" text[] not null default '{}'::text[]
);


alter table "public"."user_metadata" enable row level security;

CREATE UNIQUE INDEX user_metadata_pkey ON public.user_metadata USING btree (user_id);

alter table "public"."user_metadata" add constraint "user_metadata_pkey" PRIMARY KEY using index "user_metadata_pkey";

grant delete on table "public"."user_metadata" to "anon";

grant insert on table "public"."user_metadata" to "anon";

grant references on table "public"."user_metadata" to "anon";

grant select on table "public"."user_metadata" to "anon";

grant trigger on table "public"."user_metadata" to "anon";

grant truncate on table "public"."user_metadata" to "anon";

grant update on table "public"."user_metadata" to "anon";

grant delete on table "public"."user_metadata" to "authenticated";

grant insert on table "public"."user_metadata" to "authenticated";

grant references on table "public"."user_metadata" to "authenticated";

grant select on table "public"."user_metadata" to "authenticated";

grant trigger on table "public"."user_metadata" to "authenticated";

grant truncate on table "public"."user_metadata" to "authenticated";

grant update on table "public"."user_metadata" to "authenticated";

grant delete on table "public"."user_metadata" to "service_role";

grant insert on table "public"."user_metadata" to "service_role";

grant references on table "public"."user_metadata" to "service_role";

grant select on table "public"."user_metadata" to "service_role";

grant trigger on table "public"."user_metadata" to "service_role";

grant truncate on table "public"."user_metadata" to "service_role";

grant update on table "public"."user_metadata" to "service_role";

create policy "Enable read access for all users"
on "public"."user_metadata"
as permissive
for select
to public
using (true);
