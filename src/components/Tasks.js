import React from 'react'
import { List, Cell, PanelHeader, platform, ANDROID, HeaderButton } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Icon24Delete from '@vkontakte/icons/dist/24/delete'
import useStoreon from 'storeon/react'

const Tasks = (props) => {

        let {
            router,
            onRemovableTasks,
            removable
        } = props


        const { dispatch, tasks } = useStoreon('tasks')
        const osname = platform()

		return (
			<div>
                <PanelHeader
                    left={
                        osname === ANDROID ?
                        false
                        :
                        <HeaderButton 
                            onClick={() => onRemovableTasks()}
                        >
                            <Icon24Delete/>
                        </HeaderButton>
                    }
                >
                    Задачи
                </PanelHeader>
                <List>
                    {
                        tasks.map((task, index) => (
                            <Cell
                                multiline
                                expandable
                                removable={removable}
                                key={index}
                                onRemove={() => dispatch('tasks/delete', ({ tasks }, task.id))}
                                onClick={()=> {
                                        router.navigate('task', { id : task.id })
                                    } 
                                }
                            >
                                {task.name}
                            </Cell>
                        ))
                    }
                </List>
            </div>
		);
}

export default Tasks