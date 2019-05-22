import React from 'react'
import { View, Panel, FixedLayout, Div, Button, platform, ANDROID, Root } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Task from './components/Task'
import EditTask from './components/EditTask'
import Icon24Add from '@vkontakte/icons/dist/24/add'
import Icon24Write from '@vkontakte/icons/dist/24/write'
import { RouteNode } from 'react-router5'
import Icon24Delete from '@vkontakte/icons/dist/24/delete'
import './custom.css'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentTaskId : null,
			removable : false
		}
	}

	onRemovableTasks = () => this.setState({ removable : !this.state.removable })

	render() {
		let {
			route,
			router
		} = this.props

		const osname = platform()
		const activeView = (route.name === 'add') ? 'addView' : 'tasksView'
		const activePanel = route.name

		return (
			<Root activeView={activeView}>
				<View activePanel={activePanel} id='tasksView'>
					<Panel id='tasks'>
						<Tasks 
							router={router}
							removable={this.state.removable}
							onRemovableTasks={this.onRemovableTasks}
							setCurrentTaskId={this.setCurrentTaskId}
						/>
						<FixedLayout vertical='bottom'>
							{
								osname === ANDROID ?
								<Div style={{ float : 'right' }}>
									<Button
										className='FixedBottomButton'
										onClick={()=>router.navigate('add')}
									>
										<Icon24Add/>
									</Button>
								</Div>
								:
								<Div>
									<Button
										size="xl"
										onClick={()=>router.navigate('add')}
									>
										Новая задача
									</Button>
								</Div>
							}
							{
								osname === ANDROID ? 
								<Div>
									<Button
										className='FixedBottomButton'
										onClick={() => this.onRemovableTasks()}
									>
										<Icon24Delete/>
									</Button>
								</Div>
								:
								false
							}
						</FixedLayout>
					</Panel>
					
					<Panel id='task'>
						<Task 
							router={router}
							route={route}
						/>
						<FixedLayout vertical='bottom'>
							{
								osname === ANDROID ?
								<Div style={{ float : 'right' }}>
									<Button
										className='FixedBottomButton'
										onClick={()=>router.navigate('edit', { id : route.params.id })}
									>
										<Icon24Write/>
									</Button>
								</Div>
								:
								<Div>
									<Button
										size="xl"
										onClick={()=>router.navigate('edit', { id : route.params.id })}
									>
										Редактировать
									</Button>
								</Div>
							}
						</FixedLayout>
					</Panel>

					<Panel id="edit" theme="white">
						<EditTask 
							router={router}
							route={route}
						/>
					</Panel>

				</View>
				<View activePanel={activePanel} id='addView'>
					<Panel id='add' theme="white">
							<AddTask 
								router={router}
							/>
					</Panel>
				</View>
			</Root>
		)
	}
}

export default (props) => (
    <RouteNode nodeName="">
        {({ route }) => <App route={route} {...props}/>}
    </RouteNode>
)