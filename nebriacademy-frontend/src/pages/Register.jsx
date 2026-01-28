import RegisterForm from '../Components/RegisterForm';
import '../style/Register.css';

function Register() {
  return (
    <div className="register-page-container">
      <h1>Crea tu cuenta (Externo)</h1>
      <RegisterForm />
    </div>
  )
}

export default Register