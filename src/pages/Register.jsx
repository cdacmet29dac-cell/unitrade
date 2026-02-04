const Register = () => {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="text-muted">Join UniTrade with your college credentials.</p>
        <form className="auth-form">
          <label>
            Full name
            <input type="text" placeholder="Alex Johnson" />
          </label>
          <label>
            Email
            <input type="email" placeholder="alex@college.edu" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Set a strong password" />
          </label>
          <button className="btn btn--primary" type="button">
            Register
          </button>
        </form>
        <div className="auth-footer">
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    </section>
  );
};

export default Register;
