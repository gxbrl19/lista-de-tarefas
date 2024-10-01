



const Main = {

    tasks: [],

    init: function () {
        this.cacheSelectors()
        this.getStoraged()
        this.buildTasks()
        this.bindEvents()
    },

    cacheSelectors: function () {
        this.$checkButton = document.querySelectorAll('.check')
        this.$inpuTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function () {
        const _self = this

        this.$checkButton.forEach(function (button) {
            button.onclick = _self.Events.CheckButton_click
        })

        this.$inpuTask.onkeypress = _self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function (button) {
            button.onclick = _self.Events.RemoveButton_click.bind(_self)
        })
    },

    getStoraged: function () {
        const tasks = localStorage.getItem('tasks')

        this.tasks = JSON.parse(tasks)
    },

    getTaskHtml: function (task) {
        return `
        <li>
            <div class="check"></div>
            <label class="task">
                ${task}
            </label>
            <button class="remove" data-task="${task}"></button>
        </li>
        `
    },

    buildTasks: function () {
        let html = ''
        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task)
        })

        this.$list.innerHTML = html

        this.cacheSelectors()
        this.bindEvents()
    },

    Events: {
        CheckButton_click: function (e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if (!isDone) { return li.classList.add('done') } //retorna da função com caso atenda a condição

            li.classList.remove('done')
        },

        inputTask_keypress: function (e) {
            const _key = e.key
            const _value = e.target.value

            if (_key === 'Enter') {
                this.$list.innerHTML += this.getTaskHtml(_value)

                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)

                const obj = [
                    { task: _value },
                    ...savedTasksObj, //joga todos os itens da variavel no objeto
                ]

                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        },

        RemoveButton_click: function (e) {
            const li = e.target.parentElement
            const value = e.target.dataset['task']

            const newTasksState = this.tasks.filter(item => item.task !== value)

            localStorage.setItem('tasks', JSON.stringify(newTasksState))

            li.classList.add('removed')

            setTimeout(() => {
                li.classList.add('hidden')
            }, 300);
        }
    }


}


Main.init()
























