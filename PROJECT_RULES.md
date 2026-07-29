# ERGS Dynamics Website

## PROJECT_RULES.md

Version: DFD-3 Foundation v1.0

---

# Purpose

This document defines the engineering rules that govern the development of the ERGS Dynamics Website.

Every contributor, feature, component, and document must follow these rules to ensure the project remains understandable, maintainable, and expandable for many years.

---

# Engineering Commitment

Our goal is not simply to complete the website.

Our goal is to build a codebase and documentation that an engineer can open 5–10 years from now, understand quickly, maintain confidently, and expand without fear of breaking the architecture.

Long-term quality always takes priority over short-term speed.

---

# Rule 1 — Production Code Only

Every line of code committed to this project must be production-quality.

No experimental code shall remain in the project.

---

# Rule 2 — No Dummy Code

Dummy code, fake implementations, placeholder logic, and temporary workarounds are not permitted.

Every implementation must solve a real engineering requirement.


---

# Rule 3 — Real Development Only

Every feature implemented in this project must serve a real business or engineering purpose.

No code shall exist solely for demonstration, temporary testing, or artificial examples.

---

# Rule 4 — No Temporary Solutions

Temporary fixes that compromise architecture are prohibited.

If a proper solution requires additional engineering effort, that effort should be invested instead of introducing technical debt.

---

# Rule 5 — Small, Focused Files

Files should remain small and focused on a single responsibility.

Large files increase maintenance costs, slow debugging, and make future expansion more difficult.

Whenever practical, functionality should be divided into clear, reusable modules.

