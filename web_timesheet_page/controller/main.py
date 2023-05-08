# -*- coding: utf-8 -*-

from odoo import fields, http, _
from odoo.http import request


class TimesheetController(http.Controller):

	@http.route('/check_employee_code', type='json', auth='public')
	def check_employee_code(self, employee_code):
		return request.env['hr.employee'].sudo().check_employee_code(employee_code)

	@http.route('/get_project_data', type='json', auth='public')
	def get_project_data(self, project_id):
		return request.env['project.task'].sudo().search_read([('project_id', '=', project_id)])

	@http.route('/create_timesheet', type='http', auth="public", methods=['GET', 'POST'], website=True)
	def create_timesheet_task_ticket(self, **kw):
		employee = request.env['hr.employee'].sudo().search([('employee_code', '=', kw.get('employee_code'))]) if kw.get('employee_code') else None
		ticket = request.env['helpdesk.ticket'].sudo().search([('id', '=', int(kw.get('ticket_id')))]) if kw.get('ticket_id') else None
		task = request.env['project.task'].sudo().search([('id', '=', int(kw.get('task_id')))]) if kw.get('task_id') else None
		hours, minutes, seconds = kw.get('timer').split(":")
		total_seconds = int(hours) * 3600 + int(minutes) * 60 + int(seconds)
		line_dict = {'project_id': ticket.project_id.id,'helpdesk_ticket_id': ticket.id} if ticket else {'project_id': task.project_id.id,'task_id': task.id} if task else {}
		if employee and line_dict:
			line_dict.update({
				'name': kw.get('description') or '',
				'unit_amount': float(total_seconds) / 3600.0,
			})
			request.env['account.analytic.line'].sudo().create(line_dict)
			return request.redirect('/timesheet_success_page')
		return request.redirect('/timesheet_fail')

	@http.route('/timesheet_success_page', type='http', auth="public", website=True)
	def timesheet_success_redirect(self, **kw):
		return request.render("web_timesheet_page.timesheet_success")

	@http.route('/timesheet_fail', type='http', auth="public", website=True)
	def timesheet_failure_redirect(self, **kw):
		return request.render("web_timesheet_page.timesheet_fail")
