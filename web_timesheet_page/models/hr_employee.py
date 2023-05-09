# -*- coding: utf-8 -*-
from odoo import fields, api, models, _


class HrEmployee(models.Model):
	_inherit = 'hr.employee'

	employee_code = fields.Integer('Employee Code', related="user_id.employee_code", readonly=False)

	@api.model
	def check_employee_code(self, employee_code):
		return True if self.sudo().search([('employee_code', '=', employee_code)], limit=1) else False

