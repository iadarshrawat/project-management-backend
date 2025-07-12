## PROJECT MANAGEMENT (Backend) 

[![CircleCI](https://img.shields.io/circleci/project/github/your-org/project-management-backend.svg)](https://circleci.com/gh/your-org/project-management-backend)

Project Management is a backend service that allows creation and management of boards and tasks for team-based projects.

## Features

- Create and manage boards (e.g., Marketing, Engineering)
- Add, update, delete tasks with title, description, priority, and due date
- Organize tasks into columns (To Do, In Progress, Done)
- Supports drag-and-drop task movement across columns
- Provides REST API for frontend consumption

The app demonstrates how cleanly separated backend logic can scale project collaboration tools effectively.

## Requirements

* Node 14+
* Git
* MongoDB (for storing project and task data)
* Postman (optional, for API testing)

## Common setup

Clone the repo and install the dependencies.

```bash
git clone git@github.com:your-org/project-management-backend.git
cd project-management-backend
npm install
```


## Steps for read-only access

To start the express server, run the following

 ```bash
npm run watch
```


## Frontend Repository
* You can find the frontend repo here:
 https://github.com/iadarshrawat/project-management-frontend

* Live Demo
 Live App: https://project-management-frontend1.netlify.app/

* YouTube Demo
 Watch Demo: https://youtu.be/MROo4RDN8tk