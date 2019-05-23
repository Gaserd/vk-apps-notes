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
        const user_id = props.user.id

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
                    Заметки
                </PanelHeader>
                <List>
                    {
                        tasks.map((task, index) => (
                            <Cell
                                expandable
                                removable={removable}
                                key={index}
                                onRemove={() => dispatch('tasks/api/delete', ({ tasks }, {
                                    task, user_id
                                }))}
                                onClick={()=> {
                                        router.navigate('task', { id : task.id })
                                    } 
                                }
                            >
                                {task.text}
                            </Cell>
                        ))
                    }
                </List>
            </div>
		);
}

export default Tasks