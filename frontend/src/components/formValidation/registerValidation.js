import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	name: Yup.string().trim().required('Full name is required.').matches(/^[A-Za-z\s]+$/, {
		message: 'Special characters or numbers are not allowed.',
		excludeEmptyString: false
	}),
	username: Yup.string()
		.trim()
		.required('Email is required.')
		.lowercase()
		.matches(/^([\w.-]+)@(\[(\d{1,3}\.){3}|(([a-zA-Z\d-]+)+))(\.[a-zA-Z]{2,3}|(\.\w{2,3})+)(\]?)$/, {
			message: 'Please enter a valid email address.',
			excludeEmptyString: false
		}),
	password: Yup.string().required('Password is required.').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
		message: 'Password must contain at least 8 characters including uppercase, lowercase, special characters(#?!@$%^&*-) and number.',
		excludeEmptyString: true
	}),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.test('passwords-match', 'Passwords do not match.', function(value) {
			return this.parent.password === value;
		})
});

export default validationSchema;
