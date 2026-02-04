const Notes = () => {
  return (
    <section className="page">
      <div className="page-header">
        <h1>Notes Library</h1>
        <p className="text-muted">
          Discover verified notes or upload new material for approval.
        </p>
      </div>
      <div className="grid">
        <article className="card">
          <h3>Search Notes</h3>
          <p className="text-muted">Filter by subject, semester, or uploader.</p>
          <button className="btn btn--ghost">Browse</button>
        </article>
        <article className="card">
          <h3>Upload Center</h3>
          <p className="text-muted">Admins can upload curated material for students.</p>
          <button className="btn btn--ghost">Upload</button>
        </article>
        <article className="card">
          <h3>Downloads</h3>
          <p className="text-muted">Track your saved and downloaded notes.</p>
          <button className="btn btn--ghost">View library</button>
        </article>
      </div>
    </section>
  );
};

export default Notes;
