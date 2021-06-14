import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserService from '../services/user';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
	return (
		<div className="col-lg-6">
			<ToastContainer />
			<h4 className="card-title">Login</h4>
			<div className="card">
				<div className="card-body">
					<Formik
						initialValues={{
							username: '',
							password: ''
						}}
						validationSchema={Yup.object().shape({
							username: Yup.string().required('Username is required.'),
							password: Yup.string().required('Password is required.')
						})}
						onSubmit={(fields, action) => {
							action.setSubmitting(true);
							const data = JSON.stringify({
								username: fields.username,
								password: fields.password
							});
							UserService.login(data)
								.then((response) => {
									action.setSubmitting(false);
									action.resetForm();
									localStorage.setItem('isLoggedIn', 'true');
									localStorage.setItem('token', response.data.user.token);
									localStorage.setItem('cartId', response.data.user.cart_id);
									alert('Login successful.');
									props.history.push('/home');
									window.location.reload();
								})
								.catch((e) => {
									action.setSubmitting(false);
									toast.error(e.response.data.message, {
										position: toast.POSITION.TOP_CENTER
									});
								});
						}}
					>
						{({ errors, touched, isSubmitting }) =>
							!isSubmitting ? (
								<Form>
									<div className="form-group">
										<label htmlFor="username">*Username</label>
										<Field
											id="username"
											name="username"
											type="text"
											placeholder="enter your email address"
											className={
												'form-control' +
												(errors.username && touched.username ? ' is-invalid' : '')
											}
										/>
										<ErrorMessage name="username" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="password">*Password</label>
										<Field
											id="password"
											name="password"
											type="password"
											placeholder="enter password"
											className={
												'form-control' +
												(errors.password && touched.password ? ' is-invalid' : '')
											}
										/>
										<ErrorMessage name="password" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<button type="submit" className="btn btn-success m-2">
											Login
										</button>
									</div>
									<span className="text-danger" id="feedback">
										<Link to="/register">New User? Click here to register.</Link>
									</span>
								</Form>
							) : (
								<div className="loader" />
							)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Login;
