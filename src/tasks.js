export default store => {
    store.on('@init', () => ({ tasks: [ 
            {	
                id : 1,
                name : 'Домашнее задание',
                text : 'Сделать математику к школе'
            },
            {
                id : 2,
                name : 'Выпить воду',
                text : 'Буду пить воду каждый час'
            },
            {
                id : 3,
                name : 'Написать Васе',
                text : 'Надо написать Васе, чтобы он написал Свете'
            }
        ] 
    }))
  
    store.on('tasks/add', ({ tasks }, task) => {
        task.id = tasks.length + 1
        return { tasks: tasks.concat([task]) }
    })

    store.on('tasks/delete', ({ tasks }, id) => {
        return { tasks: tasks.filter((task) => task.id !== id) }
    })

    store.on('tasks/edit', ({ tasks }, editTask ) => {
        let newTasks = tasks.map((task) => {
			if (task.id === editTask.id) {
				task = editTask
			}
			return task
		})
		return { tasks : newTasks }
    })
  }