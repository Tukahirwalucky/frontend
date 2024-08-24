import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../server/signupService'; // Adjust the path if needed

const CreateAccount = ({ onUserCreated }) => {
  const navigate = useNavigate(); // Ensure navigate is used
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await createUser({
        name: fullName,
        email,
        password,
        address,
        phone_number: phoneNumber,
        agreeToTerms,
      });
      console.log('Account created:', response);
      setFeedbackMessage('Account created successfully!');
      if (typeof onUserCreated === 'function') {
        onUserCreated();
      }
      setIsCreatingAccount(false);
    } catch (error) {
      console.error('Error creating account:', error.message);
      setFeedbackMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });
      console.log('Logged in successfully:', response);
      setFeedbackMessage('Logged in successfully!');
      navigate('/dashboard'); // Navigate to the dashboard or another page
    } catch (error) {
      console.error('Error logging in:', error.message);
      setFeedbackMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="account-form">
      <h2>{isCreatingAccount ? 'Create Account' : 'Login'}</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      {isCreatingAccount ? (
        <form onSubmit={handleCreateAccount}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            Agree to Terms
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
      <button onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
        {isCreatingAccount ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
};

export default CreateAccount;
