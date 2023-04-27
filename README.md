# Odoo Timesheet Webpage

This is a single-page web application developed using Vue.js for tracking time and booking it on specific tasks or tickets in Odoo. The application is designed to simplify the time tracking process for users, allowing them to enter a 4-digit ID instead of a username and password.

## Features

- Users enter a 4-digit ID to log in. This ID comes from his user-profile. User must have Portal access.
- Start and stop the clock to track time
- Book time on specific projects and tasks, or helpdesk teams and tickets
- Single-page application for improved usability

## Setup and Installation

1. Make sure you have Node.js (>= 12.x) and npm (>= 6.x) installed on your system.
2. Clone this repository using `git clone https://github.com/your-username/odoo-timesheet-webpage.git`.
3. Navigate to the project directory `cd odoo-timesheet-webpage`.
4. Install the dependencies using `npm install`.
5. Start the development server using `npm run serve`.

The application should now be running on `http://localhost:8080/` (or the next available port).

## Usage

1. Enter your 4-digit ID in the User Identification section.
2. Start the clock by clicking the "Start Clock" button.
3. Stop the clock by clicking the "Stop Clock" button.
4. Allocate the recorded time to a project and task, or a helpdesk team and ticket using the dropdown menus.
5. Click the "Book Time" button to save the time allocation.

## Future Enhancements

- Evolve the application into a Progressive Web App (PWA).
- Implement notifications or vibrations to remind users to stop the clock.

## Contributions

Please follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes to the new branch.
4. Push the changes to your forked repository.
5. Create a pull request for review and integration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
