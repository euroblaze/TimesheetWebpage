# Odoo Timesheet Webpage Specification

## Overview

This document outlines the specifications for a webpage that allows users to update their time sheets in Odoo using a simple and convenient interface.

## Usability

- Users enter a four-digit ID saved on their user profile, instead of a username and password.
- Users can start and stop the clock by clicking on corresponding icons.
- Users can book the recorded time on a specific project and task or a specific helpdesk team and ticket.
- All actions must be performed on a single page without browsing.

## Future Enhancements

- The page will be evolved into a Progressive Web App (PWA).
- Users will receive notifications or vibrations if they forget to stop the clock.

## Integration with Odoo

- Times can be seen and corrected in the timesheets module in the Odoo backend.
- The module is required for Odoo version 15 and must be written according to OCA guidelines.

## Code Management

- Code is managed on GitHub.
- The programmer will submit a pull request for code review and integration.
- Write clean, modular, and reusable code following OCA guidelines.
- Include comments and documentation for easy maintenance and extension.

## Endpoints (example)

- POST `/api/start_clock`
- POST `/api/stop_clock`
- POST `/api/book_time`

## Technical Requirements

- ~Use Odoo Portals as a base for the web application.~
- Implement necessary security measures to protect user data.
- Perform input validation to ensure only valid four-digit IDs are accepted.
- Use AJAX (see the vue.js file Timesheet.vue) for seamless user experience without page reloads.
- Use Bootstrap or similar CSS framework for responsive design.
- Use clear and concise error messages for better user experience.
