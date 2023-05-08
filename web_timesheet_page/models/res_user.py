# -*- coding: utf-8 -*-
from odoo import fields, api, models, _


class ResUsers(models.Model):
	_inherit = 'res.users'

	employee_code = fields.Integer('Employee Code')


