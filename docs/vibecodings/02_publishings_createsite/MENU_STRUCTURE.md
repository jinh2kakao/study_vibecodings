# Menu Structure

This document outlines the menu structure for both the front-end and admin sections of the AI Novel Maker website.

## 1. Front-end (User-facing)

The main navigation is handled via a sidebar.

- **[Dashboard] (`index.html`)**
  - Displays user's projects.
  - Entry point after login.

- **[Agent Management] (`orchestra.html`)**
  - Manage and orchestrate AI agents.

- **[Templates] (`templates.html`)**
  - Browse and use pre-built agent templates.

- **[Settings] (`settings.html`)**
  - Contains sub-menus for managing user settings:
    - Subscription Management
    - Billing Management
    - API Key Management
    - Account Settings

- **[My Page] (`mypage.html`)**
  - User profile page.
  
- **[Pro Plan] (`pro-plan.html`)**
  - Page detailing the Pro subscription plan.

- **[Output Detail] (`output-detail.html`)**
  - Not a primary menu item, but a detail page accessed from the dashboard to view project outputs.

---

## 2. Admin Panel

The admin panel is for internal management of the application. The structure is inferred from the filenames.

- **[Admin Dashboard] (`admin.html`)**
  - Overview and entry point for administrators.

- **[User Management] (`admin-users.html`)**
  - View and manage user accounts.

- **[Template Management] (`admin-templates.html`)**
  - Create, edit, and manage agent templates for the public library.

- **[System Management] (`admin-system.html`)**
  - General system-wide settings and configurations.

- **[Admin Settings] (`admin-settings.html`)**
  - Specific settings related to the admin panel itself.
