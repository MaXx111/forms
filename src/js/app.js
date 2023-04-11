import Popover from './popover.js';
import TaskList from './taskList.js';

const button = document.querySelector('.btn');
const popover = new Popover(button);

const taskList = document.querySelector('.taskList');
const taskListClass = new TaskList(taskList);

taskListClass.init();
