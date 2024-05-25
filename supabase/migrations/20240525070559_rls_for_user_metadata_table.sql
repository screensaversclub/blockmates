create policy "Enable insert for authenticated users only"
on "public"."user_metadata"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable update for users based on user_id"
on "public"."user_metadata"
as permissive
for update
to public
using ((auth.uid() = user_id));