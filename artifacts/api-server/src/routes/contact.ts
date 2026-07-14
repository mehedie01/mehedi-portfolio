import { Router, type IRouter } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import {
  CreateContactMessageBody,
  CreateContactMessageResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact-messages", async (req, res): Promise<void> => {
  const parsed = CreateContactMessageBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact message");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [contactMessage] = await db
    .insert(contactMessagesTable)
    .values(parsed.data)
    .returning();

  req.log.info({ id: contactMessage.id }, "Contact message received");
  res.status(201).json(CreateContactMessageResponse.parse(contactMessage));
});

export default router;
