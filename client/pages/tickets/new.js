import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const BLANK_FORM_STATE = {
	title: '',
	price: '',
};

const NewTicket = () => {
	const [state, setState] = useState(BLANK_FORM_STATE);

	const { errorNode, doRequest } = useRequest({
		url: '/api/tickets',
		method: 'post',
		body: state,
		onSuccess: () => Router.push('/'),
	});

	const handleBlur = () => {
		const value = parseFloat(state.price);

		if (isNaN(value)) {
			return;
		}

		setState({ ...state, price: value.toFixed(2) });
	};

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		doRequest();
	};

	return (
		<div>
			<h1>Create a Stub!</h1>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label>Title</label>
					<input
						type='text'
						name='title'
						value={state.title}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label>Price</label>
					<input
						type='text'
						name='price'
						value={state.price}
						onBlur={handleBlur}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				{errorNode}
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};

export default NewTicket;
