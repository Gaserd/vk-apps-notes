import React from 'react'
import { PanelHeader, Div, Group } from '@vkontakte/vkui'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import useStoreon from 'storeon/react'

function Task(props) {	
	
	const { tasks } = useStoreon('tasks')
	const task = tasks.filter((task) => task.id === Number(props.route.params.id))[0]
	const router = props.router

	return (
		<div>
           <PanelHeader
				left={
					<PanelHeaderBack
						onClick={() => router.navigate('tasks')}
					/>
				}
			>
            Заметка
            </PanelHeader>
			{
				typeof task !== 'undefined' &&
					<Group>
						<Div style={{whiteSpace : 'pre-line'}}>
							{task.text}
						</Div>
					</Group>
			}
        </div>
	)
}

export default Task
