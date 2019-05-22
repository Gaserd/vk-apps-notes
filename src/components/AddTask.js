import React from 'react'
import { PanelHeader, FormLayout, Textarea, FixedLayout, Button, Div, platform, ANDROID, FormStatus } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import connect from 'storeon/react/connect'

class AddTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			text : '',
			error : false
		};
	}

	onClickAddTask = () => {
		let {
			router
		} = this.props

		let {
			text
		} = this.state

		if (text !== '') {
			this.setState({ error : false })
			const tasks = this.props.tasks
			const user_id = this.props.user.id
			this.props.dispatch('tasks/api/add', ({ tasks }, { user_id, text }))
			router.navigateToDefault()
		} else {
			this.setState({ error : true })
		}

	}

	onChangeTextTask = (e) => {
		const text = e.target.value
		this.setState({ text })
	}

	render() {

		let {
			router
		} = this.props

		const osname = platform()

		return (
			<div>
                <PanelHeader
					left={
						<PanelHeaderBack
							onClick={()=>router.navigate('tasks')}
						/>
					}
				>
                Добавление
                </PanelHeader>
                <FormLayout>
					{
						this.state.error === true &&
						<FormStatus title="Некорректные поля" state="error">
							Заполните все поля
						</FormStatus>
					}
					<Textarea 
						onChange={this.onChangeTextTask}
						value={this.state.text}
						placeholder='Здесь должен быть Ваш текст' />
				</FormLayout>
				<FixedLayout vertical='bottom'>
					{
						osname === ANDROID ? 
						<Div style={{ float : 'right' }}>
							<Button
								className='FixedBottomButton'
								onClick={(e) => this.onClickAddTask(e)}
							>
								<Icon24Done/>
							</Button>
						</Div>
						:
						<Div>
							<Button
								size='xl'
								onClick={(e) => this.onClickAddTask(e)}
							>
								Добавить
							</Button>
						</Div>
					}
				</FixedLayout>
            </div>
		);
	}
}

export default connect('tasks', AddTask)
