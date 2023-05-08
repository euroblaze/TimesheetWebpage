odoo.define('web_timesheet_page.employee_timesheet', function(require) {
    "use strict";
    var publicWidget = require('web.public.widget');
    const Dialog = require('web.Dialog');
    var rpc = require('web.rpc');
    const {
        _t,
        qweb
    } = require('web.core');
    const ajax = require('web.ajax');

    var timer_interval;
    var start_time = 0;
    var end_time = 0;
    var elapsed_time = timer_interval;


    publicWidget.registry.employeeTimesheetDetails = publicWidget.Widget.extend({
        selector: '.o_employee_timesheet_details',
        events: {
            'click #project_radio': '_getProjects',
            'click #helpdesk_radio': '_getTickets',
            'click #start': '_startTimer',
            'click #stop': '_stopTimer',
            'click #select_project': '_getProjectTasks',
            'change #employee_code': '_changeEmployee',
        },

        _getProjectTasks: function(ev) {
            var projectSelect = document.querySelector('select[name="project_id"]');
            var selectedProjectId = projectSelect.value;
            ajax.jsonRpc('/get_project_data', 'call', {
                'project_id': parseInt(selectedProjectId),
            }).then(function(result) {
                $("#select_task").empty();
                $.each(result, function(index, value) {
                    $('#select_task').append($('<option>', {
                        value: value["id"],
                        text: value["name"],
                    }).attr('data-project_id', value['project_id']));
                });
            });
        },

        _changeEmployee: function(ev) {
            var employeeCode = document.getElementById('employee_code').value;
            ajax.jsonRpc('/check_employee_code', 'call', {
                'employee_code': parseInt(employeeCode),
            }).then(function(result) {
                if (!result) {
                    $("#icon_cross").css("display", "contents");
                    $('#start').prop('disabled', true);
                } else {
                    $("#icon_cross").css("display", "none");
                    $('#start').prop('disabled', false);
                }
            });
        },

        _startTimer: function(ev) {
            var projectSelect = document.querySelector('select[name="project_id"]');
            var selectedProjectId = projectSelect.value;
            var ticketSelect = document.querySelector('select[name="ticket_id"]');
            var selectedTicketId = ticketSelect.value;
            var taskType = document.querySelectorAll('input[name="task_type"]');
            for (var i = 0; i < taskType.length; i++) {
                if (taskType[i].checked) {
                    var selectedTaskType = taskType[i].value;
                    break;
                }
            }
            if (selectedTaskType == 'project') {
                if (!selectedProjectId) {
                    alert('Please first select the project')
                } else {
                    start_time = new Date().getTime();
                    $('#start').prop('disabled', true);
                    $('#stop').prop('disabled', false);
                    timer_interval = setInterval(function() {
                        elapsed_time = new Date().getTime() - start_time;
                        var hours = Math.floor((elapsed_time / (1000 * 60 * 60)) % 24);
                        var minutes = Math.floor((elapsed_time / (1000 * 60)) % 60);
                        var seconds = Math.floor((elapsed_time / 1000) % 60);
                        var display_time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                        $('#timer').text(display_time);
                    }, 1000);
                }
            } else if (selectedTaskType == 'helpdesk') {
                if (!selectedTicketId) {
                    alert('Please first select the ticket')
                } else {
                    start_time = new Date().getTime();
                    $('#start').prop('disabled', true);
                    $('#stop').prop('disabled', false);
                    timer_interval = setInterval(function() {
                        elapsed_time = new Date().getTime() - start_time;
                        var hours = Math.floor((elapsed_time / (1000 * 60 * 60)) % 24);
                        var minutes = Math.floor((elapsed_time / (1000 * 60)) % 60);
                        var seconds = Math.floor((elapsed_time / 1000) % 60);
                        var display_time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                        $('#timer').text(display_time);
                    }, 1000);
                }
            }
        },

        _stopTimer: function(ev) {
            end_time = new Date().getTime();
            $('#start').prop('disabled', false);
            $('#stop').prop('disabled', true);

            clearInterval(timer_interval);
            elapsed_time = end_time - start_time;
            var hours = Math.floor((elapsed_time / (1000 * 60 * 60)) % 24);
            var minutes = Math.floor((elapsed_time / (1000 * 60)) % 60);
            var seconds = Math.floor((elapsed_time / 1000) % 60);
            var display_time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            $('#timer').text(display_time);
            var employeeCode = document.getElementById('employee_code').value;
            var description = document.getElementById('description').value;
            var taskType = document.querySelectorAll('input[name="task_type"]');
            for (var i = 0; i < taskType.length; i++) {
                if (taskType[i].checked) {
                    var selectedTaskType = taskType[i].value;
                    break;
                }
            }
            var taskSelect = document.querySelector('select[name="task_id"]');
            var selectedTaskId = taskSelect.value;
            var ticketSelect = document.querySelector('select[name="ticket_id"]');
            var selectedTicketId = ticketSelect.value;
            var url = "/create_timesheet?employee_code=" + employeeCode + "&description=" + description + "&task_type=" + selectedTaskType + "&ticket_id=" + selectedTicketId + "&task_id=" + selectedTaskId + "&timer=" + display_time;
            window.location.href = url;

        },

        _getProjects: function(ev) {
            $('#projects_id').show();
            $('#tasks_id').show();
            $('#tickets_id').hide();
        },

        _getTickets: function(ev) {
            $('#projects_id').hide();
            $('#tasks_id').hide();
            $('#tickets_id').show();
        },

    });
});