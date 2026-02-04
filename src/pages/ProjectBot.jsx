const ProjectBot = () => {
  return (
    <section className="page">
      <div className="page-header">
        <h1>AI Project Bot</h1>
        <p className="text-muted">
          Describe your project to get a recommended parts list and availability.
        </p>
      </div>
      <div className="card chatbot">
        <div className="chatbot__input">
          <label htmlFor="project-desc">Project description</label>
          <textarea
            id="project-desc"
            rows="5"
            placeholder="Example: Build a smart irrigation system with soil sensors."
          />
          <button className="btn btn--primary" type="button">
            Analyze
          </button>
        </div>
        <div className="chatbot__output">
          <h3>Suggested Components</h3>
          <ul>
            <li>ESP32 Dev Kit (3 in stock)</li>
            <li>Capacitive soil sensor (12 in stock)</li>
            <li>Relay module (5 in stock)</li>
          </ul>
          <p className="text-muted">Connect to see live availability.</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectBot;
