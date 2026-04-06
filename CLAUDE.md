# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IRCC Pre-Check** — An AI-powered pre-submission audit tool that analyzes documents and IRCC portal screenshots to predict rejection risks for Canadian immigration applications (Express Entry, study permits, etc.).

Core user flow: checklist → document/screenshot upload → OCR + rules engine → risk score + fix recommendations.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm start        # Run production build
```

No test runner or linter is configured yet.

## Architecture

**Stack:** Next.js 14 (App Router), React 18, TypeScript 5, Tailwind CSS 3.

**Current state:** MVP scaffold — theme toggle UI only. Core features (upload, OCR, rules engine) are not yet implemented.

### Planned Architecture (from plan.md)

- **Frontend:** Next.js App Router (`/app` directory)
- **Backend:** Node.js API routes
- **OCR Layer:** Google Vision API or AWS Textract — extracts structured data from PDF/JPG/PNG uploads and IRCC portal screenshots
- **Parsing Layer:** Screenshot parser to detect IRCC UI patterns and extract form fields
- **Rules Engine:** JSON-based rule system covering document rules, form validation rules, and cross-source consistency rules
- **Storage:** Temporary encrypted storage, auto-delete after processing

### Key Features to Build

1. Document & screenshot upload + auto-classification
2. Completeness check (missing docs, unfilled form sections)
3. Consistency engine — cross-checks names, dates, employment history across documents and form screenshots
4. Form error detection from IRCC screenshots
5. Rejection risk scoring (High/Medium/Low) with composite readiness score (0–100)
6. Fix recommendations

### App Router Structure

```
app/
  layout.tsx    # Root layout, metadata, hydration suppression for dark mode
  page.tsx      # Home page (Client Component) — currently theme toggle only
  globals.css   # Tailwind directives
```

### Tailwind Configuration

Dark mode uses the `class` strategy — toggled at the `document.documentElement` level. Theme preference is persisted in `localStorage` with `prefers-color-scheme` as fallback. The `suppressHydrationWarning` prop is set on `<html>` in `layout.tsx` to prevent mismatch.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).
