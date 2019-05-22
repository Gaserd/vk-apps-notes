import React from 'react'
import { PanelHeader, FormLayout, Textarea, Input, FixedLayout, Button, Div, platform, ANDROID, FormStatus } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import connect from 'storeon/react/connect'

class EditTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id : null,
			name : '',
			text : '',
			error : false
		};
	}

	componentDidMount() {
		const tasks = this.props.tasks
		const task = tasks.filter((task) => task.id === Number(this.props.route.params.id))[0]
		this.setState({ ...task })
	}

	onClickEditTask = () => {
		let {
			router
		} = this.props

		let {
			id,
			name,
			text
		} = this.state

		if (name !== '' && text !== '') {
			this.setState({ error : false })
			const tasks = this.props.tasks
			this.props.dispatch('tasks/edit', ({ tasks }, { id, name, text }))
			router.navigate('task', { id : id })
        } else {
			this.setState({ error : true })
		}

	}

	onChangeNameTask = (e) => {
		const name = e.target.value
		this.setState({ name })
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
						<Input 
							onChange={this.onChangeNameTask}
							type='text'
							value={this.state.name}
							placeholder='Напиши, как называется задача' 
						/>
						<Textarea 
							onChange={this.onChangeTextTask}
							value={this.state.text}
							placeholder='Напиши, чтобы ты хотел сделать' />
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
