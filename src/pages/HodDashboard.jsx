const HodDashboard = () => {
  return (
    <section className="page">
      <div className="page-header">
        <h1>HOD Verification</h1>
        <p className="text-muted">
          Review marketplace listings before they go live for students.
        </p>
      </div>
      <div className="grid">
        <article className="card">
          <h3>Pending Approvals</h3>
          <p className="text-muted">Check compliance and approve or reject.</p>
          <button className="btn btn--ghost">Review queue</button>
        </article>
        <article className="card">
          <h3>Policy Checklist</h3>
          <p className="text-muted">Ensure listings match department standards.</p>
          <button className="btn btn--ghost">Open checklist</button>
        </article>
        <article className="card">
          <h3>Audit Trail</h3>
          <p className="text-muted">View past decisions and accountability.</p>
          <button className="btn btn--ghost">View history</button>
        </article>
      </div>
    </section>
  );
};

export default HodDashboard;
