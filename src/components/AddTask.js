import React from 'react'
import { PanelHeader, FormLayout, FixedLayout, Button, Div, platform, ANDROID, FormStatus } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import connect from 'storeon/react/connect'
import Icon16Down from '@vkontakte/icons/dist/16/down';
import VKUIconnect from '@vkontakte/vkui-connect'

class AddTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			text : '',
			error : false,
			textareaHeight : 0
		};
	}

	componentDidMount() {
		const textareaHeight = window.document.body.offsetHeight * 0.8
		this.setState({ textareaHeight })
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
						<button
							style={{
								position : 'absolute',
								bottom : 10,
								right : 10,
								borderRadius : 17,
								border : 'none',
								color : '#fff',
								padding : 4,
								backgroundColor : 'var(--button_primary_background)'
							}}

							onClick={() => {
								VKUIconnect.send("VKWebAppOpenApp", {"app_id": 6959073, "location": `text=${encodeURI(this.state.text)}`});
							}}
						>
							<Icon16Down 
								style={{
									transform: 'rotateZ(90deg)',
								}}
							/>
							<Icon16Down 
								style={{
									transform: 'rotateZ(270deg)',
									marginTop : '-9px',
									marginLeft : 10
								}}
							/>
						</button>
					</div>
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
