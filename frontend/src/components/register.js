import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserService from '../services/user';
import validationSchema from './formValidation/registerValidation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {
	return (
		<div className="col-lg-6">
			<ToastContainer />
			<h4 className="card-title">New User Registration</h4>
			<div className="card">
				<div className="card-body">
					<Formik
						initialValues={{
							name: '',
							username: '',
                            password: '',
                            confirmPassword: ''
						}}
						validationSchema={validationSchema}
						onSubmit={(fields, action) => {
							action.setSubmitting(true);
							const data = JSON.stringify({
								name: fields.name,
								username: fields.username,
								password: fields.password
							});
							UserService.createUser(data)
								.then((response) => {
									action.setSubmitting(false);
                                    action.resetForm();
                                    alert('You have registered successfully!');
									props.history.push('/login');
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
										<label htmlFor="name">*Name</label>
										<Field
											id="name"
											name="name"
                                            type="text"
                                            placeholder="enter your name"
											className={
												'form-control' +
												(errors.name && touched.name ? ' is-invalid' : '')
											}
										/>
										<ErrorMessage name="name" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="username">*Username</label>
										<Field
											id="username"
											name="username"
                                            type="text"
                                            placeholder="enter your email address"
											className={
												'form-control' + (errors.username && touched.username ? ' is-invalid' : '')
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
												'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
											}
										/>
										<ErrorMessage name="password" component="div" className="invalid-feedback" />
									</div>
                                    <div className="form-group">
										<label htmlFor="confirmPassword">*Confirm Password</label>
										<Field
											id="confirmPassword"
											name="confirmPassword"
                                            type="password"
                                            placeholder="confirm password"
											className={
												'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
											}
										/>
										<ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
									</div>
									
									<div className="form-group">
										<button type="submit" className="btn btn-success m-2">
											Submit
										</button>
									</div>
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

export default Register;
