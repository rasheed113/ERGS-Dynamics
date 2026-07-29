# ERGS Dynamics Website

## ARCHITECTURE.md

Version: DFD-3 Foundation v1.0

---

# Purpose

This document defines the software architecture of the ERGS Dynamics Website.

Its purpose is to ensure that the project remains scalable, maintainable, and easy to understand as it grows over the coming years.

---

# Architecture Philosophy

The architecture must prioritise:

- Simplicity
- Maintainability
- Scalability
- Modularity
- Readability
- Reusability

Every architectural decision should reduce complexity rather than increase it.

---

# Core Principles

## 1. Modular Structure

Every major responsibility belongs to its own module.

---

## 2. Separation of Concerns

HTML defines structure.

CSS defines presentation.

JavaScript defines behaviour.

No layer should take responsibility for another.

---

## 3. Single Responsibility

Each file, folder, component, and module should have one primary responsibility.

When responsibilities begin to overlap, the architecture should be refined instead of expanding existing files indefinitely.


---

# Production Architecture v1.1

## Project Structure

The production website structure follows a modular architecture designed for long-term maintenance and scalability.

---

# Folder Responsibilities

## pages/

Contains independent website pages.

Each page has a clear purpose and avoids creating one oversized HTML file.

---

## css/

Contains all styling logic.

Each stylesheet has a single responsibility:

- variables.css → design tokens
- reset.css → browser consistency
- layout.css → page structure
- components.css → reusable UI components
- responsive.css → device adaptation

---

## js/

Contains website behaviour.

JavaScript functionality is separated into focused modules to make debugging and future replacement easier.

---

## assets/

Contains static resources:

- Images
- Icons
- Fonts

---

# Architecture Goal

The structure must allow future engineers to add features, pages, and improvements without creating unnecessary complexity.

