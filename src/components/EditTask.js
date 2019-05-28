import React from 'react'
import { PanelHeader, FormLayout, FixedLayout, Button, Div, platform, ANDROID, FormStatus } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import connect from 'storeon/react/connect'

class EditTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id : null,
			text : '',
			error : false,
			textareaHeight : 0
		};
	}

	componentDidMount() {
		const tasks = this.props.tasks
		const task = tasks.filter((task) => task.id === Number(this.props.route.params.id))[0]
		const textareaHeight = window.document.body.offsetHeight * 0.8
		this.setState({ ...task, textareaHeight })
	}

	onClickEditTask = () => {
		let {
			router
		} = this.props

		let {
			id,
			text
		} = this.state

		if (text !== '') {
			this.setState({ error : false })
			const tasks = this.props.tasks
			let task = { id, text }
			const user_id = this.props.user.id
			this.props.dispatch('tasks/api/edit', ({ tasks }, { task, user_id }))
			router.navigate('task', { id : id })
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
								onClick={()=>router.navigate('task', { id : this.state.id })}
							/>
						}
					>
					Редактирование
					</PanelHeader>
					<FormLayout>
						{
							this.state.error === true &&
							<FormStatus title="Некорректные поля" state="error">
								Заполните все поля
							</FormStatus>
						}
						<div
						style={{
							width: '100%',
							height: this.state.textareaHeight,
							boxSizing: 'border-box',
							position : 'relative'
						}}
						>
							<textarea 
								style={{
									border: 'none',
									padding: 10,
									fontSize: 16,
									width: '100%',
									height: this.state.textareaHeight,
									boxSizing: 'border-box',
								}}
								onChange={this.onChangeTextTask}
								value={this.state.text}
								placeholder='Здесь должен быть Ваш текст' />
						</div>
					</FormLayout>
					<FixedLayout vertical='bottom'>
						{
							osname === ANDROID ?
							<Div style={{ float : 'right' }}>
								<Button
									className='FixedBottomButton'
									onClick={() => this.onClickEditTask()}
								>
									<Icon24Done/>
								</Button>
							</Div>
							:
							<Div>
								<Button
									size='xl'
									onClick={() => this.onClickEditTask()}
								>
									Сохранить
								</Button>
							</Div>
						}
					</FixedLayout>
				</div>
		);
	}
}

export default connect('tasks', EditTask)
