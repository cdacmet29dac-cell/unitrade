const Marketplace = () => {
  return (
    <section className="page">
      <div className="page-header">
        <h1>ENTC Marketplace</h1>
        <p className="text-muted">
          List devices for rent or sale, manage requests, and track fulfillment.
        </p>
      </div>
      <div className="grid">
        <article className="card">
          <h3>Active Listings</h3>
          <p className="text-muted">Monitor items you have listed for rent or sale.</p>
          <button className="btn btn--ghost">Create listing</button>
        </article>
        <article className="card">
          <h3>Requests Queue</h3>
          <p className="text-muted">Approve or negotiate incoming rental/buy requests.</p>
          <button className="btn btn--ghost">View requests</button>
        </article>
        <article className="card">
          <h3>Status Tracking</h3>
          <p className="text-muted">Track delivery, pickup, and completion stages.</p>
          <button className="btn btn--ghost">Track status</button>
        </article>
      </div>
    </section>
  );
};

export default Marketplace;
