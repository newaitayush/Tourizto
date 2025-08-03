import React, { useState, useEffect } from 'react';
import './EmailTest.css';

const EmailTest = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [emailConfig, setEmailConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(true);

  // Check email configuration status on component mount
  useEffect(() => {
    const checkEmailConfig = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/email/status');
        const data = await response.json();

        if (response.ok) {
          setEmailConfig(data);
        } else {
          console.error('Failed to check email configuration:', data);
        }
      } catch (err) {
        console.error('Error checking email configuration:', err);
      } finally {
        setConfigLoading(false);
      }
    };

    checkEmailConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Sending test email to:', email);

      const response = await fetch('http://localhost:5000/api/email/send-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Email test response:', data);

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || data.message || 'Failed to send email');
      }
    } catch (err) {
      console.error('Email test error:', err);
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-test-container">
      <div className="email-test-card">
        <h2>Email Test Tool</h2>
        <p>Use this tool to test the email functionality of the application.</p>

        {/* Email Configuration Status */}
        {configLoading ? (
          <div className="config-loading">Checking email configuration...</div>
        ) : (
          <div className={`config-status ${emailConfig?.configured ? 'configured' : 'not-configured'}`}>
            <h3>Email Configuration Status</h3>
            {emailConfig ? (
              <>
                <p>
                  <strong>Status:</strong> {emailConfig.configured ? 'Configured ✓' : 'Not Configured ✗'}
                </p>
                <p>
                  <strong>Email User:</strong> {emailConfig.emailUser}
                </p>
                <p>
                  <strong>Email Password:</strong> {emailConfig.emailPassSet ? 'Set ✓' : 'Not Set ✗'}
                </p>
              </>
            ) : (
              <p>Unable to check email configuration. The server may be down.</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="email-test-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="send-test-btn"
            disabled={loading || (emailConfig && !emailConfig.configured)}
          >
            {loading ? 'Sending...' : 'Send Test Email'}
          </button>

          {emailConfig && !emailConfig.configured && (
            <p className="config-warning">
              Email is not properly configured. Please check your .env file and server logs.
            </p>
          )}
        </form>

        {error && (
          <div className="error-message">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="success-message">
            <h3>Success!</h3>
            <p>Email sent successfully to {email}</p>
            <div className="result-details">
              <p><strong>Message ID:</strong> {result.messageId}</p>
              {result.response && <p><strong>Response:</strong> {result.response}</p>}
            </div>
          </div>
        )}

        <div className="email-test-info">
          <h3>Troubleshooting</h3>
          <ul>
            <li>Check your spam/junk folder if you don't see the email</li>
            <li>Verify that the email address is correct</li>
            <li>Make sure the backend server is running</li>
            <li>Check the server logs for any errors</li>
            <li>Ensure your Gmail app password is correct (16 characters without spaces)</li>
            <li>Make sure 2-Step Verification is enabled on your Google account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailTest;
