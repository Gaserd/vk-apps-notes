//localhost:8082
//'https://azshara-api.com'
const API = 'https://azshara-api.com'

export default store => {
    store.on('@init', () => {
        return { tasks : [] }
    })

    store.on('tasks/save', ({ tasks }, { tsks }) => {
        return { tasks : tsks }
    })

    store.on('tasks/search', ({ tasks }, strSearch) => {
        const search = strSearch.toLowerCase();
        return (strSearch.trim() == '') ? tasks : tasks.filter(({task}) => task.text.toLowerCase().indexOf(search) > -1);
    })

    store.on('tasks/api/get', ({ tasks }, { id }) => {
        fetch(`${API}/notes/${id}`)
        .then(res => res.json())
        .then(data => {
            let tsks = data.notes
            store.dispatch('tasks/save', { tsks })
        })
    })
  
    store.on('tasks/api/add', ({ tasks }, task) => {

        fetch(`${API}/add`, {
            method : 'POST',
            body : JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.id !== 'undefined') {
                task.id = data.id
                let tsks = tasks.concat([task])
                store.dispatch('tasks/save', { tsks })
            }
        })
    })

    store.on('tasks/api/delete', ({ tasks }, { task, user_id }) => {

        fetch(`${API}/delete`, {
            method : 'POST',
            body : JSON.stringify({
                id : task.id,
                user_id : user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        const id = task.id
        return { tasks: tasks.filter((task) => task.id !== id) }
    })

    store.on('tasks/api/edit', ({ tasks }, { task, user_id } ) => {

        fetch(`${API}/edit`, {
            method : 'POST',
            body : JSON.stringify({
                id : task.id,
                text : task.text,
                user_id : user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        let newTasks = tasks.map((tsk) => {
			if (tsk.id === task.id) {
				tsk = task
			}
			return tsk
		})
		return { tasks : newTasks }
    })
  }