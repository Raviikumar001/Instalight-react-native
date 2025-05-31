import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webHookSecrect = process.env.CLERK_WEBHOOK_SECRET;
    if (!webHookSecrect) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    //check headers
    const svix_id = request.headers.get("svix_id");
    const svix_signature = request.headers.get("svix_signature");
    const svix_timestamp = request.headers.get("svix-svix_timestamp");

    if (!svix_id || svix_signature || svix_timestamp) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webHookSecrect);

    let event: any;

    //verify the webhook
    try {
      event = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp!,
        "svix-signature": svix_signature!,
      }) as any;
    } catch (error) {
      console.log("Error verifying webhook", error);
      return new Response("Error occured", { status: 400 });
    }

    const eventType = event.type;
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = event.data;
      const email = email_addresses[0].email_addresses;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          email,
          fullname: name,
          image: image_url,
          clerkId: id,
          username: email.split("@")[0],
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});


export default http;