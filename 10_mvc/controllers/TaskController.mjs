import Task from "../models/Task.mjs"

export default class TaskController {
    static createTask(req, res){
        res.render('tasks/create');
    }

    static async showTasks(req, res){

        const tasks = await Task.findAll({raw: true})

        res.render('tasks/all', {tasks});
    }

    static async createTaskSave(req, res){
        const task = {
            title: req.body.title,
            description:  req.body.description,
            done: false
        }

        await Task.create(task);
        res.redirect('/tasks')
    }
}