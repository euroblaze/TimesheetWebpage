<template>
  <div id="app">
    <h1>Odoo Timesheet Webpage</h1>

    <div>
      <h2>User Identification</h2>
      <label for="userId">Enter your 4-digit ID:</label>
      <input type="text" id="userId" v-model="userId" @input="validateUserId" />
      <p v-if="!validUserId" class="error">Invalid User ID. Please enter a 4-digit number.</p>
    </div>

    <div>
      <h2>Time Tracking</h2>
      <button @click="startClock" :disabled="!validUserId || clockRunning">Start Clock</button>
      <button @click="stopClock" :disabled="!validUserId || !clockRunning">Stop Clock</button>
    </div>

    <div>
      <h2>Time Allocation</h2>
      <label for="project">Project:</label>
      <select id="project" v-model="selectedProject">
        <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
      </select>
      <label for="task">Task:</label>
      <select id="task" v-model="selectedTask">
        <option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.name }}</option>
      </select>
      <label for="helpdeskTeam">Helpdesk Team:</label>
      <select id="helpdeskTeam" v-model="selectedHelpdeskTeam">
        <option v-for="team in helpdeskTeams" :key="team.id" :value="team.id">{{ team.name }}</option>
      </select>
      <label for="ticket">Ticket:</label>
      <select id="ticket" v-model="selectedTicket">
        <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">{{ ticket.name }}</option>
      </select>
    </div>

    <div>
      <h2>Actions</h2>
      <button @click="bookTime" :disabled="!validUserId || clockRunning">Book Time</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      validUserId: false,
      clockRunning: false,
      selectedProject: '',
      selectedTask: '',
      selectedHelpdeskTeam: '',
      selectedTicket: '',
      projects: [
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
        { id: 3, name: 'Project C' },
      ],
      tasks: [
        { id: 1, name: 'Task A' },
        { id: 2, name: 'Task B' },
        { id: 3, name: 'Task C' },
      ],
      helpdeskTeams: [
        { id: 1, name: 'Helpdesk Team A' },
        { id: 2, name: 'Helpdesk Team B' },
        { id: 3, name: 'Helpdesk Team C' },
      ],
      tickets: [
        { id: 1, name: 'Ticket A' },
        { id: 2, name: 'Ticket B' },
        { id: 3, name: 'Ticket C' },
     
