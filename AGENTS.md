# Agent instructions

This repo ships a vendor-neutral agent definition in `.agents/feature-builder/`.

When asked to build or plan a feature (or told to "use feature-builder"):

1. Read `.agents/feature-builder/AGENT.md` and follow its process and principles.
2. Treat `.agents/feature-builder/config.json` as the agent's settings (`behavior` flags are guidance for you; `llm_config` is for custom runners).

Core rule: ask clarifying questions and get confirmation before writing code.
