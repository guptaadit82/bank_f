import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpg';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import styles from '../styles/Username.module.css';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      navigate('/password');
    }
  });
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanInterest, setLoanInterest] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const duration = parseInt(loanDuration);
    const interestRate = parseFloat(loanInterest) / 100;

    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = duration * 12;

    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    const monthlyPayment = principal * (numerator / denominator);
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };
  return (
    <div className="container mx-auto flex flex-col h-screen">
      <nav className="bg-transparent py-4 border-b-2 border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-black font-bold text-2xl" style={{ marginLeft: '40px' }}>
            Yuko Bank 
          </h1>
          <ul className="flex space-x-4 py-2 px-5 text-1.5xl" style={{ marginright: '40px' }} >
            <li>
              <Link to="/" className="text-black hover:text-green-500" style={{ marginRight: '25px' }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:text-green-500" style={{ marginRight: '25px' }}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-black hover:text-green-500" style={{ marginRight: '25px' }}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>





      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex-grow flex justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center ">
            <h4 className="text-3xl font-bold mt-0"> Hey! User </h4>
            <span className="py-2 text-base w-3/4 text-center text-gray-500">
              Experience the Fastest & Safe Transactions Online.
            </span>
          </div>

          <form className="py-4" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-2">
              <img
                src={avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-2">
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
               Next →
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-gray-500">
                Not a Customer{' '}
                <Link className="text-green-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
             <div className="text-center py-2">
              <span className="text-gray-500">
                For Testing Use: Username - hey123 & password - hey@123
              </span>
            </div>
           
          </form>
        </div>
      </div>
      <div>
      <h1>Loan EMI Calculator </h1>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={{ marginRight: '10px',marginLeft:'10px' }}
        />

        <label htmlFor="loanDuration">Loan Duration (in years):</label>
        <input
          type="number"
          id="loanDuration"
          value={loanDuration}
          onChange={(e) => setLoanDuration(e.target.value)}
          style={{ marginRight: '10px',marginLeft:'10px' }}
        />

        <label htmlFor="loanInterest">Interest Rate (%):</label>
        <input
          type="number"
          id="loanInterest"
          value={loanInterest}
          onChange={(e) => setLoanInterest(e.target.value)}
          style={{ marginRight: '10px',marginLeft:'10px' }}
        />

        <button onClick={calculateLoan} style={{ marginRight: '10px' }}>
          Calculate EMI
        </button>

        <span>Monthly Payment: ₹{monthlyPayment}</span>
      </div>
    </div>

      <footer className="bg-transparent py-4">
        <div className="container mx-auto text-center text-black">
         <div className="flex justify-center items-center">
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="facebook-icon text-blue mr-4"
      >
        <FontAwesomeIcon icon={faFacebookF} size="2x" />
      </a>
      <a
        href="https://twitter.com/login"
        target="_blank"
        rel="noopener noreferrer"
        className="twitter-icon text-blue mr-4"
      >
        <FontAwesomeIcon icon={faTwitter}  size="2x"/>
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-icon text-blue mr-4"
      >
        <FontAwesomeIcon icon={faInstagram}  size="2x"/>
      </a>
         </div>
                &copy; {new Date().getFullYear()} Yuko Bank. All rights reserved.
         </div>
      </footer>
    </div>
  );
}
