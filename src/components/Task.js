import React from 'react'
import { PanelHeader, Header, Div, Group } from '@vkontakte/vkui'
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
            Задача
            </PanelHeader>
			{
				typeof task !== 'undefined' &&
				<Group>
					<Header>{task.name}</Header>
					<Div>{task.text}</Div>
				</Group>
			}
        </div>
	)
}

export default Task
