# VetScript — AI Clinical Notes for Veterinarians

Turn rough exam notes into complete SOAP notes + owner discharge summaries in seconds. Unique feature: **one-click ElevenLabs audio discharge summary** — send an MP3 to the pet owner before they leave the parking lot.

## What it does

1. **Input**: Patient details + rough exam notes (abbreviated, messy, how vets actually think)
2. **Output 1**: Structured SOAP note (Subjective / Objective / Assessment / Plan) ready for your PMS
3. **Output 2**: Plain-language owner discharge summary — warm, jargon-free, actionable
4. **Output 3**: ElevenLabs voice audio of the discharge summary — download as MP3 and text to owner

## The problem it solves

Vets spend 20-40 minutes per day on documentation. SOAP notes and discharge summaries are formulaic but painful. VetScript makes 25-minute tasks take 60 seconds.

## Tech stack

- Next.js 15 / React 19 / Tailwind CSS v4
- Claude Haiku (via `@anthropic-ai/sdk`) — SOAP note + discharge generation
- ElevenLabs TTS (`eleven_turbo_v2_5`) — voice discharge audio
- Vercel-ready (one-click deploy)

## Getting started

```bash
npm install
cp .env.local.example .env.local
# Fill in your API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Import repo at vercel.com
3. Set environment variables:
   - `ANTHROPIC_API_KEY`
   - `ELEVENLABS_API_KEY`
   - `ELEVENLABS_VOICE_ID` (default: `nPczCjzI2devNBz1zQrb`)
4. Deploy

## Pricing model

| Plan | Price | Notes |
|---|---|---|
| Starter | Free | 10 notes/month, no audio |
| Solo Vet | $79/month | Unlimited notes + audio |
| Clinic | $199/month | Up to 8 vets + PMS export |

## Revenue path

- Replace CTA button with Stripe payment link ($79/month Solo Vet)
- Add Stripe billing + auth middleware to gate `/api/generate` behind subscription
- Upsells: EHR/PMS integrations, custom clinic voice, bulk export

## Why vets?

- Practice management software (Cornerstone, EzyVet, ezyVet) costs $300-800/month and barely does AI
- Average vet clinic has 2-4 vets — $160-600/month ARR per clinic at Solo pricing
- Zero meaningful AI-native competition in vet documentation specifically
- High willingness to pay (software is already a line item in every clinic's budget)
