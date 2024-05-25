create table "public"."help_request" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid not null default auth.uid(),
    "title" text not null,
    "body" text not null,
    "themes" text[] not null default '{}'::text[]
);


alter table "public"."help_request" enable row level security;

CREATE UNIQUE INDEX help_request_pkey ON public.help_request USING btree (id);

alter table "public"."help_request" add constraint "help_request_pkey" PRIMARY KEY using index "help_request_pkey";

alter table "public"."help_request" add constraint "help_request_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."help_request" validate constraint "help_request_created_by_fkey";

grant delete on table "public"."help_request" to "anon";

grant insert on table "public"."help_request" to "anon";

grant references on table "public"."help_request" to "anon";

grant select on table "public"."help_request" to "anon";

grant trigger on table "public"."help_request" to "anon";

grant truncate on table "public"."help_request" to "anon";

grant update on table "public"."help_request" to "anon";

grant delete on table "public"."help_request" to "authenticated";

grant insert on table "public"."help_request" to "authenticated";

grant references on table "public"."help_request" to "authenticated";

grant select on table "public"."help_request" to "authenticated";

grant trigger on table "public"."help_request" to "authenticated";

grant truncate on table "public"."help_request" to "authenticated";

grant update on table "public"."help_request" to "authenticated";

grant delete on table "public"."help_request" to "service_role";

grant insert on table "public"."help_request" to "service_role";

grant references on table "public"."help_request" to "service_role";

grant select on table "public"."help_request" to "service_role";

grant trigger on table "public"."help_request" to "service_role";

grant truncate on table "public"."help_request" to "service_role";

grant update on table "public"."help_request" to "service_role";

create policy "Allow user to delete their own request"
on "public"."help_request"
as permissive
for delete
to public
using ((auth.uid() = created_by));


create policy "Allow user to insert as themself"
on "public"."help_request"
as permissive
for insert
to authenticated
with check ((auth.uid() = created_by));


create policy "Allow user to update their own request"
on "public"."help_request"
as permissive
for select
to public
using ((auth.uid() = created_by));


create policy "Enable read access for all users"
on "public"."help_request"
as permissive
for select
to public
using (true);



