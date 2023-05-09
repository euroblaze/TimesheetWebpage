# -*- coding: utf-8 -*-
{
	"name": "Website Timesheet Page",
	"author": "Ensigncode",
	"version": "15.0.1.0.0",
	'summary': 'Fill up timesheet from website',
	"description": """
        In the module, you can fill up the timesheet very quickly from the website
            - Just specify the project/helpdesk based on your needs, and fill up the once you stop the timer.
    """,
	"license": "LGPL-3",
	"depends": ['base', 'website', 'hr', 'project', 'helpdesk', 'helpdesk_timesheet'],
	"data": [
		'views/res_users_views.xml',
		'views/hr_employee_views.xml',
		'views/template.xml',
		'views/website_page_menu.xml',
	],
	'assets': {
		'web.assets_frontend': [
			'web_timesheet_page/static/src/js/employee_timesheet.js',
		],
	},
	"auto_install": False,
	"installable": True,
	"category": "HR",

}
