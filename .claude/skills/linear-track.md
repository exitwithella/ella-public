# Linear Project Tracking

**Skill name:** `linear-track`
**User-invocable:** Yes — triggered by `/linear-track` or automatically when entering plan mode for implementation work.

## Purpose

Ensures all planning and implementation work is tracked in the MKT team on Linear. Every plan becomes a Linear project, every implementation step becomes an issue, and decisions/tradeoffs are captured as comments and documents.

## When This Skill Activates

This skill is **mandatory** whenever:

1. You create an implementation plan (entering plan mode)
2. You begin working on a multi-step task
3. The user explicitly invokes `/linear-track`

## Linear Workspace Context

- **Team:** MKT (Public Site) — ID: `b3b0de7e-ed9d-42c0-8a0f-7433f6978882`
- **Statuses:** Backlog → Ready → In Progress → Done (also: Canceled, Duplicate)
- **Labels:** Bug, Feature, Improvement

## Workflow

### 1. Create a Project for the Plan

When starting a new plan or body of work:

```
Use mcp__claude_ai_Linear__save_project to create a project:
- name: Descriptive name matching the plan (e.g., "Homepage Build", "CMS Schema Setup")
- team: "MKT"
- description: Brief summary of the plan's goals and scope (Markdown)
- state: "started"
```

### 2. Create a Plan Document

Attach the full plan as a Linear document on the project:

```
Use mcp__claude_ai_Linear__create_document:
- title: "Plan: [project name]"
- project: [project ID from step 1]
- content: Full plan in Markdown — objectives, approach, file changes, acceptance criteria
```

### 3. Create Issues for Each Implementation Step

For every discrete step in the plan:

```
Use mcp__claude_ai_Linear__create_issue:
- title: Clear, actionable title (imperative form, e.g., "Add hero section component")
- team: "MKT"
- project: [project ID]
- description: What needs to happen, which files are affected, acceptance criteria
- state: "Ready" (or "Backlog" if not immediately actionable)
- labels: ["Feature"], ["Bug"], or ["Improvement"] as appropriate
- priority: 2 (High) for critical path, 3 (Normal) for standard, 4 (Low) for nice-to-have
```

Set up issue dependencies using `blockedBy` and `blocks` when steps have ordering constraints.

### 4. Track Progress

As you work on each issue:

- Set status to **"In Progress"** when starting work (use `mcp__claude_ai_Linear__update_issue`)
- Set status to **"Done"** when the step is complete
- If blocked, add a comment explaining the blocker

### 5. Add Comments for Decisions and Tradeoffs

Whenever you make a meaningful decision, encounter a tradeoff, or discover useful information during implementation:

```
Use mcp__claude_ai_Linear__create_comment:
- issueId: The relevant issue
- body: Markdown explaining:
  - What decision was made and why
  - What alternatives were considered
  - Any tradeoffs or risks accepted
  - Links to relevant files, docs, or references
```

**Comment on decisions like:**

- Choosing one Oatmeal component over another
- Deviating from a planning doc (and why)
- Performance tradeoffs
- Accessibility considerations
- Design brief interpretation choices

### 6. Update Project Status

When a plan is complete or at major milestones:

```
Use mcp__claude_ai_Linear__save_status_update:
- type: "project"
- id: [project ID]
- body: Summary of what was accomplished
- status: "onTrack", "atRisk", or "offTrack"
```

## Naming Conventions

- **Projects:** Match the plan scope — `Homepage Build`, `Platform Page`, `CMS Schema v2`
- **Issues:** Imperative, specific — `Add 3-pillar card grid`, `Configure Termina font loading`, `Fix mobile nav layout shift`
- **Documents:** Prefixed — `Plan: Homepage Build`, `Decision Log: Font Loading Strategy`

## Example Flow

User asks: "Build the homepage hero section"

1. Create project: "Homepage Hero Section"
2. Create plan document with approach, files to modify, component choices
3. Create issues:
   - MKT-1: "Set up hero section component structure" (Feature, High)
   - MKT-2: "Add Termina headline with responsive sizing" (Feature, Normal, blockedBy: MKT-1)
   - MKT-3: "Implement dual-CTA button group" (Feature, Normal, blockedBy: MKT-1)
   - MKT-4: "Add hero background with warm cream palette" (Feature, Normal, blockedBy: MKT-1)
   - MKT-5: "Mobile responsive adjustments" (Feature, Normal, blockedBy: MKT-2, MKT-3)
4. Work through issues, updating status and adding comments as you go
5. Update project status when complete
