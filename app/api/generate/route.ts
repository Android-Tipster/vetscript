import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patientName,
      species,
      breed,
      age,
      sex,
      weight,
      ownerName,
      chiefComplaint,
      examNotes,
    } = body;

    if (!examNotes || !chiefComplaint) {
      return NextResponse.json(
        { error: "Chief complaint and exam notes are required." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert veterinary medical scribe. You produce two outputs from a vet's rough exam notes:
1. A formal SOAP note (Subjective, Objective, Assessment, Plan) formatted for a veterinary medical record.
2. A plain-language discharge summary written directly to the pet owner — warm, clear, no jargon. 3-4 short paragraphs. Must include: what we found, what it means, what to do at home, when to come back.

Respond ONLY with a valid JSON object in this exact format (no markdown, no code fences):
{
  "soap": {
    "subjective": "...",
    "objective": "...",
    "assessment": "...",
    "plan": "..."
  },
  "discharge": "..."
}`;

    const userPrompt = `Patient: ${patientName || "Unknown"}, ${species || "Dog"}, ${breed || "Mixed"}, ${age || "Unknown"} years old, ${sex || "Unknown"}, ${weight ? weight + " kg" : "weight not recorded"}.
Owner: ${ownerName || "Owner"}.
Chief Complaint: ${chiefComplaint}.
Vet's Exam Notes: ${examNotes}`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: userPrompt }],
      system: systemPrompt,
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    // Strip markdown code fences if model wraps output
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
